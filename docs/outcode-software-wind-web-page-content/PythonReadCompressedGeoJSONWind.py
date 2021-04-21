####################################################################################
# Name:		PythonReadCompressedGeoJSONWind.py
# Date:		07-APR-2021
# Purpose:	Verify the reading of a Compressed GeoJSON
# Version:  Developed using Python 3.7 (64bit) MS Windows 10
# Notes:    This is version 1.0 of the script for the pain version of the Qrisq Web App 2.0
####################################################################################


import os               #Not needed in the AWS Execution Environment
import sys              #Not needed in the AWS Execution Environment
import math             #Needed in AWS Execution Environment
import gzip             #Used to compress file
import json             #Exports Shape file to JSON

try:

    #Store the path of this python script
    python_scriptpath = os.path.dirname(os.path.abspath(__file__))

    wind_compressesed_geojson_filename    = os.path.join(python_scriptpath,'wind-2020-al28-17-202010282100.json')

    geojson_compressed_file                 = gzip.open(wind_compressesed_geojson_filename,'rb')
    geojson_compressed_data                 = geojson_compressed_file.read()
    geojson_str                             = json.loads(geojson_compressed_data.decode())

    print(geojson_str['features'][0]['properties'])
    print('\n')
    print('\n')


    formatted_geojson = json.dumps(geojson_str,indent=4)
    print(formatted_geojson)

    print('PythonReadCompressedGeoJSONWind.py: processing complete.')
except SystemExit as ex:
    #Processing complete
    print('PythonReadCompressedGeoJSONWind.py: processing complete.')


