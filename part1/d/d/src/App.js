import React, { useState } from 'react'
import $ from 'jquery'


const Result = (props) => {
  const selectedItem = props.selectedItem
  const itemVotes = props.itemVotes
  const indexNumber = props.indexNumber
  
  if(selectedItem){
    return (
      <div>
          <h3>Anecdote of the day</h3>
          <p id="votes">VOTES: {itemVotes}</p>
          <p id="index">index: {indexNumber}</p>
          <p id="notes">{selectedItem}</p>
      </div>
    )
  }else{
    return (
      <div>
          <p>Click the button</p>
      </div>
    )
  }
}

const Most_votes = (props) => {
  const favorite = props.datacontent[2]

  return (
    <div>
        <h3>Anecdote with the most votes</h3>
        <p>{favorite}</p>
    </div>
  )
  
} 

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)




const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [selected, setSelected] = useState(1)
  var chooseRandomNumber
  //console.log(chooseRandomNumber)


  const points = [0, 0, 0, 0, 0, 0, 0]
  const copy = [...points]
  
  
  

  // set random
  const setToSelected = newValue =>{
    setSelected(newValue)
  }

  // after click 
  const clickPushed = () => {
    chooseRandomNumber = Math.floor(Math.random() * 7);
    console.log(chooseRandomNumber)
    $("#index").text("Index: "+chooseRandomNumber)
    setToSelected(chooseRandomNumber)
    console.log(copy)
  }

  // vote click 
  const voteClick = () => {
    chooseRandomNumber = 0
    console.log(chooseRandomNumber)
    copy[chooseRandomNumber] += 1
    console.log(copy[chooseRandomNumber])
    $("#votes").text("Votes: "+copy[chooseRandomNumber])
  }
  
  return (
    <div>
      <Result selectedItem={anecdotes[selected]} itemVotes={copy[chooseRandomNumber]} indexNumber={chooseRandomNumber} />
      <Button handleClick={voteClick} text="Vote"  />
      <Button handleClick={clickPushed} text="next anecdotes" datacontent={anecdotes} />
      <Most_votes datacontent={anecdotes} />
    </div>
  )
}

export default App