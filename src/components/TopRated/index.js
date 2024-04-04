import React from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

import './index.css'

class TopRated extends React.Component {
  state = {
    isLoading: true,
    topRatedMovieResponse: {},
  }

  componentDidMount() {
    this.getTopRatedMoviesResponse()
  }

  getTopRatedData = data => ({
    totalPages: data.total_pages,
    totalResults: data.total_results,
    results: data.results.map(item => ({
      id: item.id,
      posterPath: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      title: item.title,
      voteAverage: item.vote_average,
    })),
  })

  getTopRatedMoviesResponse = async (page = 1) => {
    const API_KEY = '8b9b95d44a2b9ba3fc82f1365f904b0c'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const updateData = this.getTopRatedData(data)
    this.setState({isLoading: false, topRatedMovieResponse: updateData})
  }

  loadingView = () => {
    return (
      <div className="loader-container">
        <Loader type="TailSpin" color="#032541" />
      </div>
    )
  }

  topRatedMoviesDataResponse = topRatedMovieResponse => {
    const {results} = topRatedMovieResponse
    return (
      <ul className="movieItems">
        {results.map(item => (
          <MovieCard key={item.id} movieDetails={item} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, topRatedMovieResponse} = this.state
    // console.log(topRatedMovieResponse, isLoading)
    return (
      <>
        <NavBar />
        {isLoading
          ? this.loadingView()
          : this.topRatedMoviesDataResponse(topRatedMovieResponse)}
        <Pagination
          totalPages={topRatedMovieResponse.totalPages}
          apiCallback={this.getTopRatedMoviesResponse}
        />
      </>
    )
  }
}

export default TopRated
