# LightBnB
A simple multi-page Airbnb clone that uses a server-side JavaScript to dsplay the information from queries to web pages via SQL queries.

## Database Setup
- run 'psql' in your terminal  
- run 'CREATE DATABASE lightbnb' in your terminal to create the database
- run '\c lightbnb' to access the database
- run '\i migrations/01_schema.sql' in your terminal to add the schema to your database
- run '\i seeds/01_seeds.sql' and 'i/seeds/02_seeds.sql' to add the sample data to your database

## Getting Started
- run 'npm i" in your terminal to install all dependencies listed below
- run "npm run local" in your terminal to start the serer and begin running the application at http://localhost:3000/

## Dependencies
- bcryptjs
- body-parser
- chalk
- connect-flash
- cookie-session
- dotenv
- ejs
- express
- morgan
- node-sass-middleware
- pg
- pg-native
- sass
- sequelize

## ERD
!["Screenshot of ERD](https://github.com/Megwilken/LightBnB/blob/main/erd.png)

## Project Structure

```
├── public
│   ├── index.html
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── index.js
│   │   ├── libraries
│   │   ├── network.js
│   │   └── views_manager.js
│   └── styles
├── sass
└── server
  ├── apiRoutes.js
  ├── database.js
  ├── json
  ├── server.js
  └── userRoutes.js
```

* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `sass` contains all of the sass files. 
* `server` contains all of the server side and database code.
  * `server.js` is the entry point to the application. This connects the routes to the database.
  * `apiRoutes.js` and `userRoutes.js` are responsible for any HTTP requests to `/users/something` or `/api/something`. 
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.

## Final Product

### Homepage
![screenshot of homepage](https://github.com/Megwilken/LightBnB/blob/main/LightBnB_WebApp-master/public/images/homepage.png)

### Search Page
![screenshot of search-page](https://github.com/Megwilken/LightBnB/blob/main/LightBnB_WebApp-master/public/images/search-page.png)

### Search Results Page
![screenshot of results page](https://github.com/Megwilken/LightBnB/blob/main/LightBnB_WebApp-master/public/images/results-page.png)

