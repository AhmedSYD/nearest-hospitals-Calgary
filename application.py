from flask import Flask, render_template, request
import requests
import datetime

app=Flask(__name__)


@app.route("/")
def start_mapping():
    return render_template("nearest_hospitals.html")

@app.route("/nearest", methods=["POST"]) 
def after_clicking_on_school():
    ##read school dataset
    schools_res = requests.get("https://data.calgary.ca/resource/fd9t-tdn2.geojson")
    print(schools_res)

    if schools_res.status_code==200:
        schools_json=schools_res.json()
    else:
        schools_json= {}
    # print("school_json=",schools_json)

    ##read hospitals dataset
    hospitals_clinics_res = requests.get("https://data.calgary.ca/resource/x34e-bcjz.geojson",\
                            params={"$where":"type='PHS Clinic' or type='Hospital'"})
    print(hospitals_clinics_res)

    if hospitals_clinics_res.status_code==200:
        hospitals_clinics_json=hospitals_clinics_res.json()
    else:
        hospitals_clinics_json= {}
    # print("hospitals_json=",hospitals_clinics_json)

    outData={
        "schools":schools_json,
        "hospitals_clinics":hospitals_clinics_json
    }

    return outData


if __name__== "__main__" :
    app.run(debug=True)