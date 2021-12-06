import { Component } from "react"
import {withRouter} from 'react-router-dom'
import Carousel from "./Carousel"
import ErrorBoundary from "./ErrorBoundary"
class Details extends Component {
    constructor(){
        super()
        this.state= {loading: true}
    }

    async componentDidMount(){
        const response = await fetch(`http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`)
        const json = await response.json()

        this.setState(Object.assign(
            {loading: false},
            json.pets[0]
        ))
    }

    render() {
        if (this.state.loading) {
          return <h2>loading … </h2>;
        }

        const { animal, breed, city, state, description, name, images } = this.state;
        throw new Error('Siemka')

      }
}

const DetailsWithRouter = withRouter(Details)

export default function DetailsWithErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <DetailsWithRouter {...props} />
        </ErrorBoundary>
    )
}