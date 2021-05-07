import React from 'react';
import NumberFormat from 'react-number-format';

const Cvv = ({ inputRef, cardBrand, ...other }) => {
  const CVV_MAX_LENGTH = cardBrand === 'amex' ? 4 : 3;
  const withLengthLimit = inputObj => {
    const { value } = inputObj;
    if (value.length <= CVV_MAX_LENGTH) return inputObj;
  };

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      isAllowed={withLengthLimit}
    />
  );
};

export default Cvv;
