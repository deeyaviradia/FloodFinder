
import flask
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
import json
import base64
from PIL import Image
import os
import json
import cv2
import random
import io
import dbUtil_SQLServer as dbUtil
import pymssql
from FFConfig import FFConfig
import FFutil
from datetime import datetime
import FFrecycle
import logging

logging.basicConfig(filename='FFapi.log', filemode='w', format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)


def get_imageFiles_new(con, j):
    predicate = "lat ='{0}' and long='{1}'".format(j["lat"], j["long"])
    attempts_left = 3
    _sql = "SELECT cameraName [locationName], locationName+'['+cameraName+']' [caption], filePath, analyzedFilePath FROM V_imageFiles WHERE {0} for json path".format(predicate)
    print(_sql)
    while attempts_left > 0:
        try:
            _ = dbUtil.sql_fetch(
                con, _sql)
            if isinstance(_[0], list):
                return _[0][0]
            else:
                attempts_left -= 1
        except Exception as ex:
            print("--> "+ex)
            attempts_left -= 1
    return None


def get_imageFiles(con, j):
    predicate = "lat ='{0}' and long='{1}'".format(j["lat"], j["long"])
    _ = dbUtil.sql_fetch(
                con, "SELECT cameraName [locationName], locationName+'['+str(id)+']'  [caption], filePath, analyzedFilePath FROM V_imageFiles WHERE {0} for json path".format(predicate))
    _data = ""
    for i in _:
        _data += i[0]
    return _data


# curl http://floodfinder.org:6000/
@app.route('/', methods=['GET'])
@app.route('/api/', methods=['GET'])
def default():
    now = datetime.now() # current date and time
    date_time = now.strftime("%d/%m/%Y, %H:%M:%S")
    # return json.dumps({"currentDateTime": "{0}".format(date_time)})+"\n\n"
    return "I am alive @ {0}".format(date_time)

# curl http://13.82.195.126:6000/status
@app.route('/status', methods=['GET'])
@app.route('/api/status', methods=['GET'])
def status():
    return jsonify(json.loads(FFutil.get_data(ffConfig.get_db_connection(), "isFlooded<>999")))

# curl localhost:6000/images/test1_image.jpg
@app.route("/images/<path>", methods=['GET'])
@app.route("/api/images/<path>", methods=['GET'])
def download_file(path=None):
    logging.debug(path)
    try:
        if "f-" in path:
            fnm = path.split("_")[0][2:]+"/"+path
        else:
            fnm = path.split("_")[0]+"/"+path

        logging.debug(fnm)

        if "jpg" in path:
            return flask.send_from_directory(IMAGES_DIR, fnm, as_attachment=True)
        else:
            return flask.send_from_directory(ANALYSED_IMAGES_DR, path, as_attachment=True)
        
    except FileNotFoundError:
        flask.abort(404)

# curl localhost:6000/latest?lat=1&long=1
@app.route("/latest", methods=['GET'])
@app.route("/api/latest", methods=['GET'])
def get_latest_images():
    try:
        content = {"lat": request.args["lat"], "long": request.args["long"]}
        _ = get_imageFiles(ffConfig.get_db_connection(), content)
        content["images"] = json.loads(_)
        return flask.jsonify(content)
    except:
        flask.abort(504)

########################################  Start ########################################

ffConfig = FFConfig("FFconfig.json")
BASE_DIR = './'
IMAGES_DIR = ffConfig.get_raw_image_folder()+"/"
ANALYSED_IMAGES_DR = ffConfig.get_analyzed_image_folder()+"/"
db_connection = ffConfig.get_db_connection()

app.run("127.0.0.1", port=6000, debug=True, threaded=True)
