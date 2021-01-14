import React from 'react';
import '../../App.css';
import spinner from './spinner.gif';

const Loader = () => {
  return (
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: '200px', margin: 'auto', display: 'block' }}
    />
  );
};

export default Loader;
