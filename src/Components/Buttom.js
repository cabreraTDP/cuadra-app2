import React from 'react'
import '../CSS/Buttom.css'

export const Buttom = ({ title, ...rest }) => {
  return (
    <button {...rest} className="btn-btn">
      {title}
    </button>
  )
}
