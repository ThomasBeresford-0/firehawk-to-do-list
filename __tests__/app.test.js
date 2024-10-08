function addTodo(todoList, task) {
    todoList.push(task);
    return todoList;
  }
  
  describe("Todo List", () => {
    it("should add a task to the list", () => {
      const todos = [];
      const task = "Learn Jest";
      
      const updatedTodos = addTodo(todos, task);
      
      expect(updatedTodos).toContain(task);
      expect(updatedTodos.length).toBe(1);
    });
  });
  