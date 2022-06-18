import React from 'react'

function Tab() {
  return (
    <div>
          <li onClick={this.props.handleClick} className={this.props.isActive ? "active" : null}>
          <a href="#">{this.props.data.name}</a>
        </li>
    </div>
  )
}

export default Tab