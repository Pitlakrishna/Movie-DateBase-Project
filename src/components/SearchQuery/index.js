import {useState} from 'react'
import SearchMoviesContext from '../../context/SearchMoviesContext'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

import './index.css'

const SearchQuery = () => {
  const renderEmptyView = () => (
    <div className="empty-view-container">
      <h1>No results found.</h1>
      <p>Don not get worried, Try to search again.</p>
    </div>
  )

  const renderSerachItems = searchResponse => {
    const {results} = searchResponse

    if (!results.length) {
      renderEmptyView()
    }

    return (
      <ul className="movieItems">
        {results.map(item => (
          <MovieCard key={item.id} movieDetails={item} />
        ))}
      </ul>
    )
  }

  const renderLoading = () => {
    return (
      <div>
        <Loader type="TailSpin" color="#032541" />
      </div>
    )
  }

  const getSearchedMovieItems = value => {
    const {apiStatus, searchResponse} = value
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoading()
      case 'SUCCESS':
        return renderSerachItems(searchResponse)
    }
  }

  return (
    <div>
      <SearchMoviesContext.Consumer>
        {value => {
          const {
            searchResponse,
            apiStatus,
            onTriggerSearchingQuery,
            searchInput,
            onChangeSearchInput,
          } = value

          return (
            <>
              <NavBar />
              <div>{getSearchedMovieItems(value)}</div>
              <Pagination
                totalPages={searchResponse.totalPages}
                apiCallback={onTriggerSearchingQuery}
              />
            </>
          )
        }}
      </SearchMoviesContext.Consumer>
    </div>
  )
}

export default SearchQuery
