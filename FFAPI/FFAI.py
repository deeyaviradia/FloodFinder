import flask
from flask import Flask, request
from flask_restful import Resource, Api
import json
import base64
from PIL import Image
import os
import sys
import json
import cv2
import random
import io
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.utils.visualizer import Visualizer
from detectron2.data import MetadataCatalog, DatasetCatalog
import panopticapi
from panopticapi.utils import id2rgb, rgb2id
import dbUtil_SQLServer as dbUtil
import pymssql
from FFConfig import FFConfig
import FFutil
from os.path import exists

BASE_DIR = './'
IMAGES_DIR = os.path.join(BASE_DIR, "Flooded_Images/")


class FFAI():
    def __init__(self):
        self.cfg = get_cfg()
        self.cfg.MODEL.DEVICE = 'cpu'
        self.cfg.merge_from_file(model_zoo.get_config_file(
            "COCO-PanopticSegmentation/panoptic_fpn_R_101_3x.yaml"))
        self.cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url(
            "COCO-PanopticSegmentation/panoptic_fpn_R_101_3x.yaml")
        self.predictor = DefaultPredictor(self.cfg)
        self.meta = MetadataCatalog.get(self.cfg.DATASETS.TRAIN[0])

    def predict(self, image_filename):
        # im = cv2.imread("{0}/{1}".format(IMAGES_DIR, image_filename))
        print(image_filename)
        im = cv2.imread(image_filename)
        panoptic_seg, segments_info = self.predictor(im)["panoptic_seg"]
        panoptic_img = panoptic_seg.cpu().numpy()
        # print(self.predictor(im))
        # print(segments_info)
        for seg in segments_info:
            if seg['category_id'] == 20:  # river
                seg['category_id'] = 34  # water

        img_fnm = image_filename.split(".")[0]
        analyzed_img_name = ffConfig.get_analyzed_image_folder()+"/" + \
            img_fnm.split("/")[-1]+".png"
        file_name_png = img_fnm + ".png"
        pred = {}

        v = Visualizer(im[:, :, ::-1], self.meta, scale=1.0)
        out = v.draw_panoptic_seg_predictions(panoptic_seg.to("cpu"), segments_info)
        out.save(analyzed_img_name)

        pred = {"image_id": img_fnm,
                "id": 0,
                "height": panoptic_img.shape[0],
                "width": panoptic_img.shape[1],
                "file_name": analyzed_img_name,
                # "png_string": base64.b64encode(out.getvalue()).decode('utf-8'),
                "segments_info": [self._convert_category_id(x) for x in segments_info]
                # self._convert_category_id(segments_info)}
                }
        pred = self._process_segment_info(pred)
        return pred

    def _convert_category_id(self, segment_info):
        # return segment_info
        _thing_contiguous_id_to_dataset_id = {
            v: k for k, v in self.meta.thing_dataset_id_to_contiguous_id.items()
        }
        _stuff_contiguous_id_to_dataset_id = {
            v: k for k, v in self.meta.stuff_dataset_id_to_contiguous_id.items()
        }

        isthing = segment_info.pop("isthing", None)
        if isthing is None:
            # the model produces panoptic category id directly. No more conversion needed
            return segment_info
        if isthing is True:
            segment_info["category_id"] = _thing_contiguous_id_to_dataset_id[
                segment_info["category_id"]
            ]
        else:
            segment_info["category_id"] = _stuff_contiguous_id_to_dataset_id[
                segment_info["category_id"]
            ]
        return segment_info

    def _process_segment_info(self, j):
        json_data = None
        with open("coco_categories.json", "r") as f:
            json_data = json.load(f)

        water_categories = filter(
            lambda x: x["supercategory"] == "water", json_data["categories"])
        water_categories = list(map(lambda x: x["id"], list(water_categories)))

        # print(water_categories)
        # print("Total Area : {0}".format(j["images"][0]["width"] * j["images"][0]["height"]))

        confidence_threshold = ffConfig.get_flood_threshold()
        water_area = 0
        total_objects_area = 0
        for i in j["segments_info"]:

            # and i["score"] >= confidence_threshold:
            if i["category_id"] in water_categories:
                total_objects_area += i["area"]
                water_area += i["area"]

        # print("Total(all) objects area: {0}".format(total_objects_area))
        # print("Total water logged area: {0}".format(water_area))
        # print("Total water area coverage: {0}%".format(water_area * 100 / total_objects_area))
        j["total_area"] = j["height"] * j["width"]
        j["water_area"] = water_area
        j["water_area_percentage"] = j["water_area"] * 100 / j["total_area"]

        return j


def analyze_all_cameras(camera_number):
    _ffai = FFAI()
    #_data = json.loads(FFutil.get_data(db_connection, "isFlooded = 3"))

    if camera_number is not None:
        _data = json.loads(FFutil.get_data(
            db_connection, "filePath like '%/f-%' and id = {0}".format(camera_number)))
    else:
        _data = json.loads(FFutil.get_data(
            db_connection, "filePath like '%/f-%'"))

    r = []
    for camera in _data:
        img = camera["filePath"]
        _analysis = _ffai.predict(img)
        _info = {"image": img,
             "cameraId": camera["Id"],
             "analysis": _analysis}
        r.append(_info)

        FFutil.update_prediction(ffConfig, db_connection, _info)

    return r


########################################  Start ########################################

ffConfig = FFConfig("FFconfig.json")
camera_images_folder = "/home/daviradia001/scrapper"
db_connection = ffConfig.get_db_connection()

a = json.dumps(analyze_all_cameras(sys.argv[1]))
print(a)
