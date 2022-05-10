import React from 'react'
import "./Loading.scss"
const Loading = () => {
  return (
    <div className="loading-browser">
      <div className="overlay">
        <div className="overlay__inner">
          <div className="overlay__content">
            <span className="spinner">

            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading