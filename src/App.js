import ReactDOM from "react-dom";

import Pet from "./Pet";

const App = () => (
  <div>
    <h1>Adopt me!</h1>
    <Pet animal="Dog" name="Luna" />
    <Pet animal="Cat" name="Filemon" />
    <Pet animal="Hamster" name="Kruszynka" />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
