# Contributor Setup

1. Run npm install.
2. Create a file named .env in the server directory and copy the following:

```
   ATLAS_URI=mongodb+srv://<username>:<password>@cluster0.cpycr.mongodb.net/CPSC455?retryWrites=true&w=majority
```
3. Please replace \<username> and \<password> with your username and password from your database user from MongoDB.

To create a database user, navigate to the project "Project0" on MongoDB. Then navigate to the "Database Access" tab, and click "Add new database user".

Note to not use a password that you would normally use with other apps.

4. To start the server locally, run ```ts-node server``` in the server directory. Make sure to have ts-node installed. ```npm install -g ts-node```

# Group Members

- Lakshya Agarwal - i6d2d - lakshy01
- Daniel Crookall - j3o1b - danielc3
- Esther Hsueh - e9x8k - snow113
- Steven Wong - a4a3b - sww8

# Project Specs

## Project description

Our team will be building a social media type web application where users of all age groups can upload images and have their images classified into different categories using Google’s Cloud Vision API. We will then use the classifications data to create visual charts which will be included in the user’s profile. User login information, user followers and following list, and images will be stored into the database. Following specific accounts (followers / following feature) could be removed based on time constraints.

## Project task requirements

### Minimal requirements

- User registration and storing login credentials into database
- Searching for specific accounts
- Uploading images and classification of images using Google Cloud Vision API

### Standard requirements

- Enable following of specific accounts
- Creating visual charts based on data from Google Cloud Vision API
- Likes / comments on photos

### Stretch requirements

- Integrating application with other sign-in functions / features (Google Sign-in, Two-factor authentication)
- direct messaging

## Breaking down Minimal requirements

- User registration and storing login credentials into database
    - Front-end
        - Login page + call /register endpoint and deal with response and error handling
        - Registration page + call /login endpoint and deal with response and error handling
        - Landing page
        - set-up node/express server and connect to database (MongoDB)
    - Design + Create RestAPI endpoints for /register
    - Design + Create RestAPI endpoints for /login
    
- Uploading images and classification of images using Google Cloud Vision API
    - Research Google Cloud Vision API
    - React component for image upload + call image upload API and deal with response and error handling
    - Design + Create RestAPI endpoints for image upload
    
## Initial prototype 
![cpsc 445 rough sketches](https://user-images.githubusercontent.com/46267622/170588932-148cb9f2-824c-41eb-9718-ecefb6308351.jpg)

