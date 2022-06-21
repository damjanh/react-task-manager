import { useState, useEffect } from 'react'
import Header from "./components/Header"
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

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

   // Fetch task
   const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const toggleShowAddTask = () => {
    setShowAddTask(!showAddTask)
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })

      const data = await res.json()
      setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 10000) + 1
    // task.id = id;
    // setTasks([...tasks, task])
    console.log("Task added")
  }

  const deleteEvent = async (id) => {
    await fetch('http://localhost:5000/tasks/' + id, {
      method: 'DELETE',
    })

    setTasks(tasks.filter(task => task.id !== id))
    console.log(`Deleted task with id: ${id}`)
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      })
    const data = await res.json()

    setTasks(
      tasks.map((task) =>
      task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
    console.log(`Toggled reminder for task with id: ${id}`)
  }

  return (
    <div className="container">
      <Header title="Task Tracker" showAddTask={showAddTask} onToggleShowAddTask={toggleShowAddTask} />
      { showAddTask ? <AddTask onAddTask={addTask} /> : null }
      { tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteEvent} onToggle={toggleReminder} /> : 'No tasks' }
    </div>
  );
}

export default App;
