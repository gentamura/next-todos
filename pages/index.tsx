import type { ChangeEventHandler } from 'react';
import { useState } from 'react';

const IndexPage = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    setInput(value);
  };

  const handleAdd = () => {
    if (input) {
      setTodos((beforeTodos) => [...beforeTodos, input]);
      setInput('');
    }
  };

  const handleDelete = (index: number) => {
    const deletedTodos = todos.filter((_, i) => i !== index);

    setTodos(deletedTodos);
  };

  return (
    <>
      <h1>Todos</h1>

      <div>
        <input type="text" name="todo" onChange={handleChange} value={input} />
        <button type="button" onClick={handleAdd}>
          add
        </button>
      </div>

      <ul>
        {todos.map((todo, i) => (
          <li key={i}>
            {todo}
            <button type="button" onClick={() => handleDelete(i)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default IndexPage;
