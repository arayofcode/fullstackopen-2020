import React, { useState } from 'react'

const Display = (props) => {
	return (
		<div>
			<div>{props.anecdote}</div>
			<div>has {props.votes} votes</div>
		</div>
	)
}

const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
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
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))
	const [maximum, setMaximum] = useState("")

	const handleClick = () => setSelected(Math.floor(Math.random() * anecdotes.length))
	const handleVote = () => {
		/*
			* Issue here: Even when I change state, the changes are not happening until end of function 
		*/

		// Initialize maximum to the current anecdote
		if(maximum === ""){
			setMaximum(selected)
		}
		
		let copyVote = [...vote]
		copyVote[selected]++
		setVote(copyVote)

		// Change maximum
		// When it's >, this is not working properly
		if(vote[selected] >= vote[maximum]){
			setMaximum(selected)
		}
	}

  return (
    <div>
				<Display anecdote={anecdotes[selected]} votes={vote[selected]}/>
				<Button handleClick={handleVote} text="vote"/>
				<Button handleClick={handleClick} text="next anecdote"/>
				<h1>Anecdote with most votes</h1>
				<Display anecdote={anecdotes[maximum]} votes={vote[maximum]}/>
	</div>
  )
}

export default App