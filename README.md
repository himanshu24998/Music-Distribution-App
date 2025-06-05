# Music Distribution App

## Overview
Welcome to the **Music Distribution App**! This is an exciting platform where users can upload, share, and purchase music beats or samples. The platform ensures that every track uploaded is verified for copyright and ownership before being approved. Once verified, the music gets a digital certificate and can be used or sold by other creators. 

The app allows creators to interact with others and helps musicians to grow their network. Users can upload their tracks, keep track of their status (pending, approved), and ensure all their work is protected under a digital license. 🎶

## Features
- **User Authentication**: Log in using Google or through a local email and password system.
- **Track Uploads**: Upload beats or music samples for review.
- **Copyright & Ownership Verification**: Every uploaded track is checked for copyrights before being approved.
- **Digital License**: Tracks that pass verification are issued a digital license with ownership rights.
- **Track Status**: See the status of your uploaded tracks (pending, approved).
- **Music Marketplace**: Purchase and sell tracks from other creators.
- **Dashboard**: View your uploaded tracks, see your licenses, and manage your music collection.

## Setup and Installation
### Prerequisites
- Node.js and npm
- MongoDB (locally or through MongoDB Atlas)
- A Google Developer account for OAuth setup

### Installation
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/himanshu24998/Music-Distribution-App.git
    cd Music-Distribution-App
    ```

2. **Install Backend Dependencies**:
    ```bash
    cd Server
    npm install
    ```

3. **Install Frontend Dependencies**:
    ```bash
    cd ../Client
    npm install
    ```

4. **Set Up Environment Variables**: Create a `.env` file in the `Server` folder with the following variables:
    ```plaintext
    PORT=5000
    GOOGLE_CLIENT_ID=<your_google_client_id>
    GOOGLE_CLIENT_SECRET=<your_google_client_secret>
    MONGO_DB_URL=<your_mongodb_url>
    JWT_SECRET=<your_jwt_secret>
    JWT_TIMEOUT=12h
    LOCAL_DB_URL=mongodb://localhost:27017/music-distribution
    ```

5. **Run the Server**:
    Navigate to the `Server` directory and start the server:
    ```bash
    npm start
    ```

6. **Start the React App**:
    Navigate to the `Client` directory and start the React application:
    ```bash
    npm run dev
    ```

## Usage
- **Create Account & Login**: Register via email/password or use Google login to get started. 
- **Upload Music**: Creators can upload beats or samples for verification. Pending tracks will be updated to 'approved' once verified.
- **Purchase Beats**: Explore the marketplace and purchase beats from other users.
- **Manage Tracks**: Keep track of your uploaded music and see the status of each track.
- **Dashboard**: View your uploaded beats, check their verification status, and monitor your licenses.

## Technology Stack
- **Frontend**: React with Vite, `react-router-dom` for routing, Material UI for design
- **Backend**: Node.js with Express for server-side logic
- **Database**: MongoDB (using MongoDB Atlas for cloud database)
- **Authentication**: JSON Web Tokens (JWT) for local authentication and Google OAuth for Google sign-in
- **Cloud Services**: Google OAuth for authentication, MongoDB Atlas for cloud database
- **File Handling**: Multer for handling file uploads securely

## Future Features
- **Streaming Options**: Allow users to stream purchased beats.
- **Notifications**: Notify users when their tracks are approved or when they receive a purchase.
- **Payment Integration**: Integrate a payment gateway for purchasing beats.

## Contributing
Feel free to fork the repository and submit pull requests if you'd like to contribute!
