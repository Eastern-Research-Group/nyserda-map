from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .main import Base


class NetworkLink(Base):
    __tablename__ = 'network_link'
    id = Column(Integer, primary_key=True)
    file = Column(String)
    path = Column(String)
    region = Column(String)
    group = Column(String)

    # Input: Before(w,e,n,s), After(s,w,n,e)
    # Output: [s,w],[n,e]
    def __repr__(self):
        return "<NetworkLink(file='%s', path='%s', region='%s', group='%s')>)" % (self.file, self.path, self.region, self.group)
