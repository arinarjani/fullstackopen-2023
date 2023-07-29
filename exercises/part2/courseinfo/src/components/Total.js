const Total = ({total}) => {
    // destructure parts from total object
    const {parts} = total;
  
    // ORIGINAL WAY, BUT 2.3 WANTED ME TO USE ARRAY.REDUCE, SEE LINE 10
    // let numOfExercises = 0;
    // increase numOfExercises by the amount in the parts[x].exercises
    // parts.forEach(exercises => numOfExercises += exercises.exercises);

    // get total using reduce 2.3
    // if the array has objects in it, then you have to supply an inital value, say 0
    // then you can do accumulator + currentValue.exercises
    // I TRIED TO DO accumulator.exercises + currentValue.exercises, and it didn't work
    // so I searched online and found this on stackoverflow
    const numOfExercises = parts.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.exercises
    }, 0);
  
  
    return (
      <>
        <p><b>number of exercise {numOfExercises}</b></p>
      </>
    )
  }

  export default Total;