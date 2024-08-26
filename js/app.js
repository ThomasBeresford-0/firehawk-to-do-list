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
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

// Retrieve and display to-dos
const fetchTodos = async () => {
  const querySnapshot = await db.collection("todos").get();
  todoList.innerHTML = ""; // Clear the list before adding new items
  querySnapshot.forEach((doc) => {
    const todo = doc.data();
    const li = document.createElement("li");
    li.dataset.id = doc.id;
    li.className = todo.completed ? "completed" : "";
    
    // Create checkbox for completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", async () => {
      try {
        await db.collection("todos").doc(doc.id).update({
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

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      try {
        await db.collection("todos").doc(doc.id).delete();
        li.remove();
      } catch (e) {
        console.error("Error removing document: ", e);
      }
    });
    li.appendChild(deleteButton);

    todoList.appendChild(li);
  });
};

// Initial fetch
fetchTodos();

// Real-time updates
db.collection("todos").onSnapshot(fetchTodos);
