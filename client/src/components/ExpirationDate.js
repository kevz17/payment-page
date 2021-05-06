import React from 'react';
import NumberFormat from 'react-number-format';

// Credit: https://github.com/s-yadav/react-number-format#custom-format-method---format-credit-card-expiry-time
const ExpirationDate = ({ inputRef, ...other }) => {
  const limit = (val, max) => {
    if (val.length === 1 && val[0] > max[0]) {
      val = '0' + val;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = '01';

        //this can happen when user paste number
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  };

  const cardExpiry = val => {
    let month = limit(val.substring(0, 2), '12');
    let year = val.substring(2, 4);

    return month + (year.length ? '/' + year : '');
  };

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      format={cardExpiry}
      placeholder="MM/YY"
    />
  );
};

export default ExpirationDate;
