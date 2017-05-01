import os
import glob
import json
from time import time

def create_dir(dir_name):
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)

    return dir_name

def create_temp_dir(folder):
    temp_dir = '.tmp' + str(int(time()))
    full_path = folder + '/' + temp_dir
    create_dir(full_path)

    return full_path

def obj_json(obj):
    return json.dumps(obj, default=lambda o: o.__dict__, indent=4,sort_keys=True)
