// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA5rS9IBjLPt30osyX2f1cVtc_C-3AXSIQ",
  authDomain: "to-do-list-app-8d59e.firebaseapp.com",
  projectId: "to-do-list-app-8d59e",
  storageBucket: "to-do-list-app-8d59e.appspot.com",
  messagingSenderId: "729084790097",
  appId: "1:729084790097:web:23e7a938fa3f7a0d64bf70",
  measurementId: "G-WNQ2HMTBGX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const showMoreButton = document.getElementById("show-more");
const showLessButton = document.getElementById("show-less");

let itemsVisible = 7; // Number of items to show initially
const itemsPerPage = 7;

// Add new to-do
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const newTodo = todoInput.value.trim();
  if (newTodo === "") return;

  try {
    await db.collection("todos").add({
      text: newTodo,
      completed: false
    });
    todoInput.value = "";
    fetchTodos(); // Refresh the list after adding a new to-do
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

// Retrieve and display to-dos
const fetchTodos = async () => {
  const querySnapshot = await db.collection("todos").get();
  const todos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  todoList.innerHTML = ""; // Clear the list before adding new items

  const visibleTodos = todos.slice(0, itemsVisible);

  visibleTodos.forEach(todo => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    li.className = todo.completed ? "completed" : "";
    
    // Create checkbox for completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", async () => {
      try {
        await db.collection("todos").doc(todo.id).update({
          completed: checkbox.checked
        });
        li.classList.toggle("completed", checkbox.checked);
        actionButton.textContent = checkbox.checked ? "Delete" : "Complete";
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    });
    li.appendChild(checkbox);

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    li.appendChild(textSpan);

    // Create action button
    const actionButton = document.createElement("button");
    actionButton.textContent = todo.completed ? "Delete" : "Complete";
    actionButton.className = "action-button";
    actionButton.addEventListener("click", async () => {
      if (todo.completed) {
        try {
          await db.collection("todos").doc(todo.id).delete();
          li.remove();
        } catch (e) {
          console.error("Error removing document: ", e);
        }
      } else {
        try {
          await db.collection("todos").doc(todo.id).update({
            completed: true
          });
          checkbox.checked = true;
          li.classList.add("completed");
          actionButton.textContent = "Delete";
        } catch (e) {
          console.error("Error updating document: ", e);
        }
      }
    });
    li.appendChild(actionButton);

    todoList.appendChild(li);
  });

  // Handle "Show More" and "Show Less" button visibility
  if (todos.length > itemsVisible) {
    showMoreButton.style.display = 'inline-block';
    showLessButton.style.display = 'none'; // Initially hide "Show Less"
  } else {
    showMoreButton.style.display = 'none';
    showLessButton.style.display = 'none';
  }
};

// Show More button event
showMoreButton.addEventListener("click", () => {
  itemsVisible += itemsPerPage;
  fetchTodos(); // Refresh the list with more items
});

// Show Less button event
showLessButton.addEventListener("click", () => {
  itemsVisible = Math.max(itemsPerPage, itemsVisible - itemsPerPage);
  fetchTodos(); // Refresh the list with fewer items
});

// Initial fetch
fetchTodos();

// Real-time updates
db.collection("todos").onSnapshot(fetchTodos);
