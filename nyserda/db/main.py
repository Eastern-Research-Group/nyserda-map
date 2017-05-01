from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker

Engine = create_engine('sqlite:///:memory:', echo=True)
Base = declarative_base()
Session = sessionmaker()
