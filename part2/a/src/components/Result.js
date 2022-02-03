import React from 'react'

const Result = ({ course }) => {
  const allExercises =  course.parts.reduce((a,v) =>  a = a + v.exercises , 0 )
  return (
    <p>Total of {allExercises} exercises</p>
  )
}

export default Result