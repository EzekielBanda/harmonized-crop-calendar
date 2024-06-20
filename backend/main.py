from fastapi import APIRouter, FastAPI, HTTPException, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Annotated
from datetime import datetime, timedelta
import models
import logging
from database.DatabaseConnection import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
router = APIRouter()

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


models.Base.metadata.create_all(bind=engine)


# Pydantic model for input data validation
class CropCreate(BaseModel):
    name: str
    water_requirement_start: int
    water_requirement_end: int 
    typical_planting_month: str
    typical_growing_duration_days: int
    
    

# Define the request body model
class EpaSoilType(BaseModel):
    epa_name: str
    district_name: str
    soil_name: str
    characteristics: str
    pH_level: float
    nutrient_composition: str
    organic_matter_content: float


# class EpaCreate(BaseModel):
#     epa_name = ClassVar[str]
#     district_name = str

class EpaModel(BaseModel):
    epa_name: str
    district_name: str


class SoilTypeModel(BaseModel):
    name: str
    characteristics: str
    pH_level: float
    nutrient_composition: str
    organic_matter_content: float
    epa_id: int


def get_dbconnection():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_dbconnection)]

# Calendar Backend Code (Stsrt)
crop_data = {
    "Maize": {
        "activities": [
            {"activity": "Land Preparation", "details": {"sub_activity": "Clearing fields, plowing, leveling fields, soil testing, adding soil amendments (e.g., compost, lime), drainage system preparation, soil mulching", "interval": "Before planting"}},
            {"activity": "Planting", "details": {"sub_activity": "Sowing maize seeds, transplanting rice seedlings or direct seeding, hardening off, preparing transplant holes, timing: determining the optimal time for transplanting, handling seedlings carefully to minimize root damage, spacing and alignment", "interval": "Start of planting"}},
            {"activity": "Weeding", "details": {"sub_activity": "Initial weeding, hand weeding around plants, using mechanical weeders, applying herbicides (selective or non-selective), mulching to suppress weed growth, hoeing between rows, crop rotation to disrupt weed cycles, maintaining clean field edges and borders", "interval": "2-3 weeks after planting"}},
            {"activity": "Top-Dressing Fertilizer Application", "details": {"sub_activity": "Applying fertilizers (e.g., top-dressing), adjusting pH if necessary before application", "interval": "4-5 weeks after planting"}},
            {"activity": "Weeding (Second Round)", "details": {"sub_activity": "Second round of weeding", "interval": "6-7 weeks after planting"}},
            {"activity": "Pest and Disease Management", "details": {"sub_activity": "Monitoring and managing pests and diseases", "interval": "Ongoing throughout growth period"}},
            {"activity": "Harvesting", "details": {"sub_activity": "Harvesting maize cobs, determining crop maturity, selecting appropriate harvesting tools (e.g., knives, shears), sorting and grading harvested produce, packing produce into containers or sacks, storing harvested crops in shaded, ventilated areas, recording harvest yields and quality", "interval": "Approximately 4-5 months after planting"}}
        ],
        "duration": "90-120 days"
    },
    "Groundnuts": {
        "activities": [
            {"activity": "Land Preparation", "details": {"sub_activity": "Plowing, forming ridges or mounds, soil testing, adding soil amendments (e.g., compost, lime), drainage system preparation, soil mulching", "interval": "Before planting"}},
            {"activity": "Planting", "details": {"sub_activity": "Sowing groundnut seeds, hardening off, preparing transplant holes, timing: determining the optimal time for transplanting, handling seedlings carefully to minimize root damage, spacing and alignment", "interval": "Start of planting"}},
            {"activity": "Weeding", "details": {"sub_activity": "Initial weeding, hand weeding around plants, using mechanical weeders, applying herbicides (selective or non-selective), mulching to suppress weed growth, hoeing between rows, crop rotation to disrupt weed cycles, maintaining clean field edges and borders", "interval": "2-3 weeks after planting"}},
            {"activity": "Top-Dressing Fertilizer Application", "details": {"sub_activity": "Applying fertilizers (e.g., top-dressing), adjusting pH if necessary before application", "interval": "4-5 weeks after planting"}},
            {"activity": "Weeding (Second Round)", "details": {"sub_activity": "Second round of weeding", "interval": "6-7 weeks after planting"}},
            {"activity": "Pest and Disease Management", "details": {"sub_activity": "Monitoring and managing pests and diseases", "interval": "Ongoing throughout growth period"}},
            {"activity": "Harvesting", "details": {"sub_activity": "Harvesting groundnut pods, determining crop maturity, selecting appropriate harvesting tools (e.g., knives, shears), sorting and grading harvested produce, packing produce into containers or sacks, storing harvested crops in shaded, ventilated areas, recording harvest yields and quality", "interval": "Approximately 3-4 months after planting"}}
        ],
        "duration": "100-150 days"
    },
    "SoyaBeans": {
        "activities": [
            {"activity": "Land Preparation", "details": {"sub_activity": "Soil cultivation, fertilization, soil testing, adding soil amendments (e.g., compost, lime), drainage system preparation, soil mulching", "interval": "Before planting"}},
            {"activity": "Planting", "details": {"sub_activity": "Sowing soybean seeds, hardening off, preparing transplant holes, timing: determining the optimal time for transplanting, handling seedlings carefully to minimize root damage, spacing and alignment", "interval": "Start of planting"}},
            {"activity": "Weeding", "details": {"sub_activity": "Initial weeding, hand weeding around plants, using mechanical weeders, applying herbicides (selective or non-selective), mulching to suppress weed growth, hoeing between rows, crop rotation to disrupt weed cycles, maintaining clean field edges and borders", "interval": "2-3 weeks after planting"}},
            {"activity": "Top-Dressing Fertilizer Application", "details": {"sub_activity": "Applying fertilizers (e.g., top-dressing), adjusting pH if necessary before application", "interval": "4-5 weeks after planting"}},
            {"activity": "Weeding (Second Round)", "details": {"sub_activity": "Second round of weeding", "interval": "6-7 weeks after planting"}},
            {"activity": "Pest and Disease Management", "details": {"sub_activity": "Monitoring and managing pests and diseases", "interval": "Ongoing throughout growth period"}},
            {"activity": "Harvesting", "details": {"sub_activity": "Harvesting soybean pods, determining crop maturity, selecting appropriate harvesting tools (e.g., knives, shears), sorting and grading harvested produce, packing produce into containers or sacks, storing harvested crops in shaded, ventilated areas, recording harvest yields and quality", "interval": "Approximately 3-4 months after planting"}}
        ],
        "duration": "80-120 days"
    },
    "Rice": {
        "activities": [
            {"activity": "Land Preparation", "details": {"sub_activity": "Leveling fields, preparing paddies, soil testing, adding soil amendments (e.g., compost, lime), drainage system preparation, soil mulching", "interval": "Before planting"}},
            {"activity": "Transplanting or Direct Seeding", "details": {"sub_activity": "Transplanting rice seedlings or direct seeding, hardening off, preparing transplant holes, timing: determining the optimal time for transplanting, handling seedlings carefully to minimize root damage, spacing and alignment, regularly monitoring transplanted seedlings for signs of stress, disease, or pests", "interval": "Start of planting"}},
            {"activity": "Weeding", "details": {"sub_activity": "Initial weeding, hand weeding around plants, using mechanical weeders, applying herbicides (selective or non-selective), mulching to suppress weed growth, hoeing between rows, crop rotation to disrupt weed cycles, maintaining clean field edges and borders", "interval": "2-3 weeks after planting"}},
            {"activity": "Top-Dressing Fertilizer Application", "details": {"sub_activity": "Applying fertilizers (e.g., top-dressing), adjusting pH if necessary before application [adding lime]", "interval": "4-5 weeks after planting"}},
            {"activity": "Water Management", "details": {"sub_activity": "Managing water levels in paddies, making canal to let water move out when water level is very high [outlet], making canal to let water move in when water level is low [inlet]", "interval": "Ongoing throughout growing period"}},
            {"activity": "Pest and Disease Management", "details": {"sub_activity": "Monitoring and managing pests and diseases", "interval": "Ongoing throughout growth period"}},
            {"activity": "Harvesting", "details": {"sub_activity": "Harvesting rice grains, determining crop maturity, selecting appropriate harvesting tools (e.g., knives, shears), sorting and grading harvested produce, packing produce into containers or sacks, storing harvested crops in shaded, ventilated areas, recording harvest yields and quality", "interval": "Approximately 4-5 months after planting"}}
        ],
        "duration": "100-160 days"
    },
    "Beans": {
        "activities": [
            {"activity": "Land Preparation", "details": {"sub_activity": "Plowing, harrowing, soil testing, adding soil amendments (e.g., compost, lime), drainage system preparation, soil mulching", "interval": "Before planting"}},
            {"activity": "Planting", "details": {"sub_activity": "Sowing bean seeds, hardening off, preparing transplant holes, timing: determining the optimal time for transplanting, handling seedlings carefully to minimize root damage, spacing and alignment", "interval": "Start of planting"}},
            {"activity": "Weeding", "details": {"sub_activity": "Initial weeding, hand weeding around plants, using mechanical weeders, applying herbicides (selective or non-selective), mulching to suppress weed growth, hoeing between rows, crop rotation to disrupt weed cycles, maintaining clean field edges and borders", "interval": "2-3 weeks after planting"}},
            {"activity": "Top-Dressing Fertilizer Application", "details": {"sub_activity": "Applying fertilizers (e.g., top-dressing), adjusting pH if necessary before application", "interval": "4-5 weeks after planting"}},
            {"activity": "Weeding (Second Round)", "details": {"sub_activity": "Second round of weeding", "interval": "6-7 weeks after planting"}},
            {"activity": "Pest and Disease Management", "details": {"sub_activity": "Monitoring and managing pests and diseases", "interval": "Ongoing throughout growth period"}},
            {"activity": "Harvesting", "details": {"sub_activity": "Harvesting bean pods, determining crop maturity, selecting appropriate harvesting tools (e.g., knives, shears), sorting and grading harvested produce, packing produce into containers or sacks, storing harvested crops in shaded, ventilated areas, recording harvest yields and quality", "interval": "Approximately 2-3 months after planting"}}
        ],
        "duration": "70-120 days"
    }
}

