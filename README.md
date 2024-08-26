Firehawk To-Do List
This is a simple To-Do List web application integrated with Firebase. It allows users to add, view, and delete to-do items with real-time synchronization, styled to match Firehawk Funerals branding.

Features
Add Tasks: Users can add new to-do items.
View and Delete Tasks: Users can view and remove tasks from their list.
Real-Time Synchronization: All actions are synchronized in real-time across devices using Firebase.
Firebase Integration: Firebase is used to store and sync the data.
Responsive Design: The app is styled to look good on both desktop and mobile devices.
Prerequisites
Make sure you have the following installed on your machine:

Node.js: Download and install it from the official website.
Firebase Account: You need a Firebase account and project to connect the app.
Setup Instructions
Clone the repository:

git clone https://github.com/ThomasBeresford-0/firehawk-to-do-list.git

Navigate to the project directory:

cd firehawk-to-do-list

Install the required dependencies:

npm install

Set up Firebase:

Go to the Firebase Console and create a new project.
Set up the Firestore Database in test mode.
In your project settings, add a web app to retrieve your Firebase config credentials.
Copy the Firebase config credentials and replace the values in the firebaseConfig object located in app.js.
Run the development server:

npm start

Open the app in your browser by visiting http://localhost:8080.

Testing
We have set up some basic unit tests using Jest. The tests cover simple functionality like ensuring task management logic works as expected.

To run the tests:

Run the following command in your terminal:

npm test

This will execute the test suite.