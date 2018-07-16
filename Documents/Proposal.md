# Time Series Data Capture Proposal

This system will aim to provide a way for research groups to store and visualise time series data, designed with extensibility in the choice of location and format of data files. Initially, .csv files stored on OneDrive will be supported.



The system will include:

- Single Page Web App (SPA) to search and visualise each data run
- Import API to pull data from an external file storage
- Browse API to communicate with the SPA and a Database to store the imported data 



Instrument control has been dropped, in favour more analysis features. We felt focusing on the instrument distracted from the purpose of the system, to able to view and store time series data.

This gives more resources for the analytical visualisation and removes a substantial amount of risk associated with instrument.



---

## Single Page Web App
The SPA allow any user to search for runs, view and compare. Furthermore it will also allow administrator level users to import new runs as well as edit them.

Components of SPA :

- Login 
- Import new runs
- Search runs
- Export data to local machine
- Delete data from database
- URL State
- Responsive UI

#### [Login](https://cmdt.github.io/TimeSeriesDataCapture/wireframes/#/page/homepageloggedin) 
Throughout the SPA if user is not logged in, all admin controls e.g. add new annotation will be hidden. Once a user is logged in admin controls will be shown.

#### [Import New Runs](https://cmdt.github.io/TimeSeriesDataCapture/wireframes/#/page/import )  
To import new runs into the database, admin user can select new runs which are stored in the file storage but not into the database. A different algorithm can be chosen to calculate Rth, once selection is confirmed runs will be imported into database

#### [Search Runs](https://cmdt.github.io/TimeSeriesDataCapture/wireframes/#/page/homepagesearch)
On the SPA the user can search for runs either by time & date, tags or data IDs. If user is not logged in only public runs will be available but if the user is logged in (admin) all runs will be available.

#### [Export Data to local machine](https://cmdt.github.io/TimeSeriesDataCapture/wireframes/#/page/homepagesearch_selected)
One or multiple run(s) csv data can be exported to local machine as a zip folders. 

#### Delete Data from Database
The file storage can never be edited but the database can. Admin user can delete runs from database. Once runs are deleted from database they can be re-imported.

#### URL State
The SPA will maintain its exact state within the URL, for example, what runs are being viewed, graph offset and zoom level,  thus the URL can be copied and pasted to the share page being currently viewed. 

#### Responsive UI
The SPA will scale to any size screen either on desktop or mobile

---

## [View and Compare Runs](https://cmdt.github.io/TimeSeriesDataCapture/wireframes/#/page/viewpage)
A line graph will display each run being viewed, the graph can be zoomed in and panned about. For each run, annotations and tag will be displayed.

Components of View Page:

- Run Tab
- Line Graph
- Pan and Zoom
- Edit Tags and Annotations

#### Run Tab
For each run there is a Run Tab, within, corresponding run columns and tags are visible. User can click between each run tab , the run tab currently selected is considered to be the active run, and toggle columns visibility for each run .

#### Line Graph 
On the line graph a trend line will be visible for every column within each run being viewed, annotations for the active run are visible on the graph.

#### Pan and Zoom
User can zoom in the whole graph to view details closer and pan the active run trends origin so features can coincide. 

#### [Edit Tags and Annotations](https://cmdt.github.io/TimeSeriesDataCapture/wireframes/#/page/viewpage_edit_annotation)
From the view page, tags can be edited deleted and new ones added. Annotations can be deleted, relocated (new x coordinate), their descriptions edited and new ones added. 

---

## Import API
Import API allows communication between file storage and server.

Components of Import API:

- Get run folder from file storage

- Compare runs between file storage

#### Get Run
Downloads a specific run folder from file storage to be stored into the database.

#### Compare Runs
Returns which are runs stored in the file storage but not in the database

---

## Browse API
The Browse API allows communication between all components of the system

Components of Browse API:

- Communicates with database
- Communicates with SPA
- Communicates with Import API
- Rth Calculation 


#### Communicates with Database 
Queries the database to either get, update, add or delete run or authentication data.

#### Communicates with SPA
Provides communication channels to the Database and the Import API from SPA

#### Communicates with Import API
Communicates to the Import API to download a specific run or to compare runs

#### Rth Calculation
When new runs are imported, Rth calculation is performed using chosen algorithm and is appended to run data. 

---

## Database
NoSQL database hosted on the server, holds run and authentication data

Components of Database:

- Run Data
- Authentication Data


#### Run Data
Holds a collection of documents, each documents is a run which contains: ID, data and timestamp, tags, annotations and the time series data.

#### Authentication Data 
Holds the file storage Client ID for file storage authentication 

---

## Proposal
The whole project constits of 60 days of work, 47 will be dedicated for execution.

The 47 days of execution will be split into 32 days for development and 15 days for stability testing and handover.

Out of the 32 days of development, we predicted building whole system would only take 147 hours (20 days) leaving us an extra 12 days .

The remaining 12 days will be used to perform two iterations over the view page, tweaking design and/or adding new features. 



Each table below describes how the 147 hours (20 days) will be allocated:

| Search Page Tasks               | Estimate (Hours) |
|--------------------------------:|-----------------:|
| Design Results List             | 2                |
| Design Search Page UI           | 2                |
| Implement Export                | 3                |
| Implement Buttons               | 3                |
| Implement Results List          | 2                |
| Implement Pagination            | 3                |
| Implement Search Page URL State | 3                |



|View Page Tasks                   |Estimate (Hours)|
|---------------------------------:|-------------------:|
|Design Annotations |3|
|Design Column/Tab Panel |2|
|Design Columns/Tab List |2|
|Build Graph Axis |4|
|Build Graph Lines |4|
|Build Graph Responsive |4|
|Implement Graph Zoom |6|
|Implement Graph Pan |6|
|Graph Trend Line Visibility |3|
|Implement Annotation Popup |3|
|Implement Annotation Drag |4|
|Implement Run Update |2|
|Implement Column/Tab Panel |3|
|Implement Edit Tag |2|
|Implement View Page URL State |8|


|Import Page Tasks |Estimate (Hours)|
|--------------------------------:|-----------------:|
|Import Panel |3|
|Folder Path |1|
|Folder Elements |3|
|Page Buttons |3|
|Algorithm Panel |1|
|Implement Import Panel |5|
|Implement Folder Path |1|
|Implement Folder List |3|
|Implement Graph |2|
|Implement Algorithms Panel |2|
|Implement Import Request |1|


|Server Tasks |Estimate (Hours)|
|--------------------------------:|-----------------:|
|Implement Browse API |2|
|Implement Database |6|
|Implement Search Query |2|
|Implement Query Component |2|
|Implement Update Component |2|
|Implement Add Component |2|
|Implement Rth Calculation |2|
|Implement Get Component |3|
|Implement Import API |2|
|Implement Get Import IDs |3|
|Implement Get Import Component |2|


|Authentication Tasks |Estimate (Hours)|
|--------------------------------:|-----------------:|
|Implement Get Client ID |2|
|Implement Auth0 Authentication |3|
|Implement OneDrive Authentication |5|


|Miscellaneous |Estimate (Hours)|
|--------------------------------:|-----------------:|
|Initial Start Up |3|
|Diary |8|

| Total (Hours) | 147  |
| ------------- | ---- |
|               |      |

