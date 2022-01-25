import React, { useState } from 'react'

const Result = (props) => {
  const good = props.good
  const bad = props.bad
  const neutral = props.neutral
  const all = good + bad + neutral
  const average = (good - bad) / all 
  const positive = (good / all) * 100

  if(all >0){
    return (
      <div>
        <h3>statistics</h3>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
      </div>
    )
  }else{
    return (
    <div>
        <p>No feedback given</p>
    </div>
    )
  }
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
        Good
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>

      <Result good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App