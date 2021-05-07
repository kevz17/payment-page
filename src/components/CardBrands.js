import React from 'react';
import VisaIcon from './icons/VisaIcon';
import MastercardIcon from './icons/MastercardIcon';
import AmexIcon from './icons/AmexIcon';
import DiscoverIcon from './icons/DiscoverIcon';

const CardBrand = ({ cardBrand }) => {
  const isVisa = cardBrand === 'visa';
  const isMastercard = cardBrand === 'mastercard';
  const isAmex = cardBrand === 'amex';
  const isDiscover = cardBrand === 'discover';
  const buttonColor = '#3f51b5';
  const defaultColor = '#ffffff';

  return (
    <div style={cardBrandContainerStyle}>
      <span
        style={{
          ...cardBrandStyle,
          borderColor: `${isVisa ? buttonColor : defaultColor}`,
        }}
      >
        <VisaIcon checked={!cardBrand || isVisa} />
      </span>
      <span
        style={{
          ...cardBrandStyle,
          borderColor: `${isMastercard ? buttonColor : defaultColor}`,
        }}
      >
        <MastercardIcon checked={!cardBrand || isMastercard} />
      </span>
      <span
        style={{
          ...cardBrandStyle,
          borderColor: `${isAmex ? buttonColor : defaultColor}`,
        }}
      >
        <AmexIcon checked={!cardBrand || isAmex} />
      </span>
      <span
        style={{
          ...cardBrandStyle,
          borderColor: `${isDiscover ? buttonColor : defaultColor}`,
        }}
      >
        <DiscoverIcon checked={!cardBrand || isDiscover} />
      </span>
    </div>
  );
};

const cardBrandContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '3rem',
};

const cardBrandStyle = {
  margin: '0 0.4rem',
  padding: '0 0.4rem',
  border: '2px solid black',
};

export default CardBrand;
