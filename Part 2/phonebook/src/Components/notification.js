const Notification = ({ message }) => {
  // If no message, nothing to show on web page else show message
  if (message === null) {
    return null
  }
  
  return (
    <div className='error'>
      {message}
    </div>
  )
}

export default Notification