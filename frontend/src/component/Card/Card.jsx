/* eslint-disable react/prop-types */
import  "./Card.css";

const Card = ({ children, cardClass }) => {
  return <div className={`Card ${cardClass}`}>{children}</div>;
};

export default Card;