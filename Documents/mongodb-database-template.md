# MongoDB Template
This document describes each step in detail to create the initial database for Time Series Data Capture.

## Collections
The database contains 5 collections runs, tags, alogrithms, authentication and palettes.

### Runs
Runs Collection holds time series data.

```
db.createCollection("runsCollection",{capped:false});
```

### Tags
Tags Collection holds all tags used to search for runs.

```
db.createCollection("tagsCollection",{capped:false});
```

### Alogrithms
Algorithms Collection holds all the algorithms used to calculate *RTH*

```
db.createCollection("algorithmsCollection",{capped:false});
```

### Authentication
Authentication collection hold information about the currently logged in user

```
db.createCollection("authenticationCollection",{capped:false});
```

### Palettes
Palettes collection holds all the colour palettes used by the graph on the single page web application

```
db.createCollection("palettesCollection",{capped:false});
```

## Documents
The database deafult template contains starting documents, an algorithm and a palette.

### Alogrithm
Default algorithm to calculate *RTH*

```
db.algorithmsCollection.insert({"name" : "default","parameters" : [ "T(Copper)", "T(Cell1)", "DAC"],"algorithm" : "return((T1-T2)/((DAC*DAC)/22))"});
```

### Palette
Default palette used by the graph on the single page web application.

```
db.palettesCollection.insert({"name" : "default","description" : "default colour palette","palette" : [ "#B2003F", "#00B20F","#FF005A"]});
```

## Single Command

Run this single command to craete the default template of the database

```
db.createCollection("runsCollection",{capped:false}); db.createCollection("tagsCollection",{capped:false});db.createCollection("algorithmsCollection",{capped:false}); db.createCollection("authenticationCollection",{capped:false}); db.createCollection("palettesCollection",{capped:false}); db.algorithmsCollection.insert({"name" : "default","parameters" : [ "T(Copper)", "T(Cell1)", "DAC"],"algorithm" : "return((T1-T2)/((DAC*DAC)/22))"}); db.palettesCollection.insert({"name" : "default","description" : "default colour palette","palette" : [ "#B2003F", "#00B20F","#FF005A"]});
```
