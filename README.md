# Lab 4: nearest-hospitals-Calgary

ENGO 651 - Adv. Topics on Geospatial Technologies

## Overview:
This website is an assignment for the 4th lab (Adv. Topics on Geospatial Technologies). On this website, a user can find the location of schools, clinics, and hospitals on the map of Calgary. If the user clicks on any school on the map, the nearest hospital/clinic will be highlighted on the map. Moreover, the name of any school, hospital, or clinic will appear as a popup message if the user hovers over it. 

## System requirement:
- Any platform you like such as Windows, Linux, and so on. 
- Use any browsers (Firefox, Google Chrome,...) to display the html pages. 
- Python 3.6 or higher

## Libraries required to install:
- Flask 
- requests <br>
You can find both libraries in the `requirements.txt` and install them by running this command `pip3 install -r requirements.txt` in the terminal window.

## Tools and resources are used:
- HTML 5
- CSS
- Python flask 
- Javascript
- [Mapbox](https://docs.mapbox.com/)
- [Turf.js](https://docs.mapbox.com/help/tutorials/analysis-with-turf/)
- [Location of schools in Calgary dataset](https://data.calgary.ca/Services-and-Amenities/School-Locations/fd9t-tdn2)
- [Location of hospitals and clinics in Calgary dataset](https://data.calgary.ca/Services-and-Amenities/Calgary-Health-Clinics-and-Hospitals/pp67-7mf4)

## How to use the web page:
* After installing all libraries required in your environment, run `application.py` in any IDE you like.
* You will find a line in the console `Running on <server link>` where `<server link>` is the link of the server of the flask is working on. In my case, the server link is `http://127.0.0.1:5000/`. 
* Copy the server link and paste it in the link box of any browser you like to go to the website.

![map](https://user-images.githubusercontent.com/26576895/111608400-d8d28a00-87e1-11eb-816b-f7ad5e461e6f.JPG)

* looking closely at the figure above, one can see that the shape of a hospital/clinic marker is different than the shape of a school marker. 
* If the user hovers over any marker he likes, whether hospital/clinic marker or school marker, the popup content message will appear, like the image below.

![popcontent_message](https://user-images.githubusercontent.com/26576895/111609093-9d848b00-87e2-11eb-9b30-a3082c36fba4.png)

* Moreover, if the user clicks on any school marker, the nearest hospital marker will be highlighted by a blue circle as shown below.

![nearest_hospital](https://user-images.githubusercontent.com/26576895/111619604-73d16100-87ee-11eb-9370-7502a192a442.JPG)

## what’s contained in each file:
- `application.py`: is responsible for python flask coding and getting JSON data from Open Calgary API datasets(school locations and hospital/clinic locations datasets) and then passes it to the `nearest_hospitals.js` file.
- `templates/nearest_hospitals.html`: has the structure of the webpage and all links of **Mapbox** and **turf.js** code.   
- `static/styles/nearest_hospitals.css`: this is a specified style sheet file for the `nearest_hospitals.html` file.
- `static/js/nearest_hospitals.js`: is responsible for creating a Mapbox map displaying the location of schools, clinics, and hospitals on the map. Moreover, the algorithm of obtaining the nearest hospital or clinics to the selected school by a user is included in the file, also.

## Demo:
- You can find the demo video for this webpage at this [**Link**]()

