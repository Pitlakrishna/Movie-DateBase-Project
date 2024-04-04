import {Component} from 'react'
import React from 'react'
import './index.css'

class Pagination extends Component {
  state = {
    pageNo: 1,
  }

  onNextPage = () => {
    const {apiCallback, totalPages} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo < totalPages) {
          return {
            pageNo: prevState.pageNo + 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  onPrevPage = () => {
    const {apiCallback} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo > 1) {
          return {
            pageNo: prevState.pageNo - 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state
    const {totalPages} = this.props

    return (
      <div className="mb-3 d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn btn-warning "
          onClick={this.onPrevPage}
        >
          Prev
        </button>
        <h4 className="page-no m-2">{pageNo}</h4>
        <button
          type="button"
          className="btn btn-warning "
          onClick={this.onNextPage}
        >
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
