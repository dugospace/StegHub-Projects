

## MEAN Stack Deployment to Ubuntu in AWS - 102


### Step 1: Install NodeJS

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js is used in this tutorial to set up the Express routes and AngularJS controllers.

#### Update ubuntu

To start, I need to make sure my Ubuntu package list is up-to-date.

```bash
sudo apt update
```
![alt text](./IMAGES/Picture1.png)

## 🚀 Continuing Node.js Installation

### Upgrade Ubuntu

After updating the package list in the previous step, I'll upgrade any existing packages to their newest versions.

```bash
sudo apt upgrade
```

### Add Certificates and NodeSource Repository

I need to install necessary certificates and utilities to allow `apt` to fetch packages over HTTPS. Then, I'll add the **NodeSource repository** for Node.js version 18.x to my system's sources.

```bash
sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates

curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```

### Install NodeJS

Now that the repository is configured, I can finally install Node.js itself. This command will install the `nodejs` package, which includes both **Node.js** and **npm** (Node Package Manager).

```bash
sudo apt install -y nodejs
```
![alt text](./IMAGES/Picture2.png)

## 📚 Step 2: Install MongoDB

MongoDB stores data in flexible, JSON-like documents. Fields in a database can vary from document to document, and the data structure can be changed over time. For our example application, we are adding book records to MongoDB that contain **book name**, **ISBN number**, **author**, and **number of pages**.

### Import the MongoDB Public GPG Key

I need to install necessary utilities (`gnupg` and `curl`) and then import the MongoDB public GPG key to ensure the packages I download are authentic and untampered. Note that this example uses the key for MongoDB Server 7.0.

```bash
sudo apt-get install -y gnupg curl

curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
  --dearmor
```
![alt text](./IMAGES/Picture3.png)

### Create the MongoDB List File

Next, I'll create a list file (`mongodb-org-7.0.list`) in my system's `sources.list.d` directory. This tells the system's package manager (`apt`) where to find the MongoDB packages, specifying the **7.0 release** for **Ubuntu Jammy (22.04)**.

```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```


## 💾 Completing MongoDB and Installing NPM

### Install MongoDB

After setting up the MongoDB repository source in the previous step, I need to update my package list and then run the command to install the **`mongodb-org`** package.

```bash
sudo apt-get update
sudo apt-get install -y mongodb-org
```

### Start The Server

Once installed, I must start the MongoDB service so the database is running and ready to accept connections.

```bash
sudo service mongodb start
```
![alt text](./IMAGES/Picture3.png)

### Verify that the service is up and running

I'll use `systemctl status` to check the service status. I want to see an **`active (running)`** status before moving on.

```bash
sudo systemctl status mongodb
```

### Install npm - Node Package Manager

The final step for setting up the basic MEAN environment is ensuring I have **npm** (Node Package Manager). While it's usually included with the `nodejs` package, it's a good practice to confirm or install it separately.

```bash
sudo apt install -y npm
```



## ⚙️ Setting Up the Application Backend (Express/Node)

These steps will help me create the basic project structure and install the necessary package for handling data sent to the server.

### Install the `body-parser` Package

I need the **`body-parser`** package to help the Express server **process JSON files** passed in requests from the client side. This is essential for handling data like the book records I'll be creating.

![alt text](./IMAGES/Picture4.png)

```bash
sudo npm install body-parser
```

### Create the Project Folder

I'll create a dedicated folder named **`Books`** for the application and immediately change my current directory into it.

```bash
mkdir Books && cd Books
```

### Initialize the npm Project

Inside the `Books` directory, I need to initialize a new **npm project**. This command will create a `package.json` file, which tracks all my project's dependencies and metadata.

```bash
npm init
```

### Create the Main Server File

Finally, I'll create the main server file named **`server.js`** using the `vi` text editor. This file will contain the Express server code.

```bash
vi server.js
```
![alt text](./IMAGES/Picture5.png)

## 🌐 Configuring the Web Server (`server.js`)

I will copy and paste the following code into the `server.js` file to set up my **Express server**, **MongoDB connection**, and middleware.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3300;

// // MongoDB connection
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

require('./app/routes')(app);

