import { FunctionComponent } from 'react'
import Pet from './Pet'
import { Pet as PetType } from './APIResponsesType'

const Result: FunctionComponent<{ pets: PetType[] }> = ({ pets }) => (
  <div className='search'>
    {!pets.length ? (
      <h2>No Pets Found</h2>
    ) : (
      pets.map(({ animal, id, name, breed, images, city, state }) => (
        <Pet
          key={id}
          id={id}
          animal={animal}
          name={name}
          breed={breed}
          images={images}
          location={`${city}, ${state}`}
        />
      ))
    )}
  </div>
)

export default Result
