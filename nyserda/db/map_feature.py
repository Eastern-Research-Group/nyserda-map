from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .main import Base


class MapFeature(Base):
    __tablename__ = 'map_feature'
    id = Column(Integer, primary_key=True)
    children = relationship('ImageOverlay')
    path = Column(String)
    image = Column(String)
    coords = Column(String)
    key = Column(String)
    subfolder = Column(String)

    # Input: Before(w,e,n,s), After(s,w,n,e)
    # Output: [s,w],[n,e]
    def __repr__(self):
        return "<MapFeature(path='%s', image='%s', coords='%s', key='%s' subfolder='%s')>)" % (self.path, self.image, self.coords, self.key, self.subfolder)
