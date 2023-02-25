import json
import pymssql
import time


class FFConfig():
    def __init__(self, config_filename):
        self.config = None
        self.connection_pool=[]
        with open(config_filename) as f:
            self.config = json.load(f)

    def get_db_connection(self):
        _db = self.config["db"]
        if len(self.connection_pool) == 0:
            print("Initializing the connection pool with {0} connections...".format(_db["pool_size"]))
            for i in range(0,_db["pool_size"]):
                self.connection_pool.append({
                    "id": i,
                    "expires": None, 
                    "dbConnection" : pymssql.connect(server=_db["server"], user=_db["user"], password=_db["password"], database=_db["database"])
                })

        for conn in self.connection_pool:
            if conn["expires"] is None or conn["expires"] < int(time.time()):
                conn["expires"] = int(time.time())+_db["query_timeout"]
                print("Offering connection {0} from the pool...".format(conn["id"]))
                return conn["dbConnection"]

        # If no connections are available then forcefully offer the first one...
        self.connection_pool[0]["expires"] = int(time.time())+_db["query_timeout"]
        return self.connection_pool[0]["dbConnection"]  


    def get_analyzed_image_folder(self):
        return self.config["analyzed_image_location"]

    def get_raw_image_folder(self):
        return self.config["raw_image_location"]

    def get_flood_threshold(self):
        return self.config["flood_threshold"]
    
    def get_flood_indicator(self):
        return self.config["flood_indicator"]
