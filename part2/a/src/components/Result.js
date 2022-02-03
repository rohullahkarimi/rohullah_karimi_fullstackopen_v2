import React from 'react'

const Result = ({ course }) => {
  const allExercises =  course.parts.reduce((a,v) =>  a = a + v.exercises , 0 )
  return (
    <strong key={course.id}>Total of {allExercises} exercises</strong>
  )
}

export default Result