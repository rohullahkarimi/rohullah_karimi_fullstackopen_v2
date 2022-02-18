import { useState, useEffect } from 'react'
import axios from 'axios'

import Note from './components/Note'
import noteService from './services/notes'


const Notification = (props) => {
  console.log(props.type)
  if (props.message === null) {
    return null
  }

  if(props.type == "error"){
    var className = "error"
  }else{
    var className = "success"
  }

  return (
    <div className={className}>
      {props.message}
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorType, setErrorType] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  

  const addNote = (event) => {
    event.preventDefault()

    const existOrNot = notes.filter(item => item.name == newNote );
    console.log(existOrNot)

    const noteObject = {
      name: newNote,
      number: newNumber,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    if(Object.keys(existOrNot).length === 0) {
     

      console.log(noteObject)

      
      noteService
        .create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))

          
          setErrorMessage(`Added '${newNote}'`)
          setErrorType("success")
          

          setNewNote('')
          setNewNumber('')
        })
    }else{
      if(window.confirm(`the '${newNote}' was already exist. Replace the old number with the new one?`)){
        const updateId = existOrNot[0].id
        const note = notes.find(n => n.id === updateId)
        const changedNote = { ...note, number: newNumber}

        noteService
        .update(updateId, changedNote)
        .then(returnedNote => {
          setNotes(notes.map(note => note.id !== updateId ? note : returnedNote))
        })

        setErrorMessage("Phonenumber has been changed")
        setErrorType("success")
      }else{
        setErrorMessage("Not added")
        setErrorType("error")
      }
    }
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const deleteObject = id => {
    const note = notes.find(n => n.id === id)
    const deleteNote = notes.filter(item => item.id !== id );

    console.log(deleteNote)

    axios.delete(`http://localhost:3001/notes//${id}`)
      .then(initialNotes => {
        setNotes(initialNotes)
        setErrorMessage("Successfully deleted")
        setErrorType("success")
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.name}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} type={errorType} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteObject={() => deleteObject(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default App