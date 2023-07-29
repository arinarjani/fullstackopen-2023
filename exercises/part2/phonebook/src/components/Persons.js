const Persons = ( {persons, handleDelete} ) => {
    return (
        <>
            {
                persons.map(person => 
                <>
                    <p key={person.id}>{person.name} {person.number}</p>
                    <button onClick={() => handleDelete(person.id)}>delete</button>  
                </>
                )
            }
        </>
    )
}

export default Persons