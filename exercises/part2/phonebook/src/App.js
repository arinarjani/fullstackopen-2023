import {useState, useEffect} from 'react'
import phonebook from './services/phonebook'
import loginService from './services/login'

// Components
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import login from './services/login';

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
  // 6
  const [notification, setNotification] = useState(null);
  // 7
  const [username, setUsername] = useState('')
  // 8
  const [password, setPassword] = useState('');
  // 9
  const [user, setUser] = useState(null)

  // 2.11 Modify the application such that the initial state of the data is fetched from 
  // the server using the axios-library. Complete the fetching with an Effect hook.
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

  // update persons number if desired (lines 46 to 72 ) / put name and number of person in person state (lines 74 to 86)
  const handleSubmit = (event) => {
    event.preventDefault();

    const duplicateName = persons.find(person => person.name === newName);

    if (duplicateName) {
      // alert(`${newName} is already added to the phonebook`) OLD VERSION BEFORE 2.15

      // 2.15 - Change the functionality so that if a number is added to 
      //        an already existing user, the new number will replace the old number.
      const replaceNumber = window.confirm(`${newName} is already in the phonebook, replace the old number with the new one?`)

      if (replaceNumber) {
        // make a new object with the upated number, but keep the other data the same
        const updatedPerson = {...duplicateName, number}

        // make a PUT request to the server to update the number of duplicatePerson, then update the persons state
        phonebook.updatePhoneNumber(updatedPerson.id, updatedPerson)
                 .then(response => setPersons(persons.map(person => person.id !== updatedPerson.id ? person : response))); 
        
        // 2.16 - show a notification that lasts for a few seconds after a successful operation 
        //        is executed (a person is added or a number is changed)

        // the notification
        setNotification(`${updatedPerson.name}'s number has been updated to ${updatedPerson.number}`)

        // the timer to make the notification go away after 5 seconds
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    } 
    // else if (number.length < 5 || newName.length < 5) {
    //   // 3.19 - 
    //   setNotification('The name and number must be 5 or more characters')

    //   setTimeout(() => {
    //     setNotification(null)
    //   }, 5000)
    // } 
    else {
      const newPerson = {
        name: newName,
        number: number
      }

      // 2.12 - Currently, the numbers that are added to the phonebook are not 
      //        saved to a backend server. Fix this situation.
      phonebook.create(newPerson)
               .then((createdPerson) => {
                  setPersons(persons.concat(newPerson))
                  setNewName('');
                  setNumber('');

                  // 2.16 - show a notification that lasts for a few seconds after a successful operation 
                  //        is executed (a person is added or a number is changed)

                  // the notification
                  setNotification(`${newPerson.name} has been added to the phonebook`);

                  // the timer to make the notification go away after 5 seconds
                  setTimeout(() => {
                    setNotification(null);
                  }, 5000);
                })
                .catch((err) => {
                  // 3.19 - Expand the frontend so that it displays some form of 
                  // error message when a validation error occurs. 
                  setNotification(err.response.data.err)

                  setTimeout(() => {
                    setNotification(null);
                  }, 5000)
                })
    }
  }

  // 2.14 - Make it possible for users to delete entries from the phonebook.
  const handleDelete = (id) => {
    phonebook.deletePerson(id)
              // 2.17 - show a message stating someone has already been deleted if the user deletes 
              //        someone multiple times (one browser clickd delete, but the other browser 
              //        still shows the person)
             .catch(err => {
                console.log(err);
                setNotification(`You are trying to delete a person that has already been deleted`)
                setTimeout(() => {
                  setNotification(null)
                }, 5000)
             })
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

  // handle the password and username from the user once submitted
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logged in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification(error)
      setTimeout(() => {
        setNotification(null)
      }, 3000);
    }
  }

  return (
    <div>
      <Notification message={notification} />
      <h2>Phonebook</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input 
            type="text" 
            value={username} 
            name='username'
            onChange={ (e) => setUsername(e.target.value) } />
        </div>
        <div>
          password:
          <input 
            type="password" 
            value={password} 
            name='password'
            onChange={ (e) => setPassword(e.target.value) } />
        </div>
        <button type="submit">login</button>
      </form>
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
