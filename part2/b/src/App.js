import React, { useState } from 'react'
import Numbers from './components/Numbers'

const App = (props) => {
  // index calls App component
  const [numbers, setNumbers] = useState(props.numbers)

  const [newName, setNewName] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addNumber = (event) => {
    event.preventDefault()

    // set object for inserting 
    const phoneNameObject = {
        name: newName,
        date: new Date().toISOString(),
        important: Math.random() < 0.5,
        id: numbers.length + 1,
    }

    // check for similarity 
    props.numbers.map((k, v) => {
      const existedNames = k.name
      if(existedNames !== newName){
        // merge objects 
        setNumbers(numbers.concat(phoneNameObject))
      }else{
        alert(`${newName} is already added to phonebook`)
      }
    });

    // name back to empty 
    setNewName('')
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const numbersToShow = showAll
  ? numbers
  : numbers.filter(note => note.important)


  return (
    <div>
      <h2>Phonebook</h2>
   
      <form onSubmit={addNumber}>
        Name: <input value={newName}  onChange={handleNumberChange} />
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {numbersToShow.map(note =>
          <Numbers key={note.id} number={note} />
        )}
      </ul>

    </div>
  )
}

export default App 