import React from 'react'

const Course = ({ course }) => {
  return (
    <ul>
      {course.parts.map(singleCourse => <li key={singleCourse.id}>{singleCourse.name} {singleCourse.exercises}</li>)}
    </ul>
  )
}

export default Course