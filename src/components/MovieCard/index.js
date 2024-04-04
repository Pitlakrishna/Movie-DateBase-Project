import {Link} from 'react-router-dom'

const MovieCard = ({movieDetails}) => {
  const {id, posterPath, title, voteAverage} = movieDetails
  return (
    <li className="card p-2 m-2" style={{width: '18rem', height: '550px'}}>
      <img src={posterPath} className="card-img-top" alt={title} />
      <div className="card-body d-flex justify-content-between ">
        <h5 className="card-title fs-6">{title}</h5>
        <h5 className="fs-5 text-info ps-2 ">{voteAverage}</h5>
      </div>
      <Link to={`/movie/${id}`} className="mt-auto align-self-center">
        <button className="btn btn-outline-success" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
