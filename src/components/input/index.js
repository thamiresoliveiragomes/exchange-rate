import React from 'react';

function Input(props) {
  return (
    <div className={props.className}>
      <label className={props.classNameLabel}>{props.label}</label>
      <input type={props.type} name={props.name} className={props.classNameInput} 
      value={props.value} onChange={props.onChange} onClick={props.onClick}
      checked={props.checked}/>
    </div>
  );
};

export default Input;