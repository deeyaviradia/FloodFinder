#import pymssql
from FFConfig import FFConfig
import dbUtil_SQLServer as dbUtil
import FFutil
import json




ffConfig = FFConfig("FFconfig.json")
BASE_DIR = './'
IMAGES_DIR = ffConfig.get_raw_image_folder()+"/"
db_connection = ffConfig.get_db_connection()


r = FFutil.get_data(db_connection,"1=1")
j = json.loads(r)
print(len(j))
print(j[0])