@app.get("/activities/{crop}")
async def get_activities(crop: str):
    crop_info = crop_data.get(crop, None)
    if crop_info:
        return {"activities": crop_info["activities"], "duration": crop_info["duration"]}
    else:
        return {"activities": [], "duration": "Unknown"}



# Calendar Backend Code (End)

#Get Epa
@app.get("/epa", response_model=None)
def get_epa(skip: int = 0, limit: int = 10, db: Session = Depends(get_dbconnection)):
    epa = db.query(models.Epa).offset(skip).limit(limit).all()
    return epa


#Delete Epa
@app.delete("/delete/epa")
def delete_all_epa(db: Session = Depends(get_dbconnection)):
    # Query for all Epa records
    epas = db.query(models.Epa).all()

    # Iterate over the records and delete each one
    for epa in epas:
        db.delete(epa)

    # Commit the transaction
    db.commit()

    return {"message": "All Epa records have been deleted"}




@app.post("/epa", response_model=EpaModel)
async def create_epa(epa: EpaModel, db: Session = Depends(get_dbconnection)):
    db_epa = models.Epa(**epa.dict())
    db.add(db_epa)
    db.commit()
    db.refresh(db_epa)
    return db_epa



@app.get("/crops/water_requirement/{water_requirement}")
def get_crops_by_water_requirement(water_requirement: float, db: Session = Depends(get_dbconnection)):
    crops = db.query(models.Crop).filter(
        models.Crop.water_requirement_start <= water_requirement,
          models.Crop.water_requirement_end >= water_requirement).all()
    if not crops:
        raise HTTPException(status_code=404, detail=f"No crops found with water requirement of {water_requirement} mm")
    return crops


