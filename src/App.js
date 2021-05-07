import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ExpirationDate from './components/ExpirationDate';
import Cvv from './components/Cvv';
import CardBrands from './components/CardBrands';
import CardNumber from './components/CardNumber';
import CheckIcon from './components/icons/CheckIcon';
// Credit: https://www.creditkarma.com/credit-cards/i/find-credit-card-cvv-number
import CvvHelp from './components/images/cvv_help.png';
// Credit: https://thevoiceofnick.fandom.com/wiki/Gaffer_Gamgee_the_Gradient
import background from './components/images/background_wave.jpg';

const App = () => {
  const VISA = 'visa';
  const MASTERCARD = 'mastercard';
  const AMEX = 'amex';
  const DISCOVER = 'discover';
  const EXPIRATION_DATE_STRING_LENGTH = 5;
  const CVV_MIN_DIGIT = 3;
  const [cardholderName, setCardholderName] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [isCardholderNameValid, setIsCardholderNameValid] = useState(false);
  const [isCardNumberValid, setIsCardNumberValid] = useState(false);
  const [isExpirationDateValid, setIsExpirationDateValid] = useState(false);
  const [isCvvValid, setIsCvvValid] = useState(false);
  const [cardBrand, setCardBrand] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [isReadyForPay, setIsReadyForPay] = useState(false);
  const isPopoverOpen = Boolean(anchorEl);
  let isReadyForPay = false;

  const handleCardholderName = e => {
    setCardholderName(e.target.value);
    setIsCardholderNameValid(!!e.target.value);
  };

  const detectCardBrand = currentCardNumber => {
    if (currentCardNumber.match(/^4[0-9]{6,}$/)) return VISA;
    if (
      currentCardNumber.match(
        /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/
      )
    )
      return MASTERCARD;
    if (currentCardNumber.match(/^3[47][0-9]{5,}$/)) return AMEX;
    if (currentCardNumber.match(/^6(?:011|5[0-9]{2})[0-9]{3,}$/))
      return DISCOVER;
    return;
  };

  const handleCardNumber = e => {
    setCardNumber(e.target.value.replace(/\s/g, ''));
    setCardBrand(detectCardBrand(e.target.value.replace(/\s/g, '')));
    setIsCardNumberValid(!!e.target.value);
  };

  const handleExpirationDate = e => {
    setExpirationDate(e.target.value);
    setIsExpirationDateValid(
      e.target.value.length === EXPIRATION_DATE_STRING_LENGTH
    );
  };

  const handleCvv = e => {
    setCvv(e.target.value);
    setIsCvvValid(e.target.value.length >= CVV_MIN_DIGIT);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log({
      cardholderName,
      cardNumber,
      expirationDate,
      cvv,
    });
  };

  const renderPopover = () => (
    <div>
      <Typography
        aria-owns={isPopoverOpen ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={e => setAnchorEl(e.currentTarget)}
        onMouseLeave={() => setAnchorEl(null)}
      >
        <HelpOutlineIcon
          style={{
            width: '1.1rem',
            height: '1.1rem',
            marginLeft: '9.7rem',
          }}
        />
      </Typography>
      <Popover
        id="mouse-over-popover"
        open={isPopoverOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={() => setAnchorEl(null)}
        disableRestoreFocus
        style={{ pointerEvents: 'none' }}
      >
        <img
          src={CvvHelp}
          alt="CVV is a three- or four-digit number on your card"
          style={{ width: '300px', height: '300px' }}
        ></img>
      </Popover>
    </div>
  );

  isReadyForPay =
    isCardholderNameValid &&
    isCardNumberValid &&
    isExpirationDateValid &&
    isCvvValid;

  return (
    <div style={containerStyle}>
      <Card style={cardStyle}>
        <div></div>
        <div>
          <CardHeader title="Payment Details" style={cardHeaderStyle} />
          <CardContent style={cardContentStyle}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <CardBrands cardBrand={cardBrand} />
              <TextField
                id="standard-basic 1"
                label="CARDHOLDER NAME"
                type="text"
                InputLabelProps={{ shrink: true }}
                onChange={handleCardholderName}
                style={{ ...textFieldStyle, width: '100%' }}
              />
              <br />
              <TextField
                id="standard-basic 2"
                label="CARD NUMBER"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: CardNumber,
                }}
                inputProps={{ cardBrand }}
                onChange={handleCardNumber}
                style={{ ...textFieldStyle, width: '100%' }}
              />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  id="standard-basic 3"
                  label="EXPIRATION DATE"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    inputComponent: ExpirationDate,
                  }}
                  onChange={handleExpirationDate}
                  style={textFieldStyle}
                />
                <TextField
                  id="standard-basic 4"
                  label={
                    <div
                      style={{
                        display: 'flex',
                      }}
                    >
                      CVV{renderPopover()}
                    </div>
                  }
                  type="password"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    inputComponent: Cvv,
                  }}
                  inputProps={{ cardBrand }}
                  onChange={handleCvv}
                  style={{ ...textFieldStyle, marginLeft: '4rem' }}
                />
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon />}
                    checkedIcon={<CheckIcon />}
                    name="saveCard"
                  />
                }
                label="Save my card for future payments"
              />
              <Button
                variant="contained"
                color="primary"
                style={buttonStyle}
                type="submit"
                disabled={isReadyForPay ? false : true}
              >
                Pay Now
              </Button>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

const containerStyle = {
  backgroundImage: `url(${background})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '4rem 0',
  height: '100vh',
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '400px',
  margin: '0 auto',
  padding: '2rem',
  border: '1px solid gray',
  // borderRadius: '0',
};

const cardHeaderStyle = {
  textAlign: 'center',
};

const cardContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const textFieldStyle = {
  margin: '0.9rem 0',
};

const buttonStyle = {
  width: '100%',
  margin: '1rem 0',
};

export default App;
