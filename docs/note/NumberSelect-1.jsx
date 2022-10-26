import React, { useState, useEffect  } from 'react'

const NumberSelect = () => {
  const [value, setValue] = useState(0)
  const [message, setMessage = useState('')

  const onClickMinus = () => {
    if(value > 0) {
      setValue(value -1)
      setMessage('')
    }else {
      setMessage('不能再减小啦～')
    }
  }

  const onClickPlus = () => {
    if(value< 10) {
      setValue(value +1)
      setMessage('')
    }else {
      setMessage('已经最多了噢～')
    }
  }

  return (
    <div className="quantity-selector">
      <button onClick={onClickMinus} className="button">
        -
      </button>
      <div className="number">{value}</div>
      <button onClick={onClickPlus} className="button">
        +
      </button>
      <div className="message">{message}</div>
    </div>
  );
}

export default NumberSelect