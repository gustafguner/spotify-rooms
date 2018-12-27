import * as React from 'react';
import Lottie from 'react-lottie';
import * as animationData from 'src/assets/animations/loader.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
};

const Loader = () => <Lottie options={defaultOptions} height={90} width={90} />;

export default Loader;
