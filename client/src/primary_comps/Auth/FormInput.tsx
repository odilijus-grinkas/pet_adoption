import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ChangeEventHandler } from 'react';

const FormInput = ({ placeholder, name, type, handleChange, icon }: { placeholder: string, name: string, type: string, handleChange: ChangeEventHandler<HTMLInputElement> , icon: IconProp }) => {
  return (
    <div className="form-floating mb-3 d-flex align-items-center">
      <FontAwesomeIcon icon={icon} className='icon me-2' />
      <input placeholder={placeholder} className="form-control" id={name} name={name} type={type} onChange={handleChange} />
      <label className='ms-4' htmlFor={name}>{placeholder}</label>
    </div>
  );
};

export default FormInput;
