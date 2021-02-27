import React from 'react';
import spinner_bars from '../../assets/loaders/spinner_bars3.svg'

const LoaderDiv = ({ propClass }) => {

  return (
    <div  className={`loaderDiv ${propClass}`}>
    <img src={spinner_bars} alt=""/>
  </div>
  )

}

export default LoaderDiv;