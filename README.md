# How to run the app

- This app use Ruby version 2.2.3, so please make sure you have Ruby 2.2.3 installed on your local machine.
- This app use MongoDB for the database, so please make sure that you have Mongodb installed on your local machine.
- Run `bundle install` in root folder to install gems.
- Run `rake bower:install` in root folder to download javascript and css assets.
- Run `npm install babel-preset-latest --save-dev` in root folder to enable transforms for ES2015+
- Run `rails s` in root folder to start the application. You can access the app at http://localhost:3000