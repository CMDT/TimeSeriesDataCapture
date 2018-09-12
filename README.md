# TimeSeriesDataCapture
This is the parent project for a suite of applications which take time series data from an instrument, store as tagged, searchable, indexed files, and display on a publicly accessible website.

---

# Sub Projects
[BrowseData](https://github.com/CMDT/TimeSeriesDataCapture_BrowseData)

[ImportSource](https://github.com/CMDT/TimeSeriesDataCapture_ImportSource)

[Single Page Web Application](https://github.com/CMDT/TimeSeriesDataCapture_SPWA)

[Private](https://github.com/CMDT/TimeSeriesDataCapture_Private)

  
# Trello
[Trello Team](https://trello.com/timeseriesdatacapture)   
[Parent Trello Board](https://trello.com/b/0pc2DUBy/overview)

 # Wireframes
 [Github Pages](https://cmdt.github.io/TimeSeriesDataCapture/wireframes)
 
 [On the Repo](https://github.com/CMDT/TimeSeriesDataCapture/tree/master/docs/wireframes)


# Setup

## MongoDB Hosting
The MongoDB database will store the runs, authentication, algorithms palettes and tags. To host the database a combination of Heroku and mLab will be used.

### Prerequisites

#### Heroku Account 
To host the database first a Heroku account is needed, sign up to [Heroku](https://signup.heroku.com)

### Hosting
From the [Heroku dashboard](https://dashboard.heroku.com/apps) create a new application, name the app, and choose the appropriate region.

To install mLab MongoDb navigate to [mongolab addons page](https://elements.heroku.com/addons/mongolab) and install, ensuring the add-on is added to the newly created app

Within the Resources tab for the newely created application if you see the mLab MongoDB add-on mLab  has been succesfully installed.

### MongoDB user
Within the Resources tab for the database application click the mLab MongoDB add-on to navigate to the mLab dashboard.

Under the users tab add a new database user, you will need the database-username and database-password to connect.

## MongoDB Creation
To create the mongoDB database the mongo shell will be used.

### Prerequisites

#### MongoDB Shell
Before creating the MongoDB database, first MongoDB must be installed locally. Install [MongoDB Community Edition](https://docs.mongodb.com/manual/installation/#tutorial-installation) for the appropriate OS.

To start the mongo shell change directory to the `<mongodb installation dir>`

```
cd <mongodb installation dir>
```

Type `./bin/mongo` to start mongo. To ensure mongodb installation:

```
mongo --version
```

alternatively add `<mongodb installation dir>/bin` to the `PATH` environment variable.

### Creation
Connect to the mongodb server, mLab dashboard provides instruction on how to.

```
mongo <mongo server URI> -u <dbuser> -p <dbpassword>
```

Verify the database, the output should be the `<database name>`

```
db
```

To create the starting database template:

```
db.createCollection("runsCollection",{capped:false}); db.createCollection("tagsCollection",{capped:false});db.createCollection("algorithmsCollection",{capped:false}); db.createCollection("authenticationCollection",{capped:false}); db.createCollection("palettesCollection",{capped:false}); db.algorithmsCollection.insert({"name" : "default","parameters" : [ "T(Copper)", "T(Cell1)", "DAC"],"algorithm" : "return((T1-T2)/((DAC*DAC)/22))"}); db.palettesCollection.insert({"name" : "default","description" : "default colour palette","palette" : [ "#B2003F", "#00B20F","#FF005A"]});
```

*for more information of the starting database template see [mongodb-database-template.md](https://github.com/CMDT/TimeSeriesDataCapture/blob/master/Documents/mongodb-database-template.md)*

## Auth0
The single page web application (SPWA) uses Auth0 for authentication. 

### Prerequisites

#### Auth0 Account 
To use authentication first a Auht0 account is needed, sign up to [Auth0](https://auth0.com/signup)

### Setup 
The SPWA uses Auth0 *SINGLE PAGE APPLICATION* application type.

#### Create Single Page Application
One the Auth0 dashboard under the Applications section create a new application, picking the Single Page Web Applications application type.

Under settings for the newly created application add the domain of the SPWA within the Allowed Callbacks URLs, Allowed Web Origins and Allowed Origins text areas.



*If the domain of the application is not known the text areas can be filled later*

*Under Advanced Setting, under Endpoints take note of the OAuth Endpoints, these will be used for the Browse API*

## How to Use
The single page web application (SPWA) has to user types casual and admin both, below describes each use case.

## Casual user
The casual user is user who is not logged in thus admin controls are disabled. 
 
### Prerequisites
- none

### Features
- searching public runs
- viewing & sharing public runs
- exporting public runs

### Uses
#### Searching
To search for a run: on the home page of the SPWA the user can search by tags/time/date within the seach bar. When searching by tags a auto-complete will show.   


#### Viewing
Once a run has been searched for, a single run can be viewed simply by clicking on it, to view multiple runs use the checkboxes and blue View button.

One the view page the graph can be zoomed in and out using the mouse wheel and panned using click and drag. To offset the active drag click and drag while holding shift.

Underneath the graph is the Column-Tag panel, from here run tags can be viewed and columns visibility can be toggled.

#### Exporting 
Once a run has been searched for, runs can be zipped and saved to the users local machine by using the checkboxes to select multiple runs and clicking the green Export button.

## Admin User
The admin user is a user who is logged in thus admin controls are enabled. The admin users features and uses are a superset of the casual user features and uses.

### Prerequisites
- A OneDrive account is needed to import runs into the database, sign up to [OneDrive](https://login.microsoftonline.com)  
