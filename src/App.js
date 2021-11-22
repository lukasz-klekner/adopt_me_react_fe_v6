const Pet = () =>
  React.createElement('div', {}, [
    React.createElement('h2', {}, 'Dog'),
    React.createElement('h3', {}, 'Luna'),
    React.createElement('h3', {}, 'Reksio'),
  ])

const App = () =>
  React.createElement('div', {}, [
    React.createElement('h1', { id: 'header' }, 'Adopt me'),
    ...[1, 2, 3, 4].map((i) => React.createElement('div', {}, i)),
    React.createElement(Pet),
    React.createElement(Pet),
    React.createElement(Pet),
  ])

ReactDOM.render(React.createElement(App), document.getElementById('root'))
