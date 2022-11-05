import React from 'react';
import './BaseComponent.scss';

export interface IBaseComponent {
  sampleText: string;
}

const BaseComponent: React.FC<IBaseComponent> = ({ sampleText }) => {
  return <h1 className="container">{sampleText}</h1>;
};

export default BaseComponent;
