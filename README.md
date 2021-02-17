# FetchRewards-be

**#Introduction**
Use `Node.js` and `Express` to build an API that performs operations on `transactions`.

1) Add transactions for a specific payer and date.
2) Spend points(starting with the oldest transactions) and return a list of { "payer": <string>, "points": <integer> } for each call.
3) Return all payer point balances.

*
*
*

**#Instructions**
- import this repository into your account/clone a copy or download a zip file.
- CD into the main folder.
- type **'npm install'** to download all dependencies.
- To start the server, type **'npm start'**.<br/>

*
*
*



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
Returns an array of objects that contain payer and the amount of points spent .

| GET    | '/points-balance'             
Returns an object that contain payer and the amount of points left.

*
*
*

**#Database helper functions**

database access will be used using 'connection.js' file in the data folder.

functions are defined in 'transactions-model.js' file.

-*findall()* - returns all transactions in the database.

-*updatePoints(id, updatedPoints)* - updates the points field in the transaction objects in the databse.
It requires 2 parameters: id(this is the transaction id) and updatedPoints(this is the new updated points amount).

-*spend(points)* - Updates the points field in the transaction objects in the databse. The function will keep updating
until 'points' argument is fully spent. If there are no transactions at all, an error message will be returned.
If there are insufficient amount of points, an error message will be spend. If all the points are successfully spent,
an array containing all the payers and the amount spent will be returned.

-*findPointsBalance()* - queries the database and returns an object with payer and points left information.

-*findByID()* - returns a transaction by its ID.

-*add()* - Adds a new transaction object to the database.

*
*
*


**#Transaction table Schema**

{
    
    "id: : "transaction id",
    
    "payer": "payer name for this transaction",
    
    "points": "points for this transaction",
    
    "timestamp": "string containing the time transaction was created",
}

*
*
*


**#Seed Data**
This populates the database with dummy data

[
        
        { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
        
        { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
        
        { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
        
        { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" },
        
        { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }
]












