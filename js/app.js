// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5rS9IBjLPt30osyX2f1cVtc_C-3AXSIQ",
    authDomain: "to-do-list-app-8d59e.firebaseapp.com",
    projectId: "to-do-list-app-8d59e",
    storageBucket: "to-do-list-app-8d59e.appspot.com",
    messagingSenderId: "729084790097",
    appId: "1:729084790097:web:23e7a938fa3f7a0d64bf70"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Get references to the DOM elements
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  
  // Listen for form submission
  todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent the page from refreshing
    const todoText = todoInput.value.trim();
  
    // Basic validation to ensure the input is not empty
    if (todoText.length === 0) {
      alert("Please enter a to-do item!");
      return;
    }
  
    // Add the to-do item to Firestore
    try {
      await db.collection('todos').add({
        text: todoText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      todoInput.value = '';  // Clear the input field
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  });
  
  // Listen for real-time updates from Firestore
  db.collection('todos').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
    todoList.innerHTML = '';  // Clear the current list of to-dos
  
    snapshot.forEach((doc) => {
      const todo = doc.data();
      const li = document.createElement('li');
      li.textContent = todo.text;
  
      // Add a delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', async () => {
        try {
          await db.collection('todos').doc(doc.id).delete();
        } catch (error) {
          console.error("Error deleting document: ", error);
        }
      });
  
      li.appendChild(deleteButton);
      todoList.appendChild(li);
    });
  });
  