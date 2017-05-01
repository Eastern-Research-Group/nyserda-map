import os
from zipfile import ZipFile
from .utils import create_dir

class Kmz:
    def __init__(self, app):
        self.app = app

    def extract(self,input_path,output_path):
        kmz = ZipFile(input_path,'r')
        output = create_dir(output_path)
        kmz.extractall(output)

    def extract_all(self,path):
        # Replace path with self.app.INPUT_PATH
        for filename in os.listdir(path):
            if not filename.startswith('.'):
                input_path = path + '/' + filename
                name,extension = os.path.splitext(filename)
                output_path = self.app.TEMP_PATH + '/' + name
                self.extract(input_path,output_path)

        return os.listdir(self.app.TEMP_PATH)
