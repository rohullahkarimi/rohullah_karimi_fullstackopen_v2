import React from 'react'
import Course from './components/Course'
import Header from './components/Header'
import Result from './components/Result'

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <ul>
      <Header course={course} />
      <Course course={course} />
      <Result course={course} />
    </ul>
  )
}

export default App