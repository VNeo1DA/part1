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

const DisplayDetails = (props) => {
  const { heading, anecdotes, selected, points } = props;
  if (selected === -1) {
    return <p>No Data to display</p>;
  }
  return (
    <div>
      <h1>{heading}</h1>
      <p>
        {anecdotes[selected]}
        <br />
        has {points[selected]} votes
      </p>
    </div>
  );
};
//helper function to return index of element with most votes 
const getMostVoted = (points) => {
  if (points.length === 0) {
    //flag to signal no anecdotes in array: no points collected 
    return -1; 
  }
  var maxVoteIndex = Math.max.apply(null, points);
  var moreThanOneMax =
    points.lastIndexOf(maxVoteIndex) === points.indexOf(maxVoteIndex);
  if (moreThanOneMax) {
    return points.lastIndexOf(maxVoteIndex);
  } else {
    return points.indexOf(maxVoteIndex);
  }
};

const createArray = (len) => [...Array(len).fill(0)];

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const anecdotesLength = anecdotes.length;
  //function that creates array of n items default values: zeroes
  
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(createArray(anecdotesLength));
  //generate random number event handler 
  const generateRandomQuote = () => {
    const newValue = Math.floor(Math.random() * anecdotesLength);
    setSelected(newValue);
  };

  const vote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const highestVotes = getMostVoted(points);

  return (
    <div>
      <DisplayDetails
        heading="Anecdote of the Day"
        anecdotes={anecdotes}
        selected={selected}
        points={points}
      />
      <Button title="vote" handleClick={vote} />
      <Button title="next anecdote" handleClick={generateRandomQuote} />
      <DisplayDetails
        heading="Anecdote with the most votes"
        anecdotes={anecdotes}
        selected={highestVotes}
        points={points}
      />
    </div>
  );
};

export default App;