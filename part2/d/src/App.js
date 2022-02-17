import { useState, useEffect } from 'react'
import axios from 'axios'

import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)

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
    
    if(Object.keys(existOrNot).length === 0) {
      const noteObject = {
        name: newNote,
        number: newNumber,
        important: Math.random() > 0.5,
        id: notes.length + 1,
      }

      
      noteService
        .create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          
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

        console.log("Confirmed")
      }else{
        console.log("Not confirmed")
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