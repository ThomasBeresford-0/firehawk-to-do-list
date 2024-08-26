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

let itemsPerPage = 7; // Number of items to show initially
let allItems = []; // Array to store all fetched items

// Add new to-do
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const newTodo = todoInput.value.trim();
  if (newTodo === "") return;

  try {
    await db.collection("todos").add({
      text: newTodo,
      completed: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() // Add timestamp
    });
    todoInput.value = "";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

// Retrieve and display to-dos
const fetchTodos = async () => {
  const querySnapshot = await db.collection("todos")
    .orderBy("timestamp") // Order by timestamp
    .get();
  allItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  updateTodoList();
};

// Update the to-do list based on the current page setting
const updateTodoList = () => {
  todoList.innerHTML = ""; // Clear the list before adding new items

  const itemsToDisplay = allItems.slice(0, itemsPerPage);
  
  itemsToDisplay.forEach((todo) => {
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
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    });
    li.appendChild(checkbox);

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    li.appendChild(textSpan);

    // Create Mark as Complete button
    const completeButton = document.createElement("button");
    completeButton.textContent = todo.completed ? "Completed" : "Mark as complete";
    completeButton.className = "complete-button";
    completeButton.addEventListener("click", async () => {
      try {
        if (!todo.completed) {
          await db.collection("todos").doc(todo.id).update({
            completed: true
          });
          completeButton.textContent = "Completed";
          li.classList.add("completed");
        } else {
          await db.collection("todos").doc(todo.id).update({
            completed: false
          });
          completeButton.textContent = "Mark as complete";
          li.classList.remove("completed");
        }
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    });
    li.appendChild(completeButton);

    // Create Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", async () => {
      try {
        await db.collection("todos").doc(todo.id).delete();
        fetchTodos(); // Refresh the list
      } catch (e) {
        console.error("Error removing document: ", e);
      }
    });
    li.appendChild(deleteButton);

    todoList.appendChild(li);
  });

  showMoreButton.style.display = allItems.length > itemsPerPage ? 'block' : 'none';
  showLessButton.style.display = itemsPerPage > 7 ? 'block' : 'none';
};

// Show more items
showMoreButton.addEventListener("click", () => {
  itemsPerPage += 7; // Show 7 more items
  updateTodoList();
});

// Show fewer items
showLessButton.addEventListener("click", () => {
  itemsPerPage = Math.max(7, itemsPerPage - 7); // Show 7 fewer items, but not less than 7
  updateTodoList();
});

// Initial fetch and setup
fetchTodos();
db.collection("todos").onSnapshot(fetchTodos);
