from flask import Flask
from flask_cors import CORS, cross_origin




app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'

from app import routes