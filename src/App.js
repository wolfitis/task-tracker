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

  // Fetch Task
  const fetchTask = async (id) => {
    const resp = await fetch(`http://localhost:5000/tasks/${id}`)
    // const data = resp.json()
    const data = await resp.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const resp = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await resp.json()
    setTasks([...tasks, data])
    // // create a new random id
    // const id = Math.floor(Math.random() * 10000) + 1
    // // crate a new task with random id
    // const newTask = { id, ...task }
    // // adding new task to tasks list
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    // console.log('delete', id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const resp = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await resp.json()

    setTasks(
      tasks.map((task) => task.id === id
        ? { ...task, reminder: data.reminder }
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
