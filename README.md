# Books_management

Here’s a sample content for your `README.md` file that includes instructions for setting up a Node.js project with MySQL, installing dependencies, and running the application.

```markdown
# Node.js with MySQL Application

This is a Node.js application that connects to a MySQL database. The application allows you to perform operations such as creating, updating, and deleting records from a MySQL database. The project also includes APIs for managing books and purchases.

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [MySQL](https://www.mysql.com/) (for the database)
- [Nodemon](https://www.npmjs.com/package/nodemon) (for development)

## Installation

Follow the steps below to set up the project locally:

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### 2. Install Dependencies

Run the following command to install all the required dependencies:

```bash
npm install
```

This will install the necessary Node.js packages defined in the `package.json` file.

### 3. Set up MySQL Database

Make sure you have a MySQL database running and create a database for the project.

- Log in to your MySQL instance:
  
  ```bash
  mysql -u root -p
  ```

- Create a new database (e.g., `books_management`):
  
  ```sql
  CREATE DATABASE books_management;
  ```

- Run the necessary migrations or SQL scripts to create tables in the database. You can define tables like `users`, `books`, `purchase_details`, etc., in your SQL schema files.

### 4. Configure Database Connection

Open the `config/db.js` file and configure your MySQL connection details:

```javascript
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', // MySQL host
  user: 'root', // MySQL username
  password: '<your_password>', // MySQL password
  database: 'books_management', // Your database name
});

module.exports = pool.promise();
```

### 5. Running the Application

Once the dependencies are installed and the database is configured, run the application using the following command:

```bash
npm start
```

This will start the application using `nodemon`, and it will automatically reload the server if there are any changes to the files.

### 6. Available Endpoints

Here are some of the basic API endpoints available:

- **POST /api/auth/login**: Log in to the application and receive JWT tokens.
- **POST /api/books/create**: Create a new book entry.
- **POST /api/books/purchase**: Purchase a book.
- **POST /api/auth/forgot-password**: Request a password reset email.
- **POST /api/auth/reset-password/:token**: Reset the password using the reset token.
-  **POST /api/auth/superadmin/activity**: logs the activity of user


## Environment Variables

You may need to set up some environment variables in your `.env` file, such as:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=<your_password>
DB_NAME=books_management
JWT_SECRET=<your_jwt_secret>
```


### Key Sections in the README:

1. **Prerequisites**: Lists the necessary tools to run the project.
2. **Installation**: Steps to clone the repository, install dependencies, and set up MySQL.
3. **Configure Database Connection**: Instructions to configure the MySQL database connection in your project.
4. **Running the Application**: How to start the application.
5. **Available Endpoints**: Example API endpoints to give users an idea of what the application does.
6. **Environment Variables**: Where to define environment variables for your application.

This should help you get your Node.js and MySQL application up and running!
