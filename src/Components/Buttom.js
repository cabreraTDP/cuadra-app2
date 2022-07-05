import React from 'react'
import '../CSS/Buttom.css'

export const Buttom = ({ title, onClick }) => {
  return (
    <button onClick={onClick} className="btn-btn">
      {title}
    </button>
  )
}
