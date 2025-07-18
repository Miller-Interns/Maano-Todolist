export type Todo = {
  id: number;
  text: string;
  isDone: boolean;
  isEditing: boolean;
}

export type Category = {
  id: number;
  name: string;
  todos: Todo[];
  newTodoText: string;
}