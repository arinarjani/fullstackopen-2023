import {useState, useEffect} from 'react'
import phonebook from './services/phonebook';

// Components
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

function App() {
  // 1
  const [persons, setPersons] = useState([]);
  // 2
  const [newName, setNewName] = useState('');
  // 3
  const [number, setNumber] = useState('');
  // 4
  const [search, setSearch] = useState('');
  // 5
  const [filteredPeople, setFilteredPeople] = useState([]);

  // 2.11 Modify the application such that the initial state of the data is fetched from 
  // the server using the axios-library. Complete the fetching with an Effect hook.
  // 2.13 - Extract the code that handles the communication with the backend 
  //        into its own module by following the example shown earlier in this part of the course material.
  useEffect(() => {
    phonebook
      .getAll()
      .then(initialPhonebook => setPersons(initialPhonebook));
  }, [persons.length])

  // set new person in persons state
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // set new number for person in persons state
  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  // put name and number of person in person state
  const handleSubmit = (event) => {
    event.preventDefault();
    const duplicateName = persons.find(person => person.name === newName);
    if (duplicateName) {
      // alert(`${newName} is already added to the phonebook`)
      // 2.15 - Change the functionality so that if a number is added to 
      //        an already existing user, the new number will replace the old number.
      const replaceNumber = window.confirm(`${newName} is already in the phonebook, replace the old number with the new one?`)
      if (replaceNumber) {
        // make a new object with the upated number
        const updatedPerson = {...duplicateName, number}
        // make a PUT request to the server to update the number of duplicatePerson
        phonebook.updatePhoneNumber(updatedPerson.id, updatedPerson).then(response => console.log(response));
        // update persons state
        phonebook.getAll().then(updatedNumbers => setPersons(updatedNumbers))
      }
    } else {
      const newPerson = {
        name: newName,
        number: number
      }

      // 2.12 - Currently, the numbers that are added to the phonebook are not 
      //        saved to a backend server. Fix this situation.
      // 2.13 - Extract the code that handles the communication with the backend 
      //        into its own module by following the example shown earlier in this part of the course material.
      phonebook.create(newPerson)
               .then(createdPerson => setPersons(persons.concat(newPerson)))
      setNewName('');
      setNumber('');
    }
  }

  // 2.14 - Make it possible for users to delete entries from the phonebook.
  const handleDelete = (id) => {
    phonebook.deletePerson(id)
    phonebook.getAll().then(withoutDeletePerson => setPersons(withoutDeletePerson))
  }

  // 2.9*: Implement a search field that can be used to filter the list of people by name
  // tips: https://www.codingdeft.com/posts/react-filter/#searching-a-list-of-names
  const handleSearch = (event) => {
    setSearch(event.target.value)
    // const filteredNames = persons.filter(person => person.name.search(/${event.target.value}/ig)  === -1 ? true : false);
    const filteredNames = event.target.value === '' ? [] : persons.filter(person => person.name.match(new RegExp(search, 'i')))
    // const filteredNames = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredPeople(filteredNames);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filteredPeople={filteredPeople} searchTerm={search} search={handleSearch} />
      <h2>Add A New Contact</h2>
      <PersonForm 
        newName={newName} 
        handleNameChange={handleNameChange} 
        number={number} 
        handleNumberChange={handleNumberChange} 
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
