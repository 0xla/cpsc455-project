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

We used MongoDB as our database for storing user information. We also used the Mongoose library that provides syntax to make it easier to interface with our database. Examples of data which we stored into our database includes the user's followers and followings lists, their login credentials and their uploaded images.

## Unit 5: Release Engineering

Our frontend was deployed using Netlify while our backend was deployed using Heroku. As part of our release engineering process, our team is required to submit a pull request which must first get approved by at least one team member before the code is merged into our main branch to minimize the introduction of bugs into our codebase. Our frontend is also deployed automatically once new code is merged into our main branch as part of our CI/CD process.

# Description of 'Above and Beyond' functionality

Our above and beyond functionality is advanced user authentication. We discussed security briefly in one of the labs and followed many of the topics discussed, such as preventing well known passwords through form validation with Formik and Yup, passing the password in a POST request body, hashing passwords before they are stored in our database and allowing users to reset their passwords via email. In addition to these points, our group also decided to try something new: JSON Web Tokens. 

JSON web tokens consist of a header, a payload and a signature. The signature is computing by applying a hashing algorithm (SHA-256) with a secret key to the header and data section. When a user registers for an account on our application, we generate a JWT and sign it with the username and userid, then send it back in the response to be stored in local storage. Any subsequent requests to private routes must pass the JWT in the header of the HTTP request to the backend. We implemented protect middleware that 1) checks if the token has expired (to protect users from replay attacks) and 2) if it’s been tampered with (by re-applying the hashing algorithm to the data and seeing if it matches the signature on the token). If any of the checks fail, we return a custom error code back to the frontend which will then clear the token from local storage and redirect the user to the sign-in page.

To allows users to safely reset/change their password we used an email API called SendGrid. When users click forget password on the sign in page, they are prompted to enter their email. The email is sent to backend via the body of a POST request. If the email exists in the database, an email is sent using SendGrid. Simultaneously, a password reset token and password timeout token are set in the database. If there are any errors along the way, the password reset token and timeout token are cleared from the database.

The user can then go to the URL provided in the email. The URL param contains the hashed reset token. The user is prompted to enter their new password. When they submit the form, the reset token is received in the backend, then the database is queried for a user that has that matching reset token. It's also ensured that token has not expired. If the token is valid, the user's password is updated in the database and the reset token and expiry token are set to be undefined to prevent reuse. 
    
# Description of Next Steps

In order to improve our social media application, we plan to integrate a chat messaging feature to allow users to communicate with one another. We would also like to allow users to sign-in to our application using their credentials from other platforms such as their Gmail and/or Facebook account.

# List of contributions

## Steven Wong a4a3b

I was responsible for and took a leadership role in the features related to uploading images to Google Cloudstore and image analysis using Google Vision Api. I also contributed to the frontend by building reusable react components and hooking them to redux.

## Daniel Crookall j3o1b

I worked on user authentication and security (login, sign-up, password reset, JWT, protect middelware, Mongoose schema) and setup the layout of the backend, MongoDB Atlas and React Router. I also implemented backend and frontend functionality for liking/unliking posts, viewing/searching for other user profiles, uploading a profile picture, viewing user feeds, displaying headers on posts, suggesting users to follow and assisted with the unfollow/follow logic.   

## Lakshya Agarwal i6d2d

Initially, I took the initiative of setting up our code repositories and structuring them to fit our tech stack. I contributed heavily to frontend styling and code. Towards the end, I worked on the deployment majorly for both FE and BE. 

## Esther Hsueh e9x8k

I am incharge of designing the appearence and flow of our app. The blueprint of our work was structed by serval pages and I organized how the pages connect to each other. Besides, I also help test and check the every function.    


