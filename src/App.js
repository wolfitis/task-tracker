import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'

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
      <Header title='app header' />
      {tasks.length > 0
        ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />)
        : ('No Tasks to show')}
    </div>
  );
}

export default App;
