import os
from distutils.dir_util import copy_tree
from .app import App
from .kmz import Kmz
from .kml import Kml
from .utils import create_dir
from .json_output import JsonOutput
from nyserda.db import Session
from nyserda.db import MapFeature

def run():
    app = App()
    app.setup()
    kmz = Kmz(app)

    try:
        kmls = kmz.extract_all(app.ROOT_PATH + '/input')
        data = []
        for foldername in kmls:
            print(foldername)
            kml = Kml(app,foldername, foldername)
            data.append((foldername, kml.extract()))
            output_base = create_dir(os.path.join(app.OUTPUT_PATH,foldername))
            feature_collection = JsonOutput(app, foldername, output_base)
            feature_collection.write()

            folder_path = os.path.join(app.TEMP_PATH,foldername)
            folder_dest = os.path.join(app.INPUT_PATH,foldername)
            copy_tree(folder_path,folder_dest)


    except OSError as e:
        # print(e.errno)
        pass

    app.cleanup()

def clean():
    app = App()
    app.remove_bin()