# Route to add a new crop
# Endpoint to create a new crop and associate it with soil types
@app.post("/crops/", response_model=CropCreate)
async def create_crop(crop: CropCreate, db: Session = Depends(get_dbconnection)):
    db_crop = models.Crop(**crop.model_dump())

    # Basic logic to determine associated soil types based on crop characteristics
    associated_soil_types = []

    if crop.water_requirement_start < 500:  # Example condition
        # If water requirement is low, associate with clay soil types
        soil_types_names = db.query(models.SoilType).filter(models.SoilType.name.in_(["Cambisol", "Alisol", "Luvisol"])).all()
        associated_soil_types.extend(soil_types_names)

    elif crop.water_requirement_start < 1000:
        soil_types_names = db.query(models.SoilType).filter(models.SoilType.name.in_(["aerenosol", "Fluvisol", "Gleysol"])).all()
        associated_soil_types.extend(soil_types_names)
    else:
        # If water requirement is high, associate with sandy soil types
        soil_types_names = db.query(models.SoilType).filter(models.SoilType.name.in_(["Marsh"])).all()
        associated_soil_types.extend(soil_types_names)

    # Loop through the associated soil types and add them to the crop
    for soil_type in associated_soil_types:
        db_crop.soil_types.append(soil_type)

    db.add(db_crop)
    db.commit()
    db.refresh(db_crop)
    return db_crop



# Set up logging
logging.basicConfig(level=logging.INFO)

