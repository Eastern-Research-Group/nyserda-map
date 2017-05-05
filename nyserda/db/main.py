from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base

Engine = create_engine('sqlite:///:memory:', echo=False)
Base = declarative_base()
Session = sessionmaker()
