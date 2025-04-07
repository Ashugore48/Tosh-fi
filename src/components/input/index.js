import React from 'react'
import './styles.css'

function Input({lable, state, setState, placeholder, type}) {
  return (
    <div className='input-wrapper'>
        <p className='lable-input'>{lable}</p>
        <input value={state} 
        onChange={(e) => setState(e.target.value)} 
        placeholder={placeholder}
        type={type}
        className='custom-input' />
    </div>
  )
}

export default Input
