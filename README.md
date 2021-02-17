# FetchRewards-be

**#Introduction**
Use `Node.js` and `Express` to build an API that performs operations on `transactions`.

1) Add transactions for a specific payer and date.
2) Spend points(starting with the oldest transactions) and return a list of { "payer": <string>, "points": <integer> } for each call.
3) Return all payer point balances.

**#Instructions**

**#Project Setup**
- import this repository into your account/clone a copy or download a zip file
- CD into the main folder
- type **'npm install'** to download all dependencies
- To start the server, type **'npm start'**

**#EndPoints**

| GET    | '/'             
Returns an array of all the transaction objects contained in the database.    

| POST    | '/'             
Adds a transaction object in the database. Required fields are "payer" and "points". 
example: { "payer": "DANNON", "points": 1000}
Returns the created object that is now stored in the database.

| PUT    | '/spend'             
Updates("spends") the transaction points in the database. Required field is "points". 
example: { "points": 1000}
Returns an array of objects that contain payer and the amount of points spent 

| GET    | '/points-balance'             
Returns an object that contain payer and the amount of points left


**#Database helper functions**

database access will 




