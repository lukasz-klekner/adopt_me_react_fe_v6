import React from "react";
import ReactDOM from "react-dom";

const Pet = ({ animal, name }) =>
  React.createElement("div", {}, [
    React.createElement("h2", {}, animal),
    React.createElement("h3", {}, name),
  ]);

const App = () =>
  React.createElement("div", {}, [
    React.createElement("h1", { id: "header" }, "Adopt me"),
    ...[1, 2, 3, 4].map((i) => React.createElement("div", {}, i)),
    React.createElement(Pet, { animal: "Dog", name: "Luna" }),
    React.createElement(Pet, { animal: "Cat", name: "Filemon" }),
    React.createElement(Pet, { animal: "Hamster", name: "Kruszynka" }),
  ]);

ReactDOM.render(React.createElement(App), document.getElementById("root"));
