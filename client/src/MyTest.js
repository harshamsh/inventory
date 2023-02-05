// import cx from 'classnames';
// import React, { useState } from 'react';

// const TodoList = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [todos, setTodos] = useState([]);

//   const handleInputChange = event => {
//     setInputValue(event.target.value);
//   };

//   const handleAddTodo = () => {
//     if (!inputValue) return;
//     setTodos([...todos, { text: inputValue, completed: false }]);
//     setInputValue('');
//   };

//   const handleTodoClick = index => {
//     setTodos(
//       todos.map((todo, i) => {
//         if (i === index) {
//           return { ...todo, completed: !todo.completed };
//         }
//         return todo;
//       })
//     );
//   };

//   const remainingTodos = todos.filter(todo => !todo.completed).length;

//   return (
//     <div>
//       <h2>Todo List</h2>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//       />
//       <button onClick={handleAddTodo}>Add Todo</button>
//       <ul>
//         {todos.map((todo, index) => (
//           <li
//             key={index}
//             className={cx({ 'is-done': todo.completed })}
//             onClick={() => handleTodoClick(index)}
//           >
//             {todo.text}
//           </li>
//         ))}
//       </ul>
//       <div className="task-counter">
//         {remainingTodos} remaining out of {todos.length} tasks
//       </div>
//       <style>{`
//         .is-done {
//           text-decoration: line-through;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TodoList;

import React, { useState, useEffect } from "react";
import classnames from "classnames";

const Board = ({ initialConfiguration, onSolveCallback }) => {
  const [board, setBoard] = useState(initialConfiguration);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    if (
      !isSolved &&
      board.toString() ===
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0].toString()
    ) {
      setIsSolved(true);
      onSolveCallback();
    }
  }, [board, isSolved, onSolveCallback]);

  const handleMove = (index) => {
    if (isSolved) return;
    const newBoard = [...board];
    const zeroIndex = newBoard.indexOf(0);
    if (
      index === zeroIndex + 1 ||
      index === zeroIndex - 1 ||
      index === zeroIndex + 4 ||
      index === zeroIndex - 4
    ) {
      newBoard[zeroIndex] = newBoard[index];
      newBoard[index] = 0;
      setBoard(newBoard);
    }
  };

  return (
    <div className="board">
      {board.map((value, index) => {
        return (
          <div
            key={index}
            className={classnames("tile", { empty: value === 0 })}
            onClick={() => handleMove(index)}
          >
            {value !== 0 && value}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
