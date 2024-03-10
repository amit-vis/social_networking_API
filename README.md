# social networking API
## Project Overview: Social Media Platform

This project enables users to create and manage their social media accounts. The key features include:

User Authentication:

Users can sign up for an account.
Existing users can sign in securely.
Profile Management:

Users can create and customize their profiles.
Profile details include a username, bio, and profile picture.
Post Operations:

Users can create, update, and delete their posts.
Posts include content and timestamps.
Following Feature:

Users can follow each other.
A user can view the latest posts from those they are following.

## Installation
Install My Projects Using npm
```bash
    git clone https://github.com/amit-vis/social_networking_API.git
    npm install
    cd social_networking_API
```

## Running Test
To run tests, run the following command
```bash
    npm start
```

## Endpoints and Actions:
* /user/sign-up: Create a new user account.
* /user/sign-in: Sign in into existing account.
* /user-profile/create/:id: Create a user Profile
* /user-profile/update/:id: Update the user Profile
* /user-profile/delete/:id: Delete the user profile
* /user-profile/view/:id: View the user Profile
* /post/create/:id: Create a new post associate with user profile
* /post/update/:id: Update a existing post with is associate with the user profile
* /post/delete/:id: Delete the existing post
* /post/view/:id: View the post from specific user
* /post/latest-post/:id: View the latest posts from users being followed.
* /post/create/:id: view the scial feed from users being followed
* /following/follow/:userId: Follow a user.
* /following/unfollow/:userId: Unfollow a user.
* /following/get-followers/:userId: View the list of followers for a user.
* /following/get-following/:userId: View the list of users being followed by a user.


## Folder Structure
* config
    - limitter.js
    - mongoose.js
    - passport-jwt.js
    - secure.js
    - swagger.js
* controllers
    - following_controller.js
    - post_controller.js
    - home_controller.js
    - userProfile_controller.js
    - user_controller.js
* models
    - post.js
    - signup.js
    - userProfile.js
* routes
    - following.js
    - post.js
    - index.js
    - user.js
    - userProfile.js
- index.js
- .gitignore
- index.js
- package-lock.json
- package.json