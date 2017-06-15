import os
import untangle
import traceback
from xml.etree import ElementTree
from lxml import etree
from nyserda.db import MapFeature, ImageOverlay, NetworkLink
from .utils import obj_json


class Kml:
    def __init__(self, app, foldername, key):
        self.app = app
        self.foldername = foldername
        self.path = os.path.join(self.app.TEMP_PATH, self.foldername)
        self.key = key
        self.subfolder = False
        try:
            exploded_path = foldername.split('/')
            if(exploded_path[2] == 'BNeva'):
                self.subfolder = exploded_path[-3]
            else:
                self.subfolder = exploded_path[2]
        except LookupError as err:
            pass

    def get_contents(self):
        return os.listdir(self.path)

    def xml_to_obj(self, xml):
        obj = untangle.parse(xml)
        try:
            kml = obj.kml.Document
        except:
            kml = obj
        return kml

    def build_data(self, network_link):
        latLonBox = network_link.Region.LatLonAltBox
        north = latLonBox.north.cdata
        south = latLonBox.south.cdata
        east = latLonBox.east.cdata
        west = latLonBox.west.cdata
        coords = (south, west, north, east)
        data = {
            'name': network_link.name.cdata,
            'coords': coords,
            'link': network_link.Link.href.cdata,
            'lod': '',
        }

        return data

    def find(self, haystack, needle):
        ns = ".//{http://www.opengis.net/kml/2.2}"
        return haystack.find(ns + needle)

    def findall(self, haystack, needle):
        ns = ".//{http://www.opengis.net/kml/2.2}"
        return haystack.findall(ns + needle)

    def get_href(self, root):
        # folders = self.find(root, 'Folder')
        # ground_overlay = self.find(folders, 'GroundOverlay')
        # icon = self.find(ground_overlay, 'Icon')
        # href = self.find(icon, 'href')
        icon = self.find(root, 'Icon')
        href = self.find(icon, 'href')

        return href.text

    def get_coords(self, root):
        # folders = self.find(root, 'Folder')
        # ground_overlay = self.find(folders, 'GroundOverlay')
        # latLonBox = self.find(ground_overlay, 'LatLonBox')
        # west = self.find(latLonBox, 'west').text
        # north = self.find(latLonBox, 'north').text
        # east = self.find(latLonBox, 'east').text
        # south = self.find(latLonBox, 'south').text
        # coords = (south, west, north, east)
        latLonBox = self.find(root, 'LatLonBox')
        west = self.find(latLonBox, 'west').text
        north = self.find(latLonBox, 'north').text
        east = self.find(latLonBox, 'east').text
        south = self.find(latLonBox, 'south').text
        coords = (south, west, north, east)
        
        return coords

    def get_lod(self, root):
        folders = self.find(root, 'Folder')
        region = self.find(folders, 'Region')
        lod = self.find(region,'Lod')
        minLodPixels = self.find(region,'minLodPixels').text
        maxLodPixels = self.find(region,'maxLodPixels').text
        
        return str(minLodPixels) + '_' + str(maxLodPixels)

    def get_network_links(self, root):
        folders = self.find(root, 'Folder')
        network_links = self.findall(folders,'NetworkLink')
        links = []
        for network_link in network_links:
            ns = './/{http://www.opengis.net/kml/2.2}'
            link = network_link.find(ns + 'Link')
            href = link.find(ns + 'href').text
            links.append(href)

        return links

    def parse_kml(self, file, path):
        obj = self.xml_to_obj(file)
        data = {}
        foo_list = []
        network_links = False
        # Nassau.kml, etc. file
        try:
            root_obj = obj.kml
            for document in root_obj.Folder.Document:
                data = self.build_data(document.NetworkLink)
        # 0.kml, etc.
        except:
            ns = ".//{http://www.opengis.net/kml/2.2}"
            tree = etree.parse(path)
            root = tree.getroot()
            folder = self.find(root,'Folder')
            lod = self.get_lod(root)
            ground_overlays = self.findall(folder,'GroundOverlay')
            for overlays in ground_overlays:
                icon_href = self.get_href(overlays)
                file_only = icon_href.split('/')[-1]
                filename, ext = os.path.splitext(file_only)
                icon_path = os.path.abspath(icon_href)
                coordinates = self.get_coords(overlays)
                foo_list.append({
                    'path': path,
                    'link': icon_path,
                    'lod': lod,
                    'coords': coordinates,
                })
            network_links = self.get_network_links(root)

        if foo_list:
            for foo in foo_list:
                foo['path'] = path
                coords = ','.join(foo['coords'])
                feature = MapFeature(path=foo['path'],
                                     image=foo['link'],
                                     coords=coords,
                                     lod=foo['lod'],
                                     key=self.key,
                                     subfolder=self.subfolder)
                unique = self.app.session.query(MapFeature).filter(MapFeature.image==foo['link']).first()
                if unique is None:
                    self.app.session.add(feature)
                
        else:
            data['path'] = path
            coords = ','.join(data['coords'])
            feature = MapFeature(path=data['path'],
                                 image=data['link'],
                                 coords=coords,
                                 lod=data['lod'],
                                 key=self.key,
                                 subfolder=self.subfolder)
            unique = self.app.session.query(MapFeature).filter(MapFeature.image==data['link']).first()
            if unique is None:
                self.app.session.add(feature)

        if network_links:
            try:
                for link in network_links:
                    relfile = os.path.normpath(os.path.join(self.foldername, link))
                    filename = relfile.split('/').pop()
                    foldername = os.path.dirname(relfile)
                    folderpath = os.path.join(self.app.TEMP_PATH,foldername)
                    # file = os.path.join(folderpath,filename)
                    network_link = NetworkLink(file=filename,
                                path=folderpath,
                                region=self.key,
                                group='')
                    self.app.session.add(network_link)
                    
            except Exception as err:
                # pass
                print(err)
                # traceback.print_exc()

        return data

    def handle_file_extract(self, file, path):
        # doc.kml files
        if not os.path.isfile(file) and file.endswith('.kml') and file.startswith('doc'):
            obj = self.xml_to_obj(path)
            data = self.build_data(obj.NetworkLink)
            data['path'] = path
            coords = ','.join(data['coords'])
            feature = MapFeature(path=data['path'],
                                 image=data['link'],
                                 coords=coords,
                                 lod=data['lod'],
                                 key=self.key,
                                 subfolder=self.subfolder)
            unique = self.app.session.query(MapFeature).filter(MapFeature.image==data['link']).first()
            if unique is None:
                self.app.session.add(feature)
            
            return data
        # Normal KML files
        elif os.path.isfile(file) and file.endswith('.kml'):
            data = self.parse_kml(file, path)
            return data
        # Folder
        elif not os.path.isfile(file):
            foldername = os.path.join(self.foldername, file)
            kml = Kml(self.app, foldername, self.key)
            return kml.extract()
        # PNG
        else:
            pass

    def extract(self):
        os.chdir(self.path)
        contents = self.get_contents()
        data = []
        for file in contents:
            path = os.path.join(self.path, file)
            data.append((path, self.handle_file_extract(file, path)))
        self.app.session.commit()
        self.app.return_to_root()
        return data

    def extract_kml(self, file):
        os.chdir(self.path)
        path = os.path.join(self.path, file)
        data = self.handle_file_extract(file,path)
        self.app.session.commit()
        self.app.return_to_root()

        return data

