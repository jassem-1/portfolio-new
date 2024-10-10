declare module "*.jpg" {
    const value: string;
    export default value;
  }
  declare module "*.webp" {
    const value: string;
    export default value;
  }

  declare module "*.png" {
    const value: string;
    export default value;
  }

  declare module "*.svg" {
    const value: string;
    export default value;
  }

  declare module 'react-typed' {
    import { Component } from 'react';

    interface TypedProps {
        strings: string[];
        typeSpeed?: number;
        backSpeed?: number;
        loop?: boolean;
        startDelay?: number;
        className?: string;
        onComplete?: () => void;
    }

    export default class ReactTyped extends Component<TypedProps> {}
}
