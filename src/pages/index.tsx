import { ChangeEventHandler, useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Todo } from '../types';

const IndexPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const { currentUser, isAuthLoading, logIn, logOut } = useAuth();

  useEffect(() => {
    const init = async () => {
      const res = await fetch('http://localhost:3000/api/todos');
      const data = await res.json();
      const { todos } = data;

      setTodos(todos);
    };

    init();
  }, []);

  const handleLogIn = async () => {
    await logIn();
  };

  const handleLogOut = async () => {
    await logOut();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    setInput(value);
  };

  const handleAdd = async () => {
    if (input) {
      const res = await fetch('http://localhost:3000/api/todos', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ content: input }),
      });

      const data = await res.json();
      const { todo } = data;

      setTodos((prevTodos) => [...prevTodos, todo]);
      setInput('');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      });

      const deletedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(deletedTodos);
    }
  };

  if (isAuthLoading) return 'Loading...';

  return (
    <>
      <h1>Todos</h1>

      {currentUser ? (
        <>
          <button onClick={handleLogOut}>log out</button>

          <div>
            <input
              type="text"
              name="todo"
              onChange={handleChange}
              value={input}
            />
            <button type="button" onClick={handleAdd}>
              add
            </button>
          </div>

          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.content}
                <button type="button" onClick={() => handleDelete(todo.id)}>
                  delete
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <button onClick={handleLogIn}>log in</button>
      )}
    </>
  );
};

export default IndexPage;
