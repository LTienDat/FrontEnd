import React from 'react'
import { Input } from 'antd';
import { useState } from 'react';
const InputForm = ( props ) => {
  const [valueInput, setValueInput] = useState('')
  const { placeholder = 'Nhập text', ...rests } = props
  return (
    <Input placeholder={placeholder} valueInput={valueInput} {...rests} style={{width:'300px', marginBottom:'10px'}} />
  )
}

export default InputForm