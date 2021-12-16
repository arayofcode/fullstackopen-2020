import React from 'react'

// Header component, Renders Course Name
const Header = (props) => {
	return (
		<h1>{props.course}</h1>
	)
}

// Used in component Content
// Renders Course part and number of exercises
const Part = (props) => {
	return (
		<>
			<p>
				{props.part.name} {props.part.exercises}
			</p>
		</>
	)
}

// Uses Part component to display part and exercises 
const Content = (props) => {
	return (
		<>
			{props.parts.map(coursePart => <Part part = {coursePart} key={coursePart.name}/>)}
		</>
	)
}

// Renders Total exercises in the course
const Total = (props) => {
	return (
		<>
			{props.exercises.reduce((a, b) => a + b, 0)}
		</>
	)
}

const App = () => {
const course = {
	name: 'Half Stack application development',
	parts: [
		{
		name: 'Fundamentals of React',
		exercises: 10
		},
		{
		name: 'Using props to pass data',
		exercises: 7
		},
		{
		name: 'State of a component',
		exercises: 14
		}
	]
	}

  return (
    <div>
		<Header course = {course.name} />
		
		<Content parts = {course.parts} />

		<Total exercises = {course.parts.map(part => part.exercises)}/>
    </div>
  )
}

export default App