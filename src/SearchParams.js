import { useState } from "react";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");

  const updateLocation = (event) => setLocation(event.target.value);

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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
