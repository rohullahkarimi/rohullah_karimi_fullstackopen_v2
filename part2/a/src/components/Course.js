import React from 'react'
import Result from './Result'
import Header from './Header'

const Course = ({ course }) => {
  return (
    <div>
        <Header course={course} />
        {course.map((x,i) => {
          return (
            <div key={i}>
              <h3 key={i}>{x.name}</h3>
                  {x.parts.map((partX, partI) =>{
                    return (
                      <p id={partI.id} key={partI.id}>{partX.name} {partX.exercises}</p>
                    )
                  })}
              <Result course={course[i]} />
            </div>
          )
        })}
    </div>
  )
}

export default Course