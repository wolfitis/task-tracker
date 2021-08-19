import Task from "./Task"


const Tasks = ({ tasks }) => {
  return (
    <>
      <Task key={task.id} task={task} />
      {tasks.map((task) => (
        {/*         we are replacing it with Task component
        <h3 key={task.id}>{task.text}</h3>
         */}
      ))}
    </>
  )
}

export default Tasks
