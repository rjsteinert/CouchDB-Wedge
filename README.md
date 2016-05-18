# CouchDB Wedge
CLI and node module for doing bulk operations like deleting all databases on a server or replicating all databases from one server to another.

## Install
```
npm install -g couchdb-wedge
```


## Example of a pull replication of all databases except for _replicator and resources
```
wedge replicate-all-dbs --worker https://username:password@serverb.cloudant.com --target https://username:password@serverb.example.com --source https://username:password@servera.example.com --exclude _replicator,resources
```


## Example of deleting all databases on a server except for _replicator and _users
```
wedge delete-all-dbs --source http://username:password@server.example.com --exclude _replicator,_users
```


## Develop

Get the code and set your own `wedge` command to resolve to that codebase.
```
git clone git@github.com:rjsteinert/CouchDB-Wedge.git
cd CouchDB-Wedge
npm link
```

