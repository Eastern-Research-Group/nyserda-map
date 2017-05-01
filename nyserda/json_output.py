import os
import json
from shutil import copyfile
from nyserda.db import MapFeature

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
            filename = "%s_%s.png" % (instance.id, instance.key)
            output_path = os.path.join(self.output_base,filename)
            try:
                copyfile(instance.path, output_path)
            except OSError:
                pass

            # Write coordinates into json with new path name (s,w,n,e)
            coords = instance.coords.split(',')
            self.features.append({
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
    def toJSON(self):
        return json.dumps({'type': 'FeatureCollection','features': self.features})


    def write(self):
        try:
            output_file = os.path.join(self.output_base,self.key + '.json')
            f = open(output_file, 'w+')
            f.write(self.toJSON())
        except OSError:
            pass
