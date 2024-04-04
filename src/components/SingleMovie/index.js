import {Component} from 'react'

class SingleMovie extends Component {
  state = {isLoading: true, getSingleProduct: {}}

  componentDidMount() {
    this.getfetchedDataOFSingleItem()
  }

  getfetchedDataOFSingleItem = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US`
    console.log(id)
  }

  render() {
    return (
      <div>
        <h1>Single product</h1>
      </div>
    )
  }
}

export default SingleMovie
