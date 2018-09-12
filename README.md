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
From the Heroku dashboard create a new application, name the app, and choose the appropriate region.

To install mLab MongoDb navigate to [mongolab addons page](https://elements.heroku.com/addons/mongolab) and install, ensuring the add-on is added to the newly created app

Within the Resources tab for the newely created application if you see the mLab MongoDB add-on mLab  has been succesfully installed.

### MongoDB user
Within the Resources tab for the database application click the mLab MongoDB add to navigate to the database dashboard.

Under the users tab add a new database user, you will need the database-username and database-password to connect.

## MongoDB Creation
To create the template of the mongoDB database the mongodb shell will be used

### Prerequisites

#### MongoDB Shell
Before creating the MongoDB collections, first MongoDB must be installed locally. Install MongoDB Community Edition for the appropriate OS.
