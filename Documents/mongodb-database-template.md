# MongoDB Template
This document describes each step in detail to create the initial database for Time Series Data Capture.

## Collections
The database contains 5 collections runs, tags, alogrithms, authentication and palettes.

### Runs
Runs Collection holds time series data.

```
db.createCollection("runsCollection",{capped:false})
```

### Tags
Tags Collection holds all tags used to search for runs.

```
db.createCollection("tagsCollection",{capped:false})
```

### Alogrithms
Algorithms Collection holds all the algorithms used to calculate RTH

```
db.createCollection("algorithmsCollection",{capped:false})
```