app.listen(PORT, () => {
  console.log(`Server up: http://localhost:${PORT}`);
});
```

![alt text](./IMAGES/Picture6.png)

### 🧠 Code Analysis

Here's what this code is doing for my application:

  * **Dependencies:** It imports **`express`** (the web framework), **`body-parser`** (for parsing JSON bodies), **`mongoose`** (for interacting with MongoDB), and **`path`** (for directory manipulation).
  * **MongoDB Connection:** It uses `mongoose.connect` to establish a connection to the MongoDB server running on **`localhost:27017`** using the **`test`** database.
  * **Middleware:**
      * `app.use(express.static(...))` serves static files (HTML, CSS, JS) from a directory named **`public`** (which I'll need to create).
      * `app.use(bodyParser.json())` processes incoming request bodies as JSON, making them accessible via `req.body`.
  * **Routing:** `require('./app/routes')(app)` tells the server to load its application routes from a file located at **`./app/routes.js`** (which I'll also need to create).
  * **Server Start:** `app.listen(PORT, ...)` starts the Express server on port **3300** (or whatever port is set in the environment variables).

![alt text](./IMAGES/Picture7.png)

## 🧩 Step 3: Install Express and Set Up Routes

Express is a minimal and flexible **Node.js web application framework** that provides features for web and mobile applications. I will use **Express** to pass book information to and from my MongoDB database.

I will also use the **Mongoose** package, which provides a straight-forward, schema-based solution to model my application data. I will use Mongoose to establish a **schema** for the database to store data for my book register.

### Install Express and Mongoose

I'll install both `express` and `mongoose` globally using `npm` since I used `sudo` for `body-parser` earlier.

```bash
sudo npm install express mongoose
```

### Create the Application Directory

In the current directory (`Books`), I need to create the main application folder named **`apps`** and change into it. This folder will house the models and routes for the application, as referenced in my `server.js` file.

```bash
mkdir apps && cd apps
```
![alt text](./IMAGES/Picture8.png)

## 🛣️ Creating the Routes File

I am currently inside the **`Books/apps`** directory. Now, I will create a new file named **`routes.js`** using the `vi` editor.

### Command to Create `routes.js`

```bash
vi routes.js
```

## 🌐 Defining API Endpoints (`routes.js`)

I will copy this code into the **`apps/routes.js`** file. This module exports a function that takes the main Express `app` instance and adds all my API routes (GET, POST, DELETE) for managing the book records, plus a route for serving the main HTML file.

```javascript
// Use require('./models/book') to point to the file we just created: apps/models/book.js
const Book = require('./models/book');
const path = require('path');