# Route to the get crops in the Epa
@app.get("/epa/crops/{epa_name}", response_model=dict)
async def get_crops_by_epa(epa_name: str, db: Session = Depends(get_dbconnection)):
    # Retrieve the EPA based on the EPA name
    epa = db.query(models.Epa).filter(models.Epa.epa_name == epa_name).first()

    if not epa:
        raise HTTPException(status_code=404, detail=f"EPA with name '{epa_name}' not found")

    # Retrieve soil types associated with the retrieved EPA
    soil_types = db.query(models.SoilType).filter(models.SoilType.epa_id == epa.epa_id).all()

    if not soil_types:
        raise HTTPException(status_code=404, detail=f"No soil types found for EPA '{epa_name}'")

    # Retrieve crop names associated with the retrieved soil types
    crop_names = db.query(models.Crop.name).filter(models.Crop.soil_types.any(models.SoilType.id.in_([soil.id for soil in soil_types]))).all()
    
    # Construct the response dictionary with EPA name as key and list of crop names as value
    response_dict = {epa_name: [crop_name for crop_name, in crop_names]}
    
    return response_dict


#Route to 
@app.post("/epa_soil_types", response_model=EpaSoilType)
async def create_epa_soil_type(epa_soil_type: EpaSoilType, db: Session = Depends(get_dbconnection)):
    # Create a new Epa
    new_epa = models.Epa(epa_name=epa_soil_type.epa_name, district_name=epa_soil_type.district_name)
    db.add(new_epa)
    db.commit()

    # Create a new SoilType associated with the new Epa
    new_soil_type = models.SoilType(
        name=epa_soil_type.soil_name,
        characteristics=epa_soil_type.characteristics,
        pH_level=epa_soil_type.pH_level,
        nutrient_composition=epa_soil_type.nutrient_composition,
        organic_matter_content=epa_soil_type.organic_matter_content,
        epa_id=new_epa.epa_id)
    db.add(new_soil_type)
    db.commit()

    return {"message": "Epa and SoilType created successfully"}

# Route to Retrieve type of soils in the Epa
@app.get("/epa_soil_types/{epa_name}")
async def get_soil_types(epa_name: str, db: Session = Depends(get_dbconnection)):
    # Query for a specific EPA
    epa = db.query(models.Epa).filter(models.Epa.epa_name == epa_name).first()

    if epa is not None:
        # Query for soil types associated with the specific EPA
        soil_types = (db.query(models.SoilType)
                      .filter(models.SoilType.epa_id == epa.epa_id).all())

        # Return the soil types as JSON
        return JSONResponse(content=[soil.name for soil in soil_types])
    else:
        return JSONResponse(content={"error": f"No EPA found with name {epa_name}"}, status_code=404)


# Route to get all crops
@app.get("/crops/", response_model=None)
def get_crops(skip: int = 0, limit: int = 10, db: Session = Depends(get_dbconnection)):
    crops = db.query(models.Crop).offset(skip).limit(limit).all()
    return crops


@app.get("/soil_types", response_model=List[SoilTypeModel])
def get_soil_types():
    db = SessionLocal()
    soil_types = db.query(models.SoilType).all()
    return soil_types

@app.post("/soil_types", response_model=SoilTypeModel)
def create_soil_type(soil_type: SoilTypeModel, db: Session = Depends(get_dbconnection)):
    db = SessionLocal()
    new_soil_type = models.SoilType(**soil_type.model_dump())
    db.add(new_soil_type)
    db.commit()
    db.refresh(new_soil_type)
    return new_soil_type


# PUT endpoint for updating a crop
@app.put("/crop/{crop_id}", response_model=CropCreate)
async def update_crop(crop_id: int, updated_crop: CropCreate, db: db_dependency):
    crop = db.query(models.Crop).filter(models.Crop.id == crop_id).first()
    if crop is None:
        raise HTTPException(status_code=404, detail="Crop not found")

    crop.name = updated_crop.name
    crop.water_requirement_start = updated_crop.water_requirement_start
    crop.water_requirement_end = updated_crop.water_requirement_end
    crop.typical_planting_month = updated_crop.typical_planting_month
    crop.typical_growing_duration_days = updated_crop.typical_growing_duration_days

    db.commit()
    db.refresh(crop)
    return crop

# # Route to get all soil types
@app.get("/soil_types/", response_model=None)
def get_soil_types(skip: int = 0, limit: int = 10, db: Session = Depends(get_dbconnection)):
    soil_type = db.query(models.SoilType).offset(skip).limit(limit).all()
    return soil_type

# # Route to get a specific crop by ID
@app.get("/crops/{crop_id}", response_model=None)
def get_crop(crop_id: int, db: Session = Depends(get_dbconnection)):
    crop_by_id = db.query(models.Crop).filter(models.Crop.id == crop_id).first()
    return crop_by_id


# # Route to get a specific soil type by ID
@app.get("/soil_types/{soil_id}", response_model=None)
def get_soil_type(soil_id: int, db: Session = Depends(get_dbconnection)):
    soil_type_by_id = db.query(models.SoilType).filter(models.SoilType.id == soil_id).first()
    return soil_type_by_id
