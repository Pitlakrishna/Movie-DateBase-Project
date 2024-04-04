import React from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

import './index.css'

class Popular extends React.Component {
  state = {
    isLoading: true,
    popularMovieResponse: {},
  }

  componentDidMount() {
    this.getPopularMoviesResponse()
  }

  getUpdatedData = data => ({
    totalPages: data.total_pages,
    totalResults: data.total_results,
    results: data.results.map(item => ({
      id: item.id,
      posterPath: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      title: item.title,
      voteAverage: item.vote_average,
    })),
  })

  getPopularMoviesResponse = async (page = 1) => {
    const API_KEY = '8b9b95d44a2b9ba3fc82f1365f904b0c'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const updateData = this.getUpdatedData(data)
    this.setState({isLoading: false, popularMovieResponse: updateData})
  }

  loadingView = () => {
    return (
      <div className="loader-container">
        <Loader type="TailSpin" color="#032541" />
      </div>
    )
  }

  popularMoviesDataResponse = popularMovieResponse => {
    const {results} = popularMovieResponse
    return (
      <ul className="movieItems">
        {results.map(item => (
          <MovieCard key={item.id} movieDetails={item} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, popularMovieResponse} = this.state
    // console.log(popularMovieResponse, isLoading)
    return (
      <>
        <NavBar />
        {isLoading
          ? this.loadingView()
          : this.popularMoviesDataResponse(popularMovieResponse)}
        <Pagination
          totalPages={popularMovieResponse.totalPages}
          apiCallback={this.getPopularMoviesResponse}
        />
      </>
    )
  }
}

export default Popular
