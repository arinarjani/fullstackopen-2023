import Input from './Input'

const Filter = ( {filteredPeople, searchTerm, search} ) => {
    return (
        <>
            <form>
                <div>
                {/* Filter Shown With: <input type="text" value={search} onChange={handleSearch} /> */}
                Filter shown with: <Input value={searchTerm} change={search} />
                </div>
            </form>
            {
                filteredPeople.map((person, index) => 
                <p key={index}>{person.name}</p>
                )
            }
      </>
    )
}

export default Filter;