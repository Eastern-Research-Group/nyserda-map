import os
import untangle
from xml.etree import ElementTree
from lxml import etree
from .utils import obj_json

class Kml:
    def __init__(self, app, foldername):
        self.app = app
        self.foldername = foldername
        self.path = os.path.join(self.app.TEMP_PATH,self.foldername)

    def get_contents(self):
        return os.listdir(self.path)

    def get_root(self,file):
        tree = ElementTree.parse(file)
        # xml = tree.find(".//{http://www.opengis.net/kml/2.2}Document")
        xml = tree.find(".//{http://www.opengis.net/kml/2.2}Folder")

        return xml

    def xml_to_obj(self,xml):
        obj = untangle.parse(xml)
        try:
            kml = obj.kml.Document
        except:
            kml = obj

        return kml

    def build_data(self,network_link):
        latLonBox = network_link.Region.LatLonAltBox
        north = latLonBox.north.cdata
        south = latLonBox.south.cdata
        east = latLonBox.east.cdata
        west = latLonBox.west.cdata

        coords = (
            west,
            east,
            north,
            south,
        )

        data = {
            'name': network_link.name.cdata,
            'coords': coords,
            'link': network_link.Link.href.cdata,
        }

        return data

    def find(self,haystack,needle):
        ns = ".//{http://www.opengis.net/kml/2.2}"
        return haystack.find(ns + needle)

    def parse_kml(self,file,path):
        # xml = self.get_root(file)
        obj = self.xml_to_obj(file)
        data = {}

        try:
            # Nassau.kml, etc. file
            root_obj = obj.kml
            for document in root_obj.Folder.Document:
                data = self.build_data(document.NetworkLink)
        except:
            ns = ".//{http://www.opengis.net/kml/2.2}"
            tree = etree.parse(path)
            root = tree.getroot()
            folders = self.find(root,'Folder')
            ground_overlay = self.find(folders,'GroundOverlay')
            icon = self.find(ground_overlay,'Icon')
            href = self.find(icon,'href')
            latLonBox = self.find(ground_overlay,'LatLonBox')
            west = self.find(latLonBox,'west')
            north = self.find(latLonBox,'north')
            east = self.find(latLonBox,'east')
            south = self.find(latLonBox,'south')
            coords = (
                west.text,
                north.text,
                east.text,
                south.text,
            )

            data = {
                'path': path,
                'link': href.text,
                'coords': coords
            }

        data['path'] = path

        return data

    def handle_file_extract(self,file,path):
        if not os.path.isfile(file) and file.endswith('.kml'):
            obj = self.xml_to_obj(path)
            data = self.build_data(obj.NetworkLink)
            data['path'] = path
            print(data)
        elif os.path.isfile(file) and file.endswith('.kml'):
            data = self.parse_kml(file,path)
            print(data)
        elif not os.path.isfile(file):
            foldername = os.path.join(self.foldername,file)
            kml = Kml(self.app,foldername)
            kml.extract()

    def extract(self):
        os.chdir(self.path)
        contents = self.get_contents()
        for file in contents:
            path = os.path.join(self.path,file)
            self.handle_file_extract(file,path)
        self.app.return_to_root()
