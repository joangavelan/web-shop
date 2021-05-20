import React, { useState } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './styles'
import AddressForm from './Forms/AddressForm'
import PaymentForm from './Forms/PaymentForm'

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = () => {

  const [activeStep, setActiveStep] = useState(2);
  const classes = useStyles();

  const Confirmation = () => <div>Confirmation</div>

  const CheckoutBody = () => {
    if(steps[activeStep] === 'Shipping Address') return <AddressForm />
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
            <CheckoutBody />
          </Paper>
        </main>
      </div>
    </React.Fragment>
  )
}

export default Checkout