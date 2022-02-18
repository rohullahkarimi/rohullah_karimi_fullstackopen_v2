const Note = ({ note, toggleImportance, deleteObject }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className='note'>
      {note.name}  {note.number}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={deleteObject}>Delete</button>
    </li>
  )
}

export default Note