import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctor Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1:30pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Food shoping',
      day: 'Feb 6th at 2:30pm',
      reminder: false,
    }
  ])

  // Add Task
  const addTask = (task) => {
    // create a new random id
    const id = Math.floor(Math.random() * 10000) + 1
    // crate a new task with random id
    const newTask = { id, ...task }
    // adding new task to tasks list
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = (id) => {
    // console.log('delete', id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => task.id === id
        ? { ...task, reminder: !task.reminder }
        : task)
    )
  }

  return (
    <div className="container">
      <h1>Hello from React</h1>
      <Header />
      <AddTask onAdd={addTask} />
      {tasks.length > 0
        ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />)
        : ('No Tasks to show')}
    </div>
  );
}

export default App;
