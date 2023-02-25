import os
import json
import glob
import dbUtil_SQLServer as dbUtil

def json_load_from_file(fnm):
    s = ""
    with open(fnm) as f:
        s = f.read()
    return json.loads(s)


def dict_to_csvstr(d):
    l = []
    for k, v in d.items():
        l.append("{0}={1}".format(k, v))

    return ",".join(l)


def show_info(rows):
    for row in rows:
        print(row)


def get_latest_filename(folder_name):
    list_of_files = glob.glob('{0}/*jpg'.format(folder_name))
    if len(list_of_files) == 0:
        return None

    latest_file = max(list_of_files, key=os.path.abspath)
    return latest_file


def get_data(con, predicate):
    print("SELECT * FROM imageInfo WHERE {0} for json path".format(predicate))
    _ = dbUtil.sql_fetch(
        con, "SELECT * FROM imageInfo WHERE {0} for json path".format(predicate))
    _data = ""
    for i in _:
        _data += i[0]
    return _data

def update_prediction(ffcfg, con, info):
    indicator = ffcfg.get_flood_indicator()
    water_percentage = info["analysis"]["water_area_percentage"]

    for i in range(len(indicator), 0, -1):
        if water_percentage <= indicator[i-1]:
            continue
        else:
            break
        
    dbUtil.sql_update(con, 
    "imageInfo", 
    "analyzedFilePath='{0}', isFlooded={1}, floodedAreaPercentage={2}".format(info["analysis"]["file_name"], i-1, water_percentage),
    "id={0}".format(info["cameraId"])
    )

