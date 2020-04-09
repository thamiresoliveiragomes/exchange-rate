import React from 'react';

function Input(props) {
  return (
    <div className={props.className}>
      <input type={props.type} name={props.name} className={props.classNameInput}
      value={props.value} onChange={props.onChange}
      checked={props.checked}/>
      <label className={props.classNameLabel}>{props.label}</label>
    </div>
  );
};

export default Input;