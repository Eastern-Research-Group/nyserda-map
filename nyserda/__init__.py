from .app import App
from .kmz import Kmz
from .kml import Kml

def run():
    app = App()
    app.setup()
    # app.
    kmz = Kmz(app)
    kmls = kmz.extract_all(app.ROOT_PATH + '/input')

    for foldername in kmls:
        kml = Kml(app,foldername)
        kml.extract()

    app.cleanup()

def clean():
    app = App()
    app.remove_bin()
