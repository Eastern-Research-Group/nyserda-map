from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .main import Base


class ImageOverlay(Base):
    __tablename__ = 'image_overlay'
    id = Column(Integer, primary_key=True)
    parent_id = Column(Integer, ForeignKey('map_feature.id'))
    path = Column(String)
    filename = Column(String)
    ext = Column(String)


    def __repr__(self):
        return "<ImageOverlay(path='%s', filename='%s', ext='%s')>)" % (self.path, self.filename, self.ext)
