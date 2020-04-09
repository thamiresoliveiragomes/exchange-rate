import React from 'react';
import './styles.css'
function Input(props) {
  return (
    <div className='input-component'>
      <input type={props.type} name={props.name} className={props.classNameInput}
      value={props.value} onChange={props.onChange}
      checked={props.checked}/>
      <label>{props.label}</label>
    </div>
  );
};

export default Input;