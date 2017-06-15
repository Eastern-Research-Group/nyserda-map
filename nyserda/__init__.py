import os
from distutils.dir_util import copy_tree

from .app import App
from .kmz import Kmz
from .kml import Kml
from .utils import create_dir
from .json_output import JsonOutput
from nyserda.db import NetworkLink, MapFeature

def extract_network_links(app, foldername, count, start_id=1):
    for instance in app.session.query(NetworkLink).filter(NetworkLink.id >= start_id):
        kml = Kml(app, instance.path, foldername)
        kml.extract_kml(instance.file)

    new_count = app.session.query(NetworkLink).count()
    if(new_count > count):
        extract_network_links(app, foldername, new_count, count+1)

    return

def run():
    app = App()
    print('Setting up working directory')
    app.setup()
    kmz = Kmz(app)

    try:
        print('Extracting KMZs')
        kmz_files = os.path.join(app.ROOT_PATH, 'input')
        kmls = kmz.extract_all(kmz_files)
        data = []
        for foldername in kmls:
            # TODO: Create sub-folders for each of the layers (e.g.,
            # ExistingMarsh2100) with their own GeoJSON
            print('Extracting data for', foldername)
            kml = Kml(app, foldername, foldername)
            data.append((foldername, kml.extract()))  # Deprec

            print('Handling network links', foldername)
            count = app.session.query(NetworkLink).count()
            links = extract_network_links(app, foldername, count)
            app.session.query(NetworkLink).delete()
            app.session.commit()


            print('Generating output for', foldername)
            output_base = create_dir(os.path.join(app.OUTPUT_PATH, foldername))
            feature_collection = JsonOutput(app, foldername, output_base)
            feature_collection.write()

            try:
                folder_path = os.path.join(app.TEMP_PATH, foldername)
                folder_dest = os.path.join(app.INPUT_PATH, foldername)
                copy_tree(folder_path, folder_dest)
            except OSError:
                print('Error', 'Already exists?', foldername)
                pass


            print(foldername,app.session.query(MapFeature).filter_by(key=foldername).count())
    except OSError as e:
        print(e.errno)

    print('Removing temporary files')
    app.cleanup()


def clean():
    app = App()
    app.remove_bin()
