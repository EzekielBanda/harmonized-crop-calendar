from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

URL_DATABASE = "postgresql://harmonuser:iV0VTSWDDq3KA988Ty7QB7OmJfSER1wZ@dpg-cppo51g8fa8c739jhrvg-a.oregon-postgres.render.com/harmon_ffkr"

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
