# UsersDB CRUD API and Frontend

This project is a full-stack user management application built with TypeScript, Node.js, Express, MongoDB (via Mongoose), and a static frontend. It provides a simple RESTful API for creating, reading, updating, and deleting (CRUD) user records, and a clean, interactive interface to interact with the API.

---

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Application](#running-the-application)
7. [API Endpoints](#api-endpoints)
8. [Frontend Usage](#frontend-usage)

---

## Features

* Connects to MongoDB via Mongoose
* Secure password hashing with bcrypt
* CRUD operations for users:

  * Add new user
  * List all users
  * Find a user by username
  * Update user data
  * Delete a user
* Static HTML/CSS/TypeScript frontend
* Simple, intuitive UI for all CRUD operations

## Technologies

* **Backend**: Node.js, Express, TypeScript
* **Database**: MongoDB, Mongoose
* **Authentication**: bcrypt for password hashing
* **Frontend**: HTML, CSS, TypeScript, fetch API

## Prerequisites

* Node.js (>= 16.x)
* npm or yarn
* MongoDB instance (local or cloud)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ultimatepexe/mongodb-crud-fullstack.git
   cd mongodb-crud-fullstack
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

## Configuration

1. Create a `.env` file and set the following variables:

   ```ini
   PORT=3000
   DATABASE=mongodb://localhost:27017/your_database_name
   ```

2. Adjust the `PORT` or `DATABASE` values as needed.

## Running the Application

### Backend

Use the experimental flag to strip TypeScript types and run directly:

```bash
node --experimental-strip-types index.ts
```

Once running, you should see:

```
Connected...
Running at 3000
```

### Frontend

After starting the backend, compile the TypeScript code for the frontend:

```bash
cd public
tsc
```
This compiles the frontend TypeScript files into JavaScript so they can be used in the browser.

Then, open your browser at:

```
http://localhost:<PORT>/
```

Replace <PORT> with the port number configured in your .env file (default: 3000).

## API Endpoints

All endpoints accept and return JSON.

| Method | Route     | Description                         | Body                                                          |
| ------ | --------- | ----------------------------------- | ------------------------------------------------------------- |
| GET    | `/`       | Serve the main HTML page            | N/A                                                           |
| POST   | `/add`    | Create a new user                   | `{ data: { username, password, email?, name? } }`             |
| POST   | `/users`  | Get a list of all users             | N/A                                                           |
| POST   | `/find`   | Find a single user by username      | `{ username: string }`                                        |
| POST   | `/edit`   | Update an existing user by username | `{ username: string, newData: { password?, email?, name? } }` |
| POST   | `/delete` | Delete a user by username           | `{ user: string }`                                            |

## Frontend Usage

* **Add User**: Fill in the form and click "Add User".
* **Edit User**: Enter the username, update fields, and click "Edit User".
* **Delete User**: Enter the username and click "Delete User".
* **Find User**: Enter the username and click "Find User".
* **Load All Users**: Click the "load" button under the Users section.

Results and logs appear in the `<pre>` tags or user list below each section.

---

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-efc300?style=for-the-badge&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)