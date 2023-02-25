from app import app
import flask
from flask import Flask, request
#from flask_restful import Resource, Api
import json
import os
import base64
from PIL import Image

BASE_DIR = './'
IMAGES_DIR = os.path.join(BASE_DIR, "Flooded_Images/")

j = [
  {
    "locationName": "WSF_Seattle_Ferry_Main_Vehicle_Holding",
    "lat": "-121.91298797814603",
    "long": "-121.91298797814603",
    "isFlooded": -1,
    "floodedAreaPercentage": "0.00"
  },
  {
    "locationName": "NY_SSP_at_Exit_40_(RMC)_to_Exit_41_(Bayshore_Rd)",
    "lat": "-121.88282308320592",
    "long": "-121.88282308320592",
    "isFlooded": -1,
    "floodedAreaPercentage": "0.00"
  },
  {
    "locationName": "FL-Lakeland_LA_Florida_Ave_-_Lake_Miriam_Dr",
    "lat": "-121.87468888982899",
    "long": "-121.87468888982899",
    "isFlooded": -1,
    "floodedAreaPercentage": "0.00"
  },
  {
    "locationName": "AL_Fairhope_Ave_CR_48",
    "lat": "-121.95013089229744",
    "long": "-121.95013089229744",
    "isFlooded": 3,
    "floodedAreaPercentage": "0.00"
  },
  {
    "locationName": "NY_I-295_at_Pennyfield_Avenue",
    "lat": "-121.94617589167322",
    "long": "-121.94617589167322",
    "isFlooded": -1,
    "floodedAreaPercentage": "0.00"
  },
  {
    "locationName": "GA_United_Ave_E_-_Dept_of_Public_Safety",
    "lat": "-121.85589567114806",
    "long": "-121.85589567114806",
    "isFlooded": -1,
    "floodedAreaPercentage": "0.00"
  },
  {
    "locationName": "NY_NSP_at_Rt_135(Seaford_Oyster_Bay_Expwy)",
    "lat": "-121.88577328428511",
    "long": "-121.88577328428511",
    "isFlooded": -1,
    "floodedAreaPercentage": "0.00"
  },
  {
    "locationName": "NY_Church_Street_-_Vesey_Street",
    "lat": "-121.78623216734965",
    "long": "-121.78623216734965",
    "isFlooded": -1,
    "floodedAreaPercentage": "0.00"
  },
  {
    "locationName": "NY_WSP_Exits_W02-W03_at_Salisbury_Park_Drive",
    "lat": "-121.78587666099777",
    "long": "-121.78587666099777",
    "isFlooded": -1,
    "floodedAreaPercentage": "0.00"
  },
  {
    "locationName": "I-5_at_MP_176-_NE_175th_St",
    "lat": "-121.88921088545773",
    "long": "-121.88921088545773",
    "isFlooded": -1,
    "floodedAreaPercentage": "0.00"
  }
]


@app.route('/status', methods=['GET'])
def status():
    return json.dumps(j)


@app.route("/images/<path>")
def download_file(path=None):
    try:
        return flask.send_from_directory(IMAGES_DIR, path, as_attachment=True)
    except FileNotFoundError:
        flask.abort(404)


@app.route("/latest", methods=['POST'])
def get_status():
    try:
        content = request.json
        content["images"] = [
            "http://{0}/images/filename1.jpg".format(flask.request.remote_addr)]
        print(content)
        return flask.jsonify(content)
    except:
        flask.abort(504)
