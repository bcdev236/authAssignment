# AuthAssignment

AuthAssignment is a user authentication system that allows users to create a new account, log in using their credentials or Google OAuth, and securely log out. This project uses **React** for the frontend, **Node.js** with **Express** for the backend, and **MongoDB** for the database.

## Features

- **Create New Account**: Users can register using their email and password.
- **Login with Email & Password**: Users can log in with the credentials they used during registration.
- **Login with Google OAuth**: Users can log in quickly using their Google account.
- **Logout**: Securely log out from the system.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT) & Google OAuth 2.0

## Installation

### Prerequisites

1. **Node.js**: Ensure Node.js is installed on your system.
2. **MongoDB**: Set up a MongoDB instance (local or cloud).

### Steps to Install and Run

1. Clone the repository and switch to dev branch:
   ```sh
   git clone https://github.com/bcdev236/authAssignment.git
   git checkout dev
   git pull
   cd authAssignment
   cd server
   ```

2. Install server dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the server directory and add the following variables:
   ```env
   PORT=4000
   MONGO_URL=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   PASS_SECRET=your_password_secret_for_hashing
   SESSION_SECRET=your_session_secret
   CLIENT_ID=your_google_client_id
   CLIENT_SECRET=your_google_client_secret
   CLIENT_URL=http://localhost:3000
   SERVER_URL = http://localhost:4000/
   ```

4. Start the server:
   ```sh
   npm start
   ```

5. Move to the `client` folder to set up the frontend:
   ```sh
   cd client
   npm install
   npm start
   ```

## API Documentation

### Base URL

- `http://localhost:4000`

### 1. Register a New User

- **Endpoint**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "test_user",
    "email": "test_user@example.com",
    "password": "testpassword"
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "message": "User registered successfully"
    }
    ```

### 2. Login with Email and Password

- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "test_user@example.com",
    "password": "testpassword"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "message": "Login successful",
      "user": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "token": "your_jwt_token",
      }
    }

    ```

### 3. Google OAuth Login

- **Endpoint**: `/api/oauth/callback`
- **Method**: `GET`
- **Description**: Redirects the user to Google's OAuth page for authentication. After successful authentication, redirects back to the client.

### 4. Check Login Status

- **Endpoint**: `/api/oauth/login/success`
- **Method**: `GET`
- **Description**: Checks if the google user is logged in based on session.
- **Response**:
  - **200 OK**:
    ```json
    {
      "user": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "token": "your_jwt_token",
      }
    }
    ```

### 5. Logout

- **Endpoint**: `/api/oauth/logout`
- **Method**: `GET`
- **Description**: Logs out the google user by destroying the session.

## License

This project is licensed under the MIT License.


