import os
import shutil
from .utils import create_dir, create_temp_dir
from nyserda.db import Session

class App:
    def __init__(self):
        self.ROOT_PATH = os.getcwd()
        self.BIN_PATH = self.ROOT_PATH + '/bin'
        self.OUTPUT_PATH = self.BIN_PATH + '/output'
        self.INPUT_PATH = self.BIN_PATH + '/input'
        self.TEMP_PATH = ''
        self.session = Session()

    def get_root(self):
        return self.ROOT_PATH

    def get_bin(self):
        return self.BIN_PATH

    def return_to_root(self):
        os.chdir(self.ROOT_PATH)

    def go_to_output(self):
        os.chdir(self.OUTPUT_PATH)

    def go_to_input(self):
        os.chdir(self.INPUT_PATH)

    def setup(self):
        create_dir(self.OUTPUT_PATH)
        create_dir(self.INPUT_PATH)
        self.TEMP_PATH = create_temp_dir(self.INPUT_PATH)

    def cleanup(self):
        shutil.rmtree(self.TEMP_PATH)

    def remove_bin(self):
        shutil.rmtree(self.BIN_PATH)
