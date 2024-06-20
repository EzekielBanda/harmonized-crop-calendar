from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from database2 import SessionLocal, Crop, District, init_db  # Corrected import

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
# Initialize the database
init_db()

# Load the pre-trained machine learning model, scaler, and columns
model = joblib.load("crop_recommendation_model.pkl")
scaler = joblib.load("scaler.pkl")
columns = joblib.load("columns.pkl")

class DistrictRequest(BaseModel):
    district: str

class DistrictCreate(BaseModel):
    name: str
    avg_temperature: float
    avg_humidity: float
    avg_rainfall: float
    soil_type: str

class CropCreate(BaseModel):
    name: str
    soil_ph: float
    soil_type: str
    rainfall_min: float
    rainfall_max: float
    humidity: float
    temperature: float
    planting_month: str
    harvesting_month: str
    # suitable_epas: List[str]  # List of suitable EPAs within the district

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Crop Recommendation API"}

@app.post("/recommendation/")
def get_crop_recommendation(request: DistrictRequest, db: Session = Depends(get_db)):
    district_name = request.district

    # Fetch district data from the database
    district = db.query(District).filter(District.name == district_name).first()
    if not district:
        raise HTTPException(status_code=404, detail="District data not found")

    # Get annual average data for the district from the database
    annual_avg_temp = district.avg_temperature
    annual_avg_humidity = district.avg_humidity
    annual_avg_rainfall = district.avg_rainfall
    district_soil_type = district.soil_type

    # Prepare the input features for the model
    model_features = {
        "temperature": annual_avg_temp,
        "humidity": annual_avg_humidity,
        "rainfall": annual_avg_rainfall,
        "soil_ph": 6.5,  # Example value, replace with actual data
        "soil_type": district_soil_type  # Use actual soil type data
    }

    # Convert the features to a DataFrame and ensure the correct order of columns
    input_df = pd.DataFrame([model_features], columns=columns)
    input_scaled = scaler.transform(input_df)

    # Predict suitable crops using the model
    predictions = model.predict(input_scaled)
    predicted_crops = [columns[idx] for idx, val in enumerate(predictions[0]) if val == 1]

    print(predictions)

    # Query the database for the recommended crops
    crops = db.query(Crop).filter(Crop.name.in_(predicted_crops)).all()

    if not crops:
        raise HTTPException(status_code=404, detail="No suitable crops found in database")

    # Filter crops based on current weather conditions, soil type, and EPA suitability
    suitable_crops = []
    for crop in crops:
        if (crop.rainfall_min <= annual_avg_rainfall <= crop.rainfall_max and
            crop.humidity <= annual_avg_humidity and
            crop.temperature <= annual_avg_temp and
            crop.soil_type.lower() == district_soil_type.lower()):  # Check EPA suitability
            suitable_crops.append(crop)

    if not suitable_crops:
        raise HTTPException(status_code=404, detail="No suitable crops found for current weather conditions and EPA")

    response = []
    for crop in suitable_crops:
        response.append({
            "name": crop.name.capitalize(),
            "soil_ph": crop.soil_ph,
            "soil_type": crop.soil_type,
            "rainfall_min": crop.rainfall_min,
            "rainfall_max": crop.rainfall_max,
            "humidity": crop.humidity,
            "temperature": crop.temperature,
            "planting_month": crop.planting_month,
            "harvesting_month": crop.harvesting_month
        })

    return response

@app.post("/add_crop/")
def add_crop(crop: CropCreate, db: Session = Depends(get_db)):
    # Check if crop already exists
    existing_crop = db.query(Crop).filter(Crop.name == crop.name).first()
    if existing_crop:
        raise HTTPException(status_code=400, detail="Crop already exists")

    # Create a new crop instance
    new_crop = Crop(
        name=crop.name,
        soil_ph=crop.soil_ph,
        soil_type=crop.soil_type,
        rainfall_min=crop.rainfall_min,
        rainfall_max=crop.rainfall_max,
        humidity=crop.humidity,
        temperature=crop.temperature,
        planting_month=crop.planting_month,
        harvesting_month=crop.harvesting_month
    )

    # Add and commit the new crop to the database
    db.add(new_crop)
    db.commit()
    db.refresh(new_crop)

    return new_crop

@app.post("/add_district/")
def add_district(district: DistrictCreate, db: Session = Depends(get_db)):
    # Check if district already exists
    existing_district = db.query(District).filter(District.name == district.name).first()
    if existing_district:
        raise HTTPException(status_code=400, detail="District already exists")

    # Create a new district instance
    new_district = District(
        name=district.name,
        avg_temperature=district.avg_temperature,
        avg_humidity=district.avg_humidity,
        avg_rainfall=district.avg_rainfall,
        soil_type=district.soil_type
    )

    # Add and commit the new district to the database
    db.add(new_district)
    db.commit()
    db.refresh(new_district)

    return new_district


@app.get("/districts/", response_model=List[str])
def get_districts(db: Session = Depends(get_db)):
    districts = db.query(District).all()
    return [district.name for district in districts]

def get_annual_avg_temperature(district_name, db):
    district = db.query(District).filter(District.name == district_name).first()
    if district:
        return district.avg_temperature
    else:
        raise HTTPException(status_code=404, detail="District data not found")

def get_annual_avg_humidity(district_name, db):
    district = db.query(District).filter(District.name == district_name).first()
    if district:
        return district.avg_humidity
    else:
        raise HTTPException(status_code=404, detail="District data not found")

def get_annual_avg_rainfall(district_name, db):
    district = db.query(District).filter(District.name == district_name).first()
    if district:
        return district.avg_rainfall
    else:
        raise HTTPException(status_code=404, detail="District data not found")

def get_soil_type(district_name, db):
    district = db.query(District).filter(District.name == district_name).first()
    if district:
        return district.soil_type
    else:
        raise HTTPException(status_code=404, detail="District data not found")

if __name__ == "__calendar_data__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
