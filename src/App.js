import ReactDOM from "react-dom";

import SearchParams from "./SearchParams";

const App = () => (
  <div>
    <h1>Adopt me!</h1>
    <SearchParams />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
