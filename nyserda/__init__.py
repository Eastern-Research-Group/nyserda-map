import os
from shutil import copyfile
import json

from .app import App
from .kmz import Kmz
from .kml import Kml
from .utils import create_dir

from nyserda.db import Session
# from nyserda.db import User
from nyserda.db import MapFeature

def run():
    app = App()
    app.setup()

    kmz = Kmz(app)

    # ed_user = User(name='ed',fullname='Ed Jones', password='edspassword')
    # app.session.add(ed_user)
    # our_user = app.session.query(User).filter_by(name='ed').first()

    # feature = MapFeature(path='foo/bar/baz', image='foo/bar/baz/0.png', coords='(1,2,3,4)')
    # app.session.add(feature)
    # our_feature = app.session.query(MapFeature).filter_by(path='foo/bar/baz').first()
    # print(our_feature.image)

    kmls = kmz.extract_all(app.ROOT_PATH + '/input')

    data = []
    for foldername in kmls:
        print(foldername)
        kml = Kml(app,foldername, foldername)
        data.append((foldername, kml.extract()))
        output_base = create_dir(os.path.join(app.OUTPUT_PATH,foldername))

        features = []
        for instance in app.session.query(MapFeature).filter_by(key=foldername).order_by(MapFeature.id):
            # copy image to output with unique name
            filename = "%s_%s.png" % (instance.id, instance.key)
            output_path = os.path.join(output_base,filename)
            try:
                copyfile(instance.path, output_path)
            except OSError:
                pass

            # Write coordinates into json with new path name (s,w,n,e)
            coords = instance.coords.split(',')
            features.append({
                'type': 'Feature',
                'properties': {
                    'name': '%s_%s' % (instance.id, instance.key),
                    'image_overlay': filename
                },
                'geometery': {
                    'type': 'Point',
                    'coordinates': [[coords[0],coords[1]],[coords[2],coords[3]]],
                }
            })

        # Create json / GeoJSON file
        feature_collection = {'type': 'FeatureCollection', 'features': features}

        try:
            output_file = os.path.join(output_base,foldername + '.json')
            f = open(output_file, 'w+')
            f.write(json.dumps(feature_collection))
        except OSError:
            pass

    app.cleanup()

def clean():
    app = App()
    app.remove_bin()
