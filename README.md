# 9.rest-api-sql
 This API will provide a way to administer a school database containing information about users and courses. Users can interact with the database to create new courses, retrieve information on existing courses, and update or delete existing courses. To make changes to the database, users will be required to log in so the API will also allow users to create a new account or retrieve information on an existing account.

```bash
npx sequelize model:create --name User --attributes firstName:string,lastName:string,emailAddress:string,password:string
```

```bash
npx sequelize model:create --name Course --attributes title:string,description:text,estimatedTime:string,materialsNeeded:string,userId:integer
```
RUN: <br/>

```bash
npm install and npm start
```

tests.http has the routes <br/>
Initialized the project using the npx sequelize init<br/>

npm install basic-auth <br/>