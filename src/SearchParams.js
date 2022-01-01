import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Result from './Result'
import useBreedList from './useBreedList'

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
  const location = useSelector((state) => state.location)
  const breed = useSelector((state) => state.breed)
  const animal = useSelector((state) => state.animal)
  const theme = useSelector((state) => state.theme)
  // const [location, setLocation] = useState('Seattle, WA')
  // const [animal, setAnimal] = useState('')
  const [pets, setPets] = useState([])
  // const [breed, setBreed] = useState('')
  const [breedList] = useBreedList(animal)
  // const [theme, setTheme] = useContext(ThemeContext)

  // const updateLocation = (event) => setLocation(event.target.value)

  // const handleSelectChange = (event) => setAnimal(event.target.value)

  // const handleSelectBreedChange = (event) => setBreed(event.target.value)

  const requestPets = async () => {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    )
    const json = await response.json()
    setPets(json.pets)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    requestPets()
  }

  useEffect(() => {
    requestPets()
  }, [])

  return (
    <div className='search-params'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='location'>
          Location
          <input
            id='location'
            value={location}
            // onChange={updateLocation}
            placeholder='Location'
          />
        </label>
        <label htmlFor='animal'>
          Animal
          <select
            id='animal'
            value={animal}
            // onChange={handleSelectChange}
            // onBlur={handleSelectChange}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor='breed'>
          Breed
          <select
            id='breed'
            value={breed}
            // onChange={handleSelectBreedChange}
            // onBlur={handleSelectBreedChange}
          >
            <option />
            {breedList?.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor='theme'>
          Theme
          <select
            value={theme}
            // onChange={(e) => setTheme(e.target.value)}
            // onBlur={(e) => setTheme(e.target.value)}
          >
            <option value='darkblue'>Dark Blue</option>
            <option value='peru'>Peru</option>
            <option value='chartreuse'>Chartreuse</option>
            <option value='mediumorchid'>Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Result pets={pets} />
    </div>
  )
}

export default SearchParams
