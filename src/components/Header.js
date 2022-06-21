import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, showAddTask, onToggleShowAddTask }) => {
  const location = useLocation()
  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname==='/' && <Button color={showAddTask ? 'red' : 'green'}
        text={showAddTask ? 'Close' : 'Add'}
        onClick={() => onToggleShowAddTask()}
      />}
    </header>
  )
}

Header.defaultProps = {
  title: "Task Manager App"
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header