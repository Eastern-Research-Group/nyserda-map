import os
from distutils.dir_util import copy_tree

from .app import App
from .kmz import Kmz
from .kml import Kml
from .utils import create_dir
from .json_output import JsonOutput

def run():
    app = App()
    print('Setting up working directory')
    app.setup()
    kmz = Kmz(app)

    try:
        print('Extracting KMZs')
        kmz_files = os.path.join(app.ROOT_PATH,'input')
        kmls = kmz.extract_all(kmz_files)
        data = []
        for foldername in kmls:
            print('Extracting data for',foldername)
            kml = Kml(app,foldername, foldername)
            data.append((foldername, kml.extract())) # Deprec

            print('Generating output for',foldername)
            output_base = create_dir(os.path.join(app.OUTPUT_PATH,foldername))
            feature_collection = JsonOutput(app, foldername, output_base)
            feature_collection.write()

            try:
                folder_path = os.path.join(app.TEMP_PATH,foldername)
                folder_dest = os.path.join(app.INPUT_PATH,foldername)
                copy_tree(folder_path,folder_dest)
            except OSError:
                print('Error','Already exists?',foldername)
                pass
    except OSError as e:
        print(e.errno)

    print('Removing temporary files')
    app.cleanup()

def clean():
    app = App()
    app.remove_bin()
