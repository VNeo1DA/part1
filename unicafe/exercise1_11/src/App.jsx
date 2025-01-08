import { useState } from "react";

//re-usable Button component
const Button = (props) => {
  const { handleClick, title } = props;
  return (
    <>
      <button onClick={handleClick}>{title}</button>
    </>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;
  const average = ((good-bad)/all).toFixed(1);
  const positive = (good===0)? 0 : ((good/all)*100).toFixed(1);
  if (good === 0 && neutral === 0 && bad === 0) {
    return <div>No feedback given</div>;
  }
  return (
    
      <div>
	<table>
        	<StatisticsLine text="good" value={good} />
        	<StatisticsLine text="neutral" value={neutral} />
        	<StatisticsLine text="bad" value={bad} />
        	<StatisticsLine text="all" value={all} />
        	<StatisticsLine text="average" value={average} />
        	<StatisticsLine text="positive" value={positive} />
	</table>
      </div>  
    
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td> <td>{value} {`${text === "positive" ? "%" : ""}`}</td>
      </tr>
    </>
  );
};

const App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const icrementGoodValue = () => {
    const newValue = good + 1;
    setGood(newValue);
  };
  const icrementNeutralValue = () => {
    const newValue = neutral + 1;
    setNeutral(newValue);
  };
  const icrementBadValue = () => {
    const newValue = bad + 1;
    setBad(newValue);
  };

  return (
    <div>
      <h1>provide us with feedback</h1>
      <Button handleClick={() => icrementGoodValue()} title="good" />
      <Button handleClick={() => icrementNeutralValue()} title="neutral" />
      <Button handleClick={() => icrementBadValue()} title="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
