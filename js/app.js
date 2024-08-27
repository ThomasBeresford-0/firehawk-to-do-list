const firebaseConfig = {
  apiKey: "AIzaSyA5rS9IBjLPt30osyX2f1cVtc_C-3AXSIQ",
  authDomain: "to-do-list-app-8d59e.firebaseapp.com",
  projectId: "to-do-list-app-8d59e",
  storageBucket: "to-do-list-app-8d59e.appspot.com",
  messagingSenderId: "729084790097",
  appId: "1:729084790097:web:23e7a938fa3f7a0d64bf70",
  measurementId: "G-WNQ2HMTBGX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const showMoreButton = document.getElementById("show-more");
const showLessButton = document.getElementById("show-less");

let itemsPerPage = 7; 
let allItems = []; 

todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const newTodo = todoInput.value.trim();
  const priority = document.getElementById('todo-priority').value; 

  if (newTodo === "") return;

  try {
    await db.collection("todos").add({
      text: newTodo,
      priority: priority, // Save priority
      completed: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    todoInput.value = ""; 
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

const fetchTodos = async () => {
  const querySnapshot = await db.collection("todos")
    .orderBy("timestamp") 
    .get();
  allItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  updateTodoList();
};

const updateTodoList = () => {
  todoList.innerHTML = ""; 

  const itemsToDisplay = allItems.slice(0, itemsPerPage);
  
  itemsToDisplay.forEach((todo) => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    li.className = todo.completed ? "completed" : "";

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

    if (todo.priority) {
      const priorityTag = document.createElement("span");
      priorityTag.classList.add("priority-tag");
      priorityTag.textContent = todo.priority;
      priorityTag.classList.add(todo.priority.toLowerCase() + "-priority"); // Add a class based on priority
      li.appendChild(priorityTag);
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", async () => {
      try {
        await db.collection("todos").doc(todo.id).delete();
        fetchTodos(); 
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
  itemsPerPage += 7; 
  updateTodoList();
});

// Show fewer items
showLessButton.addEventListener("click", () => {
  itemsPerPage = Math.max(7, itemsPerPage - 7); 
  updateTodoList();
});

// Initial fetch and setup
fetchTodos();
db.collection("todos").onSnapshot(fetchTodos);
