# README

An api server built in rails to service a react powered front end

The skeleton of this server was built by following this guide
<https://scotch.io/tutorials/build-a-restful-json-api-with-rails-5-part-one>
It provides helper a method for converting responses into json objects and a method to return the proper error codes to the requesting server if an error does occur, very helpful.

## SETUP

I did all of this OUTSIDE of vagrant, if you want to setup inside of vagrant go for it and let me know if you have problems.

In your terminal navigate to the rails-server folder and type "bundle install"

Run the server using "rails s"

To reset the database and generate new seed data type
"rake db:reset"

To see all the routes available type "rails routes"

This server is configured to work with a postgres database. You may need to make a database locally and give rails access to it
