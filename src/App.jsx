import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, addMinutes } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    // Retrieve tasks from localStorage
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  const addTask = () => {
    if (task.trim() !== "") {
      const newTasks = [...tasks, { text: task, dateTime, completed: false }];
      setTasks(newTasks);
      setTask("");
      setDateTime(new Date());
    }
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      tasks.forEach((task) => {
        if (!task.completed && addMinutes(task.dateTime, -1) <= now && now <= task.dateTime) {
          toast.info(`Reminder: ${task.text}`);
        }
      });
    };

    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  useEffect(() => {
    // Save tasks to localStorage whenever they change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className='bg-primary min-h-screen flex justify-between'>
      <div className="container mx-auto p-[2rem]">
        <h1 className="text-2xl text-secondary font-bold font-major mb-4 text-center">DoList</h1>
        <div className="flex flex-col sm:flex-row sm:items-center mb-4">
          <input
            type="text"
            className="border p-[1rem] outline-primary rounded w-full sm:mr-2 mb-2 sm:mb-0"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <DatePicker
            selected={dateTime}
            onChange={(date) => setDateTime(date)}
            showTimeSelect
            dateFormat="Pp"
            className="border p-[1rem] outline-primary rounded font-bold sm:w-auto mb-2 sm:mb-0 mr-[1rem]"
          />
          <button
            className="bg-add text-secondary hover:scale-105 font-bold w-[6rem] px-[2rem] py-[0.3rem] rounded-lg"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="flex text-secondary items-center justify-between mb-[1rem]">
              <span
                className={`flex-1 ${task.completed ? 'line-through' : ''} text-2xl`}
                onClick={() => toggleTaskCompletion(index)}
              >
                {task.text} - {format(task.dateTime, 'Pp')}
              </span>
              <button
                className="bg-tertiary text-delete font-bold w-[6rem] px-[0.5rem] py-[0.6rem] text-2xl hover:scale-105 rounded-lg mb-[1rem]"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;




