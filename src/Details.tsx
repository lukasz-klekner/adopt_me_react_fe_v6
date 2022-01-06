import { Component, FunctionComponent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import Carousel from './Carousel'
import ErrorBoundary from './ErrorBoundary'
import Modal from './Modal'
import ThemeContext from './ThemeContext'
import { Animal, PetAPIResponse } from './APIResponsesType'

class Details extends Component<RouteComponentProps<{ id: string }>> {
  state = {
    loading: true,
    showModal: false,
    name: '',
    animal: '' as Animal,
    description: '',
    breed: '',
    images: [] as string[],
    city: '',
    state: '',
  }

  async componentDidMount() {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    )
    const json = (await response.json()) as PetAPIResponse

    this.setState(Object.assign({ loading: false }, json.pets[0]))
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal })
  adopt = () => (window.location.href = 'http://bit.ly/pet-adopt')

  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state

    return (
      <div className='details'>
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className='buttons'>
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    )
  }
}

const DetailsWithRouter = withRouter(Details)

const DetailsWithErrorBoundary: FunctionComponent = () => (
  <ErrorBoundary>
    <DetailsWithRouter />
  </ErrorBoundary>
)

export default DetailsWithErrorBoundary
