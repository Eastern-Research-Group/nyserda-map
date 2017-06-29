import os
import json
from shutil import copyfile
from nyserda.db import MapFeature
from .utils import create_dir

class JsonOutput:
    def __init__(self, app, key, output_base):
        self.features = []
        self.output_base = output_base
        self.key = key
        self.app = app
        self.generate()

    def generate(self):
        for instance in self.app.session.query(MapFeature).filter_by(key=self.key).order_by(MapFeature.id):
            # copy image to output with unique name
            image_name = instance.image.split('/')[-1]
            name,ext = os.path.splitext(image_name)
            filename = "%s_%s%s" % (instance.id, instance.key, ext)
            folder_path = self.output_base

            group = False
            if(instance.subfolder and instance.subfolder is not '0'):
                folder_path = os.path.join(self.output_base,instance.subfolder)
                group = instance.subfolder
                create_dir(folder_path)

            output_path = os.path.join(folder_path, filename)

            try:
                # Get all the png from that directory and move over?
                if(ext == '.png'):
                    copyfile(instance.image, output_path)

                    # Write coordinates into json with new path name (s,w,n,e)
                    # TODO: Create new feature bundle for each layer
                    coords = instance.coords.split(',')
                    # print(os.path.join('/',instance.key,instance.subfolder,filename))
                    lod = ''
                    if instance.lod:
                        lod = instance.lod
                    self.features.append({
                        'type': 'Feature',
                        'properties': {
                            'group': group,
                            'name': '%s_%s' % (instance.id, instance.key),
                            # 'image_overlay': output_path # TODO: Make this relative to json
                            'image_overlay': os.path.join('/',instance.key,instance.subfolder,filename)
                        },
                        'geometery': {
                            'type': 'Point',
                            'lod': instance.lod,
                            'coordinates': [[coords[0], coords[1]], [coords[2], coords[3]]],
                        }
                    })
            except OSError as err:
                print(str(err))
                print('\n')


    # Create json / GeoJSON file
    def toJSON(self):
        return json.dumps({'type': 'FeatureCollection', 'features': self.features})

    def write(self):
        try:
            output_file = os.path.join(self.output_base, self.key + '.json')
            f = open(output_file, 'w+')
            f.write(self.toJSON())
        except OSError:
            pass
