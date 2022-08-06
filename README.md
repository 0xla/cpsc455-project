# Description of App

Our team built a social media type web application where users of all age groups can upload images and have their images classified into different categories using Google’s Cloud Vision API. Users can also search for other users, follow them, and view their profiles as well to get a better sense of what their interests are. Lastly, users have a feed that displays photos uploaded by people they follow.

# Statement of goals

## Minimal

- [x] User registration and storing login credentials into database
- [x] Searching for specific accounts
- [x] Uploading images and classification of images using Google Cloud Vision API

## Standard

- [x] Enable following of specific accounts
- [x] Creating visual charts based on data from Google Cloud Vision API
- [x] Likes and comments on photos (only likes)

## Stretch

- [ ] Integrating application with other sign-in functions / features (Google Sign-in, Two-factor authentication)
- [ ] direct messaging

# Description of tech from Units 1 to 5 in the Project

## Unit 1: HTML, CSS, JS

Our frontend contains the _index.html_ file which has a _div_ tag with the id _root_ and this is where our react content goes to.

Tailwind CSS, a CSS framework, is used extensively in our frontend for styling our components to enhance the UI of our application.

Our frontend and backend code is written in TypeScript, a superset of JavaScript that provides syntax for types to make our code more readable and lowers the chances of introducing bugs into our codebase.

## Unit 2: React & Redux

We use react components extensively in our frontend code so our components are reusable and our frontend code is more modularized. We use redux for global state management so that it is easier for components to share data without having to _prop drill_.

## Unit 3: Node & Express

Our backend was built using Express, a node framework, for handling RESTful api calls from the frontend. Using the Express framework made it a lot easier to build our backend because it contains a lot of useful tools such as routing, middleware and request/response.

## Unit 4: Mongodb

We used MongoDB as our database for storing user information. We also used the Mongoose library that provides syntax to make it easier to interface with our database.

## Unit 5: Release Engineering

Our frontend was deployed using Netlify while our backend was deployed using Heroku. As part of our release engineering process, our team is required to submit a pull request which must first get approved by at least one team member before the code is merged into our main branch to minimize the introduction of bugs into our codebase. Our frontend is also deployed automatically once new code is merged into our main branch as part of our CI/CD process.

# Description of 'Above and Beyond' functionality

# Description of Next Steps

# List of contributions

## Steven Wong a4a3b

I was responsible for and took a leadership role in the features related to uploading images to Google Cloudstore and image analysis using Google Vision Api. I also contributed to the frontend by building reusable react components and hooking them to redux.

