import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core'
import useStyles from './styles'
import AddressForm from './Forms/AddressForm'
import PaymentForm from './Forms/PaymentForm'
import { commerce } from '../../lib/commerce'
import { Link } from 'react-router-dom'

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {

  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});


  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart?.id, { type: 'cart' });
        setCheckoutToken(token);
      } catch (err) {
        console.log(err)
      } 
    }
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep(previousActiveStep => previousActiveStep + 1);
  const backStep = () => setActiveStep(previousActiveStep => previousActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  }

  let Confirmation = () => order.customer ? (
    <React.Fragment>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
        <Divider className={classes.divider}/>
        <Typography variant="subtitle2">Order reference: {order.customer_reference}</Typography>
      </div>
      <br/>
      <Button component={Link} to="/" variant="outlined" typed="button">Back to Home</Button>
    </React.Fragment>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  )

  if(error) {
    <React.Fragment>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" typed="button">Back to Home</Button>
    </React.Fragment>
  }

  const CheckoutBody = () => {
    if(steps[activeStep] === 'Shipping Address') return <AddressForm checkoutToken={checkoutToken} next={next}/>
    if(steps[activeStep] === 'Payment Details') return <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout}/>
    if(activeStep === steps.length) return <Confirmation />
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.toolbar}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">Checkout</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {checkoutToken && <CheckoutBody />}
          </Paper>
        </main>
      </div>
    </React.Fragment>
  )
}

export default Checkout