import Pet from "./Pet";

const Result = ({pets}) => (
    <div className="search">
        {!pets.length ? (<h2>No Pets Found</h2>) : (
            pets.map(({animal,id, name, breed, images,city,state})=> (
                <Pet key={id} id={id} animal={animal} name={name} breed={breed} images={images} location={`${city}, ${state}`}/>
            ))
        )}
    </div>
)

export default Result