module.exports = function(app) {
  // GET all books
  app.get('/book', async (req, res) => {
    try {
      // Find all documents in the 'Book' collection
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching books', error: err.message });
    }
  });

  // POST a new book
  app.post('/book', async (req, res) => {
    try {
      const book = new Book({
        name: req.body.name,
        isbn: req.body.isbn,
        author: req.body.author,
        pages: req.body.pages
      });
      // Save the new book document to MongoDB
      const savedBook = await book.save();
      res.status(201).json({
        message: 'Successfully added book',
        book: savedBook
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error adding book (Check ISBN/Pages)', error: err.message });
    }
  });

  // DELETE a book by ISBN
  app.delete('/book/:isbn', async (req, res) => {
    try {
      // Find one document by ISBN and delete it
      const result = await Book.findOneAndDelete({ isbn: req.params.isbn });

      if (!result) {
        return res.status(404).json({ message: 'Book not found' });
      }

      res.json({
        message: 'Successfully deleted the book',
        book: result
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting book', error: err.message });
    }
  });

  // FIX: Explicitly handle the root path '/' to serve index.html
  app.get('/', (req, res) => {
    // This serves the index.html file when the user hits the root URL.
    // The path is fixed to use the safer 'root' option.
    const publicPath = path.join(__dirname, '../public');
    res.sendFile('index.html', { root: publicPath });
  });
};
```
![alt text](./IMAGES/Picture9.png)

### Route Summary

| Route | Method | Purpose | Dependencies |
| :--- | :--- | :--- | :--- |
| `/book` | `GET` | Retrieves all book records from MongoDB. | `Book.find()` |
| `/book` | `POST` | Creates a new book record based on the JSON data in the request body. | `new Book({...}).save()` |
| `/book/:isbn` | `DELETE` | Deletes a book record based on the provided ISBN parameter. | `Book.findOneAndDelete()` |
| `/` | `GET` | Serves the main **`index.html`** file from the `public` folder. | `res.sendFile()` |



## 🧱 Creating the Mongoose Model

The `routes.js` file required a model from `./models/book`. These steps create the directory structure and the file itself.

### Create the `models` Folder

I am currently in the `Books/apps` directory. I will create a folder named **`models`** inside of `apps` and change my working directory into it.

```bash
mkdir models && cd models
```
![alt text](./IMAGES/Picture10.png)

### Create the Schema File

Now, inside the `Books/apps/models` directory, I will create the file named **`book.js`** using the `vi` editor. This file will contain the Mongoose schema definition for my book records.

```bash
vi book.js
```


## 📖 Defining the Book Schema (`book.js`)

I will copy and paste this code into the **`Books/apps/models/book.js`** file. This code establishes the fields, data types, and validation rules for a book record.

```javascript
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isbn: { type: String, required: true, unique: true, index: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true, min: 1 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
```

### 📋 Schema Breakdown

| Field | Type | Rules | Purpose |
| :--- | :--- | :--- | :--- |
| **`name`** | `String` | `required: true` | The title of the book. Must be present. |
| **`isbn`** | `String` | `required: true`, `unique: true`, `index: true` | The unique identifier for the book. Must be present and ensures no two books have the same ISBN. |
| **`author`** | `String` | `required: true` | The author's name. Must be present. |
| **`pages`** | `Number` | `required: true`, `min: 1` | The number of pages. Must be present and must be at least 1. |
| **`timestamps`** | (Option) | `true` | Automatically adds **`createdAt`** and **`updatedAt`** fields to the document. |

-----

![alt text](./IMAGES/Picture11.png)

## ⚛️ Step 4: Access Routes with AngularJS

**AngularJS** provides a web framework for creating dynamic views in web applications. In this tutorial, I'll use AngularJS to connect my web page with Express and perform actions on the book register.

### Navigate Back to Root Directory

I am currently in the `Books/apps/models` directory. I need to move up two levels to get back to the main **`Books`** directory.

```bash
cd ../..
```

### Create the Public Folder

The `server.js` file is configured to serve static content from a folder named **`public`**. I need to create this folder and then change my current directory into it.

```bash
mkdir public && cd public
```

### Create the Main JavaScript File

Inside the `public` directory, I will create the main AngularJS file named **`script.js`** using the `vi` editor. This file will contain the front-end logic and API calls.

```bash
vi script.js
```

![alt text](./IMAGES/Picture12.png)

## ⚙️ AngularJS Controller (`script.js`)

I will copy this full code into the **`Books/public/script.js`** file. This code sets up the AngularJS module and controller, defining functions for fetching, adding, and deleting book records by making HTTP requests to my Express server.

```javascript
angular.module('myApp', [])
  .controller('myCtrl', function($scope, $http) {
    // Function to fetch all books from the Express API
    function fetchBooks() {
      // Calls the GET /book endpoint
      $http.get('/book')
        .then(response => {
          // Store the list of books on the scope for the view to render
          $scope.books = response.data;
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    }

    // Load books immediately when the controller starts
    fetchBooks();

    // Function to delete a book
    $scope.del_book = function(book) {
      // Calls the DELETE /book/:isbn endpoint
      $http.delete(`/book/${book.isbn}`)
        .then(() => {
          // Refresh the list after successful deletion
          fetchBooks();
        })
        .catch(error => {
          console.error('Error deleting book:', error);
        });
    };

    // Function to add a new book
    $scope.add_book = function() {
      // Create the payload for the POST request
      const newBook = {
        name: $scope.Name,
        isbn: $scope.Isbn,
        author: $scope.Author,
        pages: $scope.Pages
      };

      // Calls the POST /book endpoint
      $http.post('/book', newBook)
        .then(() => {
          // Refresh the list to show the new book
          fetchBooks();
          // Clear form fields
          $scope.Name = $scope.Isbn = $scope.Author = $scope.Pages = '';
        })
        .catch(error => {
          console.error('Error adding book:', error);
          // Optional: Display error message to user
          alert('Error adding book. Check if the ISBN is unique or fields are complete.');
        });
    };
  });
```

### Controller Functionality

  * **`myApp`** and **`myCtrl`**: Defines the main AngularJS module and the controller that will manage the data flow.
  * **`fetchBooks()`**: Sends a **`GET`** request to the `/book` API endpoint and stores the returned array of books in `$scope.books`. It runs automatically when the controller loads.
  * **`$scope.del_book(book)`**: Sends a **`DELETE`** request to the `/book/:isbn` endpoint, using the ISBN of the book object passed to it, and then reloads the book list.
  * **`$scope.add_book()`**: Collects data from the input fields (bound to `$scope.Name`, etc.), sends a **`POST`** request to the `/book` endpoint, and then clears the form fields and refreshes the book list.

-----

## 🖥️ Creating the Client Interface File

I am currently inside the **`Books/public`** directory. I will create the file named **`index.html`** using the `vi` editor. This file will contain all the HTML structure, link the AngularJS library, and connect to my `script.js` controller.

### Command to Create `index.html`

```bash
vi index.html
```



## 📄 Client Interface (`index.html`)

I will copy this entire code block into the **`Books/public/index.html`** file.

```html
<!DOCTYPE html>
<html ng-app="myApp" ng-controller="myCtrl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Book Management</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script src="script.js"></script>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    input[type="text"], input[type="number"] { width: 100%; padding: 5px; box-sizing: border-box; }
    button { margin-top: 10px; padding: 8px 15px; cursor: pointer; border: none; border-radius: 4px; }
    button[type="submit"] { background-color: #4CAF50; color: white; }
    .delete-button { background-color: #f44336; color: white; padding: 5px 10px; margin-top: 0; }
  </style>
</head>
<body>
  <h1>Book Management</h1>

  <h2>Add New Book</h2>
  <form ng-submit="add_book()">
    <table>
      <tr>
        <td>Name:</td>
        <td><input type="text" ng-model="Name" required></td>
      </tr>
      <tr>
        <td>ISBN:</td>
        <td><input type="text" ng-model="Isbn" required></td>
      </tr>
      <tr>
        <td>Author:</td>
        <td><input type="text" ng-model="Author" required></td>
      </tr>
      <tr>
        <td>Pages:</td>
        <td><input type="number" ng-model="Pages" required min="1"></td>
      </tr>
    </table>
    <button type="submit">Add Book</button>
  </form>

  <h2>Book List</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>ISBN</th>
        <th>Author</th>
        <th>Pages</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr ng-repeat="book in books">
        <td>{{book.name}}</td>
        <td>{{book.isbn}}</td>
        <td>{{book.author}}</td>
        <td>{{book.pages}}</td>
        <td><button class="delete-button" ng-click="del_book(book)">Delete</button></td>
      </tr>
      <tr ng-if="!books || books.length == 0">
        <td colspan="5" style="text-align: center; color: #777;">No books found. Add one above.</td>
      </tr>
    </tbody>
  </table>
</body>
</html>
```

-----

### 🔑 Key AngularJS Directives

This HTML uses several critical AngularJS directives to bind the view to the controller logic:

  * **`<html ng-app="myApp" ng-controller="myCtrl">`**:
      * **`ng-app="myApp"`**: Initializes the AngularJS application named `myApp`.
      * **`ng-controller="myCtrl"`**: Links the entire page content to the `myCtrl` controller defined in `script.js`.
  * **`<form ng-submit="add_book()">`**:
      * **`ng-submit`**: Executes the `$scope.add_book()` function in the controller when the "Add Book" button is clicked.
  * **`<input type="..." ng-model="Name" required>`**:
      * **`ng-model`**: Binds the input field's value to the `$scope.Name` variable in the controller, allowing the `add_book()` function to access the user input.
  * **`<tr ng-repeat="book in books">`**:
      * **`ng-repeat`**: Iterates over the array of books (`$scope.books`) fetched by the controller and creates a new table row for each one.
  * **`<td>{{book.name}}</td>`**:
      * **`{{...}}`**: Interpolation syntax to display the properties of the current `book` object from the loop.
  * **`<button ng-click="del_book(book)">`**:
      * **`ng-click`**: Executes the `$scope.del_book()` function when the button is pressed, passing the current `book` object as an argument.

-----


## 🚀 Step 5: Launch and Verify the Server

### Change Directory

I must first change the directory back to the main **`Books`** folder where the `server.js` file is located (I was last in the `public` folder).

```bash
cd ..
```

### Start the Server

I'll start the Node.js Express server using the `node` command on the `server.js` file. This command launches the application and establishes the MongoDB connection.

```bash
node server.js
```
![alt text](./IMAGES/Picture13.png)

### Verify Local Connection

The server should now be running and listening on port **3300**. I can test that the server is working locally by using the `curl` command.

```bash
curl -s http://localhost:3300
```

This command should return the HTML content of the **`index.html`** page. While it will be hard to read in the command line interface (CLI), it confirms the server is responding correctly.

### 🌐 Accessing from the Internet (Crucial AWS Step)

Since this application is deployed on an **AWS EC2 Instance**, I need to perform a vital step to access it from my web browser:

> **For this - you need to open TCP port 3300 in your AWS Web Console for your EC2 Instance.**

I must ensure the **Security Group** associated with my EC2 instance has an inbound rule allowing **TCP traffic on port 3300** from my IP address or from `0.0.0.0/0` (for public access).

-----

