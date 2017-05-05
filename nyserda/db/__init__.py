from sqlalchemy import create_engine

from .main import Engine
from .main import Session
from .main import Base
from .map_feature import MapFeature
from .image_overlay import ImageOverlay

Base.metadata.create_all(bind=Engine)
Session.configure(bind=Engine)
