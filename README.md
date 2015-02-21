# React.s Kindling

This is a React.js starter project. You can use it to build a client only application or a full stack node.js application.

## What's included
Gulp              - For building assets, launching development servers and deploying
Webpack           - For bundling javascript and other assets as required
React Hot Loader  - 
Express
Passport.js
React.js



## Usage

__Clone this repository:__

`git clone git@github.com:jbasdf/react-kindling.git`

__Install the dependencies:__

`npm install`

__Development mode with livereload:__

To start node and the webpack server just type:
`gulp`

Or start each one individually
node server.js
gulp serve:hot


## Develpment

### Client Only
Open up settings. Change 'projectType' to 'client'. When you run 'gulp' all of the assets in the 'client' directory
will be built into a client only html/js/css application. The development files will be found in /build and the 
production files will be in /public.

### Client Server
Open up settings. Change 'projectType' to 'client-server'. 

## Testing

### Database

#### Migrations
http://www.quora.com/What-are-my-options-for-SQL-database-migrations-with-Node-js
https://github.com/kunklejr/node-db-migrate
https://github.com/thuss/standalone-migrations
https://github.com/rosenfeld/active_record_migrations

## Setup
config/settings

## Deployment


### Client Only

React.js Kindling can be used to build a client only application that can be deployed to Amazon S3 or Github pages or
any other static hosting service

__Create a production ready version of the JS bundle:__

`gulp build --release`

Then upload the contents of the 'public' folder to your favorite service.

__Deploy to Amazon__
React.js Kindling uses the Ruby gem [s3_website](https://github.com/laurilehmijoki/s3_website) to deploy.
run gulp deploy:amazon


__Deploy to Github Page__
run gulp deploy:github

### Client Server





License and attribution
-----------------------
MIT