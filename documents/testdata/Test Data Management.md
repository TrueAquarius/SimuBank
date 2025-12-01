# Test Data Management

This document provides instructions on how to back up and restore the MongoDB database for this application.


## Restoring a Database

You can use the `mongorestore` command to restore a database from a dump. This is useful for setting up a new development environment or restoring a database to a previous state.

To restore this empty database, run the following command from the root of the project:

```powershell
mongorestore --uri="<your-mongodb-connection-string>" --db="<your-target-database-name>" "documents\testdata\Data Set 001 - Default Database\simubank_default"
```

**Parameters:**

*   `<your-mongodb-connection-string>`: Replace this with the connection string for your MongoDB instance. For local development, this might be something like `"mongodb://localhost:27017"`.
*   `<your-target-database-name>`: Replace this with the name of the database you want to restore to (e.g., `"simubank"`).

## Backing Up a Database

To create a backup of your database, you can use the `mongodump` command. This will create a dump of the specified database in the `databases` directory.

```powershell
mongodump --uri="<your-mongodb-connection-string>" --db="<your-source-database-name>" --out=./databases
```

**Parameters:**

*   `<your-mongodb-connection-string>`: Replace this with the connection string for your MongoDB instance.
*   `<your-source-database-name>`: Replace this with the name of the database you want to back up.
*   `--out=./databases`: This specifies that the backup should be saved in the `databases` directory. The dump will be created in a subdirectory named after the source database.
