import React from 'react';
import './CustomCard.scss';

export interface ICustomCard {
  title: string;
  value: string | number;
  bgColor?: string;
  textColor?: string;
}

const CustomCard: React.FC<ICustomCard> = ({
  title,
  value,
  bgColor = 'red',
  textColor = 'white',
}) => {
  return (
    <div
      className="card"
      style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
    >
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
};

export default CustomCard;
