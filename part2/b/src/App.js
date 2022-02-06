import React, { useState } from 'react'
import Numbers from './components/Numbers'

const App = (props) => {
  
  // index calls App component
  const [numbers, setNumbers] = useState(props.numbers)

  const [newName, setNewName] = useState('')
  const [newPhonenumber, setNewPhonenumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addNumber = (event) => {
    event.preventDefault()

    // set object for inserting 
    const phoneNameObject = {
        name: newName,
        phonenumber: newPhonenumber,
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
    setNewPhonenumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewPhonenumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  

  return (
    <div>
      <h2>Phonebook</h2>

      Filter shown with-<input value={newFilter}  onChange={handleNewFilter} /><br></br><br></br>


      <form onSubmit={addNumber}>
        Name: <input value={newName}  onChange={handleNameChange} /><br></br>
        Number:<input value={newPhonenumber}  onChange={handleNumberChange} />
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>

      <ul>
          <Numbers filter={newFilter} number={props.numbers} />
      </ul>

    </div>
  )
}

export default App 