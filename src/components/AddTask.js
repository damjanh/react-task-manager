import { useState } from 'react'

const AddTask = ({ onAddTask }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!text || !day) {
      alert('Please enter a task and a day')

    }
    onAddTask({ text, day, reminder })
    setText('')
    setDay('')
    setReminder(false)
  }


  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="text">Task</label>
        <input type="text"
          id="task"
          name="text"
          placeholder="Enter task"
          value={text} onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="text">Day & Time</label>
        <input type="text"
          id="datetime"
          name="text"
          placeholder="Enter Day and Time"
          value={day} onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="text">Set reminder</label>
        <input type="checkbox"
          id="reminder"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input type="submit" value="Add Task" className="btn btn-block"/>
    </form>
  );
}

export default AddTask