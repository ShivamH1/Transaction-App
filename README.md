# Transaction Application

Transaction Application similar to PayTM. I have created a Transaction Application with features including user sign-up, sign-in with authentication using zod, a dashboard to display users and their balances, and the ability to transfer amounts to friends. 

## Installation

Clone the repository
```bash
git clone https://github.com/ShivamH1/Transaction-App.git
```

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
npm install 
```
Run this command in both frontend and backend directory

## Assumption
If you get an error related to mongodb server:
### MongoServerError: Transaction numbers are only allowed on a replica set member or mongos

Follow this steps:

### 1. Stop the MongoDB server if it is running
```bash
net stop MongoDB
net start MongoDB 
```

### 2. Start MongoDB with replica set configuration
```bash
mongod --replSet rs0
```

### 3. Connect to MongoDB using 'mongosh'
```bash
mongosh
```

### 4. Initiate the replica set
```bash
rs.initiate()
```

### Testing the Setup
After following these steps, try making the Axios request from your frontend application again. The backend should now be able to handle the transaction as expected without the MongoServerError.

By ensuring that your MongoDB instance is running as a replica set, you should be able to resolve the MongoServerError and allow your backend to handle transactions properly.
