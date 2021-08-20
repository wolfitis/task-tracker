import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const resp = await fetch('http://localhost:5000/tasks')
    // const data = resp.json()
    const data = await resp.json()

    return data
  }

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
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0
        ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />)
        : ('No Tasks to show')}
    </div>
  );
}

export default App;
