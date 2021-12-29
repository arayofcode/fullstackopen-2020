import React, { useState } from 'react'

const Button = (props) => (
		<button onClick={props.addFeedback}>{props.text}</button>
)

const StatisticLine = (props) => (
		<>
			<tr>
					<td>{props.option}</td><td>{props.number}</td>
			</tr>
		</>
)

const Statistics = (props) => {
	let total = props.good + props.bad + props.neutral
	let average = (props.good - props.bad) / total
	let positive = props.good * 100 / total

	if(total === 0){
		return (
			<div>No feedback given</div>
		)
	}
	return (
		<div>
			<table>
				<tbody>
					<StatisticLine option="Good" number={props.good}/>
					<StatisticLine option="Neutral" number={props.neutral}/>
					<StatisticLine option="Bad" number={props.bad}/>
					<tr><td>all</td><td>{total}</td></tr>
					<tr><td>average</td><td>{average}</td></tr>
					<tr><td>positive</td><td>{positive}%</td></tr>
				</tbody>
			</table>
		</div>
	)
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
//   const [feedback, updateFeedback] = useState({
// 	  good: 0, neutral: 0, bad: 0
//   })

	return (
		<div>
			<h1>give feedback</h1>
			<Button addFeedback={() => setGood(good + 1)} text="Good"/>
			<Button addFeedback={() => setNeutral(neutral + 1)} text="Neutral"/>
			<Button addFeedback={() => setBad(bad + 1)} text="Bad"/>
			<h1>statistics</h1>
			<Statistics good={good} bad={bad} neutral={neutral}/>
		</div>
	)
}

export default App