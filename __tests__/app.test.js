// __tests__/app.test.js

// Example of a function in your app you want to test
function addTodo(todoList, task) {
    todoList.push(task);
    return todoList;
  }
  
  // Jest test case
  describe("Todo List", () => {
    it("should add a task to the list", () => {
      const todos = [];
      const task = "Learn Jest";
      
      const updatedTodos = addTodo(todos, task);
      
      expect(updatedTodos).toContain(task);
      expect(updatedTodos.length).toBe(1);
    });
  });
  