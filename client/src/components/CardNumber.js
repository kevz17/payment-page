import React from 'react';
import NumberFormat from 'react-number-format';

const CardNumber = ({ inputRef, cardBrand, ...other }) => {  
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      format={cardBrand === 'amex' ? "#### ###### #####" : "#### #### #### ####"}
    />
  );
};

export default CardNumber;
