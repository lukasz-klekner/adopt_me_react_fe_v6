import React from "react";

const Pet = ({ animal, name }) =>
  React.createElement("div", {}, [
    React.createElement("h2", {}, animal),
    React.createElement("h3", {}, name),
  ]);

export default Pet;
