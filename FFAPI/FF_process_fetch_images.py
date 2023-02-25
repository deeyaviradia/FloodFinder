from PIL import Image
import os
from random import randrange

def crop_traffic_camera_image(img_name):
    img = Image.open(img_name)
    img = img.resize((640, 640))
    area = (0, 120, 640, 490)
    cropped_img = img.crop(area)
    return cropped_img


directory = "/home/daviradia001/FFAPI/fetched_images"
processed_directory = "/home/daviradia001/FFAPI/processed_fetched_images"

for filename in os.listdir(directory):
    if filename.endswith(".jpg"):
        fnm = os.path.join(directory, filename)
        print(fnm)
        im = crop_traffic_camera_image(fnm)
        try:
            im.save(os.path.join(processed_directory, filename))

        except Exception as ex:
            pass
    else:
        continue

