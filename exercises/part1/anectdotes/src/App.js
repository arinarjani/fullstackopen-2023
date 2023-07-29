import {useState} from 'react'
import Button from './Button.js'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

    // store which anecdote the program chooses based off randomQuote()
    const [selected, setSelected] = useState(0);
    // store votes on each anecdote the user likes
    const [votes, setVotes] = useState({
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0
    });

    // event handler to generate a random quote via random number
    const randomQuote = () => {
      const randNum = Math.round(Math.random() * (anecdotes.length - 1));
      setSelected(anecdotes[randNum]);
    }

  // event handler to store user votes for each anecdote in 'votes' state
  const storeVotes = () => {
    const anecdoteIndex = Number(anecdotes.indexOf(selected));
    const newVotes = {
      ...votes,
      [anecdoteIndex]: votes[anecdoteIndex] + 1
    };
    setVotes(newVotes)
    console.log('newVotes', newVotes)
  }

  const getMostVotedAnecdote = () => {

    // create an empty array to hold the number of votes for
    // each anecdote
    let v = []

    // filter through each key in state votes,
    // then put the votes in v above
    for (const [key, value] of Object.entries(votes)) {
      v.push(value)
    }

    // find the max votes in v
    const maxVotes = Math.max(...v.map(e=>e))

    // find the index of max votes in v
    const indexOfMaxVotes = v.indexOf(maxVotes)

    console.log('indexOfMaxVotes', indexOfMaxVotes)

    return indexOfMaxVotes === 0 ? 0 : anecdotes[indexOfMaxVotes]
  }

  return (
  <>
  <h1>Anectdotes</h1>
      <p>{selected}</p>
      <Button handleClick={randomQuote} text={'Get Random Anecdote'} />
      {selected !== 0 ? <Button handleClick={storeVotes} text={"👍"} /> : null }
      {getMostVotedAnecdote() === 0 ? null : <p>{getMostVotedAnecdote()}</p>}
  </>
  );
}

export default App;
