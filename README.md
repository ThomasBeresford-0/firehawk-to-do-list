## Firehawk To-Do List

This is a simple To-Do List web application integrated with Firebase. It allows users to add, view, mark as complete, and delete to-do items with real-time synchronization across users, styled to match Firehawk Funerals branding.

## Features

- Add Tasks: Users can add new to-do items with a priority level (Low, Medium, High).
- View Tasks: Tasks are displayed in a clean, responsive interface that adapts to both desktop and mobile devices.
- Delete Tasks: Users can remove tasks from their list with a simple click.
- Mark Tasks as Complete: Tasks can be marked as completed, visually indicated with a strikethrough.
- Priority Levels: Tasks can be assigned a priority (Low, Medium, High), displayed as colored tags next to each task.
- Real-Time Synchronization: All actions (adding, deleting, completing tasks) are synchronized in real-time across devices using Firebase Firestore.
- Firebase Integration: I used Firebase for data storage, syncing, and real-time updates between users.
- Responsive Design: The app is styled to look good and function well on both desktop and mobile devices.
- Basic Form Validation: The app ensures that users cannot add empty to-do items.
- Unit Testing: I set up basic unit tests using Jest to validate the core functionality.

## Prerequisites
Make sure you have the following installed on your machine:

Node.js: Download and install it from the official Node.js website.

Firebase Account: You need a Firebase account and project to connect the app.

## Setup Instructions

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

## Features Overview

# Task Priority

- When adding a task, users can assign a priority (Low, Medium, High). These priorities are displayed as colored tags (green for Low, orange for Medium, red for High) next to each task.

# Mark Tasks as Complete

- Users can mark tasks as completed by checking a checkbox next to the task. Completed tasks are indicated with a strikethrough.

# Responsive Design

- The app is designed to work well on both desktop and mobile devices, with a layout that adapts based on the screen size.

# Testing
- I have set up some basic unit tests using Jest. The tests cover simple functionality like ensuring task management logic works as expected.

To run the tests:
Run the following command in your terminal:

npm test

This will execute the test suite.

## Future Enhancements

Potential future enhancements could include:

- Task Editing: Allow users to edit tasks after they’ve been added.
- Due Dates: Users could set due dates for tasks and receive visual feedback for overdue tasks.