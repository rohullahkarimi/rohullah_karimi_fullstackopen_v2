import React from 'react'

const Numbers = (props) => {
  //console.log(props.number)
  //console.log(props.filter)

  return (
    <div>
      {props.number.filter(person => person.name.includes(props.filter)).map(filteredPerson => (
        <li key={filteredPerson.id}>
          {filteredPerson.name}  {filteredPerson.phonenumber}
        </li>
      ))}
    </div>
  )
}
export default Numbers