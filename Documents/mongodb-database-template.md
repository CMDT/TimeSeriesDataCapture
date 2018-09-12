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
db.createCollection("tagsCollection",{capped:false})
```

### Alogrithms
Algorithms Collection holds all the algorithms used to calculate RTH

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

