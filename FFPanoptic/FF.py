# import some common libraries
import numpy as np
import os, json, cv2, random, io
from PIL import Image

# import some common detectron2 utilities
import os, json, cv2, random, io
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.utils.visualizer import Visualizer
from detectron2.data import MetadataCatalog, DatasetCatalog

import panopticapi
from panopticapi.utils import id2rgb, rgb2id

BASE_DIR = './'

"""## Make Predictions using a pre-trained Detectron2 panoptic segmentation model

"""

# Commented out IPython magic to ensure Python compatibility.
IMAGES_DIR = os.path.join(BASE_DIR, 'Flooded_Images/')
# %cd $IMAGES_DIR

# should have some images
cfg = get_cfg()
cfg.MODEL.DEVICE = 'cpu'
cfg.merge_from_file(model_zoo.get_config_file("COCO-PanopticSegmentation/panoptic_fpn_R_101_3x.yaml"))
cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-PanopticSegmentation/panoptic_fpn_R_101_3x.yaml")
predictor = DefaultPredictor(cfg)

meta = MetadataCatalog.get(cfg.DATASETS.TRAIN[0])

im = cv2.imread("{0}/7095576a39.jpg".format(IMAGES_DIR))
# cv2.imshow('FRAME', im)

panoptic_seg, segments_info = predictor(im)["panoptic_seg"]
# v = Visualizer(im[:, :, ::-1], MetadataCatalog.get(cfg.DATASETS.TRAIN[0]), scale=1.2)
# out = v.draw_panoptic_seg_predictions(panoptic_seg.to("cpu"), segments_info)
# cv2.imshow('FRAME', out.get_image()[:, :, ::-1])

print(segments_info)
# STUFF category_id:              THING category_id:
#   12 - house                      0 - person
#   26 - snow                       7 - truck
#   34 - water
#   37 - tree
#   50 - building

# segment id map; shape: [400, 640]
panoptic_seg

# """## EXPERIMENTATION - Save predictions to file"""
#
# # Commented out IPython magic to ensure Python compatibility.
# # %cd $BASE_DIR
#
# # should have some images
# !ls
#
# #
# cfg = get_cfg()
# cfg.merge_from_file(model_zoo.get_config_file("COCO-PanopticSegmentation/panoptic_fpn_R_101_3x.yaml"))
# cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-PanopticSegmentation/panoptic_fpn_R_101_3x.yaml")
# predictor = DefaultPredictor(cfg)
#
# meta = MetadataCatalog.get(cfg.DATASETS.TRAIN[0])
#
# im_id = '000000194506'
# im = cv2.imread("./" + im_id + ".jpg")
# cv2_imshow(im)
#
# panoptic_seg, segments_info = predictor(im)["panoptic_seg"]
#
# v = Visualizer(im[:, :, ::-1], meta, scale=1.0)
# out = v.draw_panoptic_seg_predictions(panoptic_seg.to("cpu"), segments_info)
# cv2_imshow(out.get_image()[:, :, ::-1])
#
# # river is incorrect --> change to water
# for seg in segments_info:
#     if seg['category_id'] == 20:  # river
#         seg['category_id'] = 34  # water
#
# segments_info
#
# v = Visualizer(im[:, :, ::-1], meta, scale=1.0)
# out = v.draw_panoptic_seg_predictions(panoptic_seg.to("cpu"), segments_info)
# cv2_imshow(out.get_image()[:, :, ::-1])
#
# # hints from https://github.com/facebookresearch/detectron2/blob/main/detectron2/evaluation/panoptic_evaluation.py
#
# _thing_contiguous_id_to_dataset_id = {
#     v: k for k, v in meta.thing_dataset_id_to_contiguous_id.items()
# }
# _stuff_contiguous_id_to_dataset_id = {
#     v: k for k, v in meta.stuff_dataset_id_to_contiguous_id.items()
# }
#
#
# def _convert_category_id(segment_info):
#     isthing = segment_info.pop("isthing", None)
#     if isthing is None:
#         # the model produces panoptic category id directly. No more conversion needed
#         return segment_info
#     if isthing is True:
#         segment_info["category_id"] = _thing_contiguous_id_to_dataset_id[
#             segment_info["category_id"]
#         ]
#     else:
#         segment_info["category_id"] = _stuff_contiguous_id_to_dataset_id[
#             segment_info["category_id"]
#         ]
#     return segment_info
#
#
# panoptic_img = panoptic_seg.cpu().numpy()
#
# file_name_png = im_id + ".png"
# predictions = []
# pred = {}
#
# with io.BytesIO() as out:
#     Image.fromarray(id2rgb(panoptic_img)).save(out, format="PNG")
#     # need to convert ids?
#     segments_info = [_convert_category_id(x) for x in segments_info]
#
#     pred = {"image_id": int(im_id),
#             "id": 0,
#             "file_name": file_name_png,
#             "png_string": out.getvalue(),
#             "segments_info": segments_info, }
#
# predictions.append(pred)
