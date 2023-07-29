// Header, Content, and Total
const Header = ({courseTitle}) => {
  return (
    <>
      <h1>{courseTitle}</h1>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      <Part parts={parts} />
    </>
  )
}

const Part = ({parts}) => {
  return (
    <>
      <p>{parts[0].name} {parts[0].exercises}</p>
      <p>{parts[0].name} {parts[0].exercises}</p>
      <p>{parts[0].name} {parts[0].exercises}</p>
    </>
  )
}

const Total = ({total}) => {
  // destructure parts from total object
  const {parts} = total;

  let numOfExercises = 0;
  // increase numOfExercises by the amount in the parts[x].exercises
  parts.forEach(exercises => numOfExercises += exercises.exercises);


  return (
    <>
      <p>number of exercise {numOfExercises}</p>
    </>
  )
}


function App() {
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

  // what I have so far with trying to map stuff into a component
  // const items = parts.map((part, index) => {
  //   return (<Content key={index} part={part.name} exercises={part.exercises} />)
  // })

  // this works, but it's not mapping data to a component, just an element
  // const items = parts.map((part, index) => {
  //   return <p key={index}>{part.name}</p>
  // })

  // console.log(items)

  // console.log(<Content />)

  return (
    <>
      <Header courseTitle={course.name} />
      <Content parts={course.parts} />
      <Total total={course} />
    </>
  );
}

// {Users.map((e)=>{
//   return (
//     <Info name={e.name} rollNo={e.rollNo}/>
//   );
// })}
// https://www.geeksforgeeks.org/how-to-map-data-into-components-using-reactjs/# ^^
// maybe this too: https://legacy.reactjs.org/docs/lists-and-keys.html#rendering-multiple-components
export default App;
