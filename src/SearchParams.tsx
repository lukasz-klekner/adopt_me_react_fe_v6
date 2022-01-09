import {
  useState,
  useEffect,
  FunctionComponent,
  FormEvent,
  ChangeEvent,
} from 'react'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import changeBreed from './redux/actionCreator/changeBreed'
import changeAnimal from './redux/actionCreator/changeAnimal'
import changeLocation from './redux/actionCreator/changeLocation'
import changeTheme from './redux/actionCreator/changeTheme'
import Result from './Result'
import useBreedList from './useBreedList'
import { Animal, Pet, PetAPIResponse } from './APIResponsesType'

const ANIMALS: Animal[] = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams: FunctionComponent = () => {
  const location = useSelector((state: RootStateOrAny) => state.location)
  const breed = useSelector((state: RootStateOrAny) => state.breed)
  const animal = useSelector((state: RootStateOrAny) => state.animal)
  const theme = useSelector((state: RootStateOrAny) => state.theme)
  const [pets, setPets] = useState([] as Pet[])
  const [breedList] = useBreedList(animal)
  const dispatch = useDispatch()

  const requestPets = async () => {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    )
    const json = (await response.json()) as PetAPIResponse
    setPets(json.pets)
  }

  const handleAnimal = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeBreed(''))
    dispatch(changeAnimal(event.target.value))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    void requestPets()
  }

  useEffect(() => {
    void requestPets()
  }, [])

  return (
    <div className='search-params'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='location'>
          Location
          <input
            id='location'
            value={location}
            onChange={(event) => dispatch(changeLocation(event.target.value))}
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
            onChange={(event) =>
              dispatch(changeBreed(event.target.value as Animal))
            }
            onBlur={(event) =>
              dispatch(changeBreed(event.target.value as Animal))
            }
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
            onChange={(event) => dispatch(changeTheme(event.target.value))}
            onBlur={(event) => dispatch(changeTheme(event.target.value))}
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
