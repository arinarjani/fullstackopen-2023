const Hello = (props) => {
const {age, name} = props;
console.log(props)
  return (
    <>
      <p>my name is {name} and I am {age} years old</p>
    </>
  )
}

const App = () => {
  console.log('hello from component')

  const date = new Date();
  const a = 10;
  const b = 20;

  console.log(date, a+b);
  return (
  <>
    <p>hello world</p>
    {a} + {b} is {a + b}
    <Hello name='arin' age={26} />
  </>
  )
}

export default App;