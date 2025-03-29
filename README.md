# Survey Backend

This backend service allows you to **add survey questions**, **record answers**, and **retrieve survey details**. The **UI** is yet to be implemented.

---

## 📦 Setup Steps

### 1. Install MongoDB
Ensure MongoDB is installed on your local machine.

### 2. Start MongoDB Server
Run the following command to start the MongoDB server:

```bash
mongod --dbpath /Users/parikshitbarua/Development/mongodb/data --logpath /Users/parikshitbarua/Development/mongodb/logs/mongo.log
```

### 3. Specify the Database Connection URI
Configure your database connection in the file:

```text
connections/db.connection.js
```

Make sure to specify your MongoDB URI correctly.

---

## 🚀 API Endpoints

Click the button below to import the API collection into **Postman**:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/17233538-20972968-8f30-46f7-bcd3-3b1ca9b5b1d3?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D17233538-20972968-8f30-46f7-bcd3-3b1ca9b5b1d3%26entityType%3Dcollection%26workspaceId%3Dd0b3b52b-80eb-4339-acdc-5fbe598c6664)

---

## 🗂 Database Schema

Here’s a high-level overview of the database schema:

| **Collection** | **Fields**                                                                 |
|----------------|-----------------------------------------------------------------------------|
| **Surveys**    | `surveyId`, `surveyName`                                                   |
| **Questions**  | `surveyId`, `questionId`, `description`                                     |
| **Responses**  | `surveyId`, `parentQuestionId`, `questionId`, `responseId`, `response`     |

---

## 🛠️ Technologies

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Environment**: Local development

---

## 📜 License

NA
