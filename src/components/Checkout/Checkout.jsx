import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './styles'
import AddressForm from './Forms/AddressForm'
import PaymentForm from './Forms/PaymentForm'
import { commerce } from '../../lib/commerce'

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart }) => {

  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
        setCheckoutToken(token);
      } catch (err) {
      } 
    }
    generateToken();
  }, [cart]);

  const Confirmation = () => <div>Confirmation</div>

  const CheckoutBody = () => {
    if(steps[activeStep] === 'Shipping Address') return <AddressForm checkoutToken={checkoutToken}/>
    if(steps[activeStep] === 'Payment Details') return <PaymentForm />
    if(activeStep === steps.length) return <Confirmation />
  }

  return (
    <React.Fragment>
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