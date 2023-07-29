import Header from './Header'
import Part from './Part';
import Total from './Total';

const Course = ( {course} ) => {

   return (
    <>
      {
        course.map((course) => 
        <>
          <Header key={course.id} courseTitle={course.name} />
          <Part key={course.id} parts={course.parts} />
          <Total key={course.id} total={course} />  
        </>
        )
      }
    </>
   ) 
}

export default Course;