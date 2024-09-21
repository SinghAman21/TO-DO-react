import React, { useState, useEffect } from "react";

export default function List() {
  const [text, setText] = useState('');

  
  const [tasks, setTasks] = useState(() => {
    // Load tasks from local storage, or default to an empty array
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [checkedTasks, setCheckedTasks] = useState(() => {
    // Load checked states from local storage, or default to an empty array
    const savedCheckedTasks = localStorage.getItem('checkedTasks');
    return savedCheckedTasks ? JSON.parse(savedCheckedTasks) : [];
  });

  useEffect(() => {
    // Save tasks to local storage whenever they change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    // Save checked states to local storage whenever they change
    localStorage.setItem('checkedTasks', JSON.stringify(checkedTasks));
  }, [checkedTasks]);


  const handleButtonClick = () => {
    listing();
  };

  // Function to handle the keypress event
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // event.preventDefault(); 
      handleButtonClick();
    }
  };

  // Add event listener for keypress
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);


  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const listing = () => {
    if (text.trim()) {
      setTasks([...tasks, text]);
      setCheckedTasks([...checkedTasks, false]); // Initialize the new task's checked state to false
      setText('');
    }
  };

  const handleCheckChange = (index) => {
    const newCheckedTasks = [...checkedTasks];
    newCheckedTasks[index] = !newCheckedTasks[index]; // Toggle the checked state
    setCheckedTasks(newCheckedTasks);
  };

  const handleDelete = (index) => {                // Delete a task
    const newTasks = tasks.filter((_, i) => i !== index);
    const newCheckedTasks = checkedTasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setCheckedTasks(newCheckedTasks);
  };

  return (
    <div>
      <div className="main">
        <div className="title">
          <span id="todo">To Do List</span> 
          {/* <span>svg logo</span> */}
        </div>
        <div className="typing">
          <textarea
            value={text}
            placeholder="Start typing here"
            onChange={handleInputChange}
            className="text"
            id="text"
            rows="2"
            style={{fontSize: '1rem', width: '20rem'}}
          />
          <button onClick={listing}>Add Task</button>
        </div>
        <div className="tasks">
          {tasks.map((task, index) => (
            <div key={index} className="task-item">
              <label id="checky">
                <input
                  type="radio"
                  name={`task-${index}`}
                  checked={checkedTasks[index]}
                  onChange={() => handleCheckChange(index)}
                />
              </label>
              <span id="task" style={{ textDecoration: checkedTasks[index] ? 'line-through' : 'none' }}>
                {task}
              </span>
              <button id="cross" onClick={() => handleDelete(index)}> X </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
