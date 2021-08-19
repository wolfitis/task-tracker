import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({ title }) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button color='green' text='add' />
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string,
  // title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   background: 'black',
// }
// // usage example: <h1 style={headingStyle}>Task Tracker</h1>

export default Header
