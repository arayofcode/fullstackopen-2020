import React from 'react'

const Header = ({name}) => {
	return (
		<h2>{name}</h2>
	)
}

const Part = (props) => {
	return (
		<>
			<p>
				{props.part.name} {props.part.exercises}
			</p>
		</>
	)
}

const Content = ({parts}) => {
	return (
		<>
			{parts.map(part => <Part part = {part} key={part.id}/>)}
		</>
	)
}

const Total = (props) => {
    let total = props.exercises.reduce((a, b) => a + b, 0)
	return (
		<h3>
			Total of {total} exercises
		</h3>
	)
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total exercises = {course.parts.map(part => part.exercises)}/>
        </div>
    )
}

export default Course