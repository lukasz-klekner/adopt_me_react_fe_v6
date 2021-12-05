const Pet = ({ animal, name, breed, id, images, location }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg"

  if(images.length) hero=images[0]

  return(
    <a className='pet' href={`/details/${id}`}>
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
  <div className='info'>
    <h2>{name}</h2>
    <h3>{`${animal} - ${breed} - ${location}`}</h3>
  </div>
  </a>
);
}
export default Pet;
