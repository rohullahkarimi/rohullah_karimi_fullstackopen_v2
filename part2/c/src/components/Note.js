import React from 'react'

const Note = (props) => {
  //  key={note.cca2}>{note.name.common}
  console.log(props.key)
  console.log("OK")
  console.log(props.note)
  return (
    <div>
      {props.note.filter(country => country.name.includes(props.key)).map(filteredCountry => (
        <li key={filteredCountry.id}>
          {filteredCountry.name}  {filteredCountry.cca3}
        </li>
      ))}
    </div>
  )
}

export default Note