import Input from './Input'

const PersonForm = ( {newName, handleNameChange, number, handleNumberChange, handleSubmit} ) => {
    return (
        <>
            <form>
                <div>
                name: <Input type="text" value={newName} change={handleNameChange} />
                </div>
                <div>
                number: <Input type="text" value={number} change={handleNumberChange} />
                </div>
                <div>
                <button type="submit" onClick={handleSubmit}>Add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm