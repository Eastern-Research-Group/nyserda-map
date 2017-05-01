from sqlalchemy import create_engine

from .main import Engine
from .main import Session
from .main import Base
# from .user import User
from .map_feature import MapFeature

Base.metadata.create_all(bind=Engine)
Session.configure(bind=Engine)
