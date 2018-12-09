declare module 'react-blur' {
  import * as React from 'react';

  interface BlurProps {
    blurRadius?: number;
    children?: JSX.Element;
    className?: string;
    enableStyles?: boolean;
    img: string;
    onLoadFunction?: () => void;
    shouldResize?: boolean;
    resizeInterval?: number;
  }

  const Blur: React.ComponentType<BlurProps>;

  export default Blur;
}
