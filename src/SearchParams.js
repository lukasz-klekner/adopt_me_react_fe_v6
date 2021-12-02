import { useState, useEffect } from "react";
import Pet from "./Pet";
import useBreedList from "./useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [animal, setAnimal] = useState("");
  const [pets, setPets] = useState([]);
  const [breed, setBreed] = useState("");
  const [breedList] = useBreedList(animal)

  const updateLocation = (event) => setLocation(event.target.value);

  const handleSelectChange = (event) => setAnimal(event.target.value);

  const handleSelectBreedChange = (event) => setBreed(event.target.value);

  const requestPets = async () => {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}`
    );
    const json = await response.json();
    setPets(json.pets);
  };

  useEffect(() => {
    requestPets();
  }, [animal]);

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            onChange={updateLocation}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={handleSelectChange}
            onBlur={handleSelectChange}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={handleSelectBreedChange}
            onBlur={handleSelectBreedChange}
          >
            <option />
            {breedList?.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {pets.map(({ name, animal, breed, id }) => (
        <Pet key={id} name={name} animal={animal} breed={breed} />
      ))}
    </div>
  );
};

export default SearchParams;
