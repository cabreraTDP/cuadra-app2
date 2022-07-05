import React from 'react'
import '../CSS/Buttom.css'

export const Buttom = ({ title, onClick, style }) => {
  return (
    <button style={style} onClick={onClick} className="btn-btn">
      {title}
    </button>
  )
}
