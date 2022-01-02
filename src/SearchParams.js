import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import changeBreed from './actionCreator/changeBreed'
import changeAnimal from './actionCreator/changeAnimal'
import changeLocation from './actionCreator/changeLocation'
import changeTheme from './actionCreator/changeTheme'
import Result from './Result'
import useBreedList from './useBreedList'

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
  const location = useSelector((state) => state.location)
  const breed = useSelector((state) => state.breed)
  const animal = useSelector((state) => state.animal)
  const theme = useSelector((state) => state.theme)
  const [pets, setPets] = useState([])
  const [breedList] = useBreedList(animal)
  const dispatch = useDispatch()

  const requestPets = async () => {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    )
    const json = await response.json()
    setPets(json.pets)
  }

  const handleAnimal = (e) => {
    dispatch(changeBreed(''))
    dispatch(changeAnimal(e.target.value))
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
            onChange={(e) => dispatch(changeLocation(e.target.value))}
            placeholder='Location'
          />
        </label>
        <label htmlFor='animal'>
          Animal
          <select
            id='animal'
            value={animal}
            onChange={handleAnimal}
            onBlur={handleAnimal}
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
            onChange={(e) => dispatch(changeBreed(e.target.value))}
            onBlur={(e) => dispatch(changeBreed(e.target.value))}
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
            onChange={(e) => dispatch(changeTheme(e.target.value))}
            onBlur={(e) => dispatch(changeTheme(e.target.value))}
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
