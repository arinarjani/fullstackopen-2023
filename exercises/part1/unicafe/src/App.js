import React from 'react';
import { useState } from 'react';

import Statistics from './Statistics.js';
import Button from './Button.js';

function App() {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let all = good + neutral + bad;

  // event handlers to increase the 'good', 'bad', and 'neutral'
  // states
  const goodButton = () => setGood(g => g + 1);
  const neutralButton = () => setNeutral(n => n + 1);
  const badButton = () => setBad(b => b + 1);

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={goodButton} text={'Good'} />
      <Button handleClick={neutralButton} text={'Neutral'} />
      <Button handleClick={badButton} text={'Bad'} />
      <h1>statistics</h1>
      {
        all > 0 ? <Statistics all={all} good={good} neutral={neutral} bad={bad} /> : 'no feedback given'
      }
    </>
  );
}

export default App;
