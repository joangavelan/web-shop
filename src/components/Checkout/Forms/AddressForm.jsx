import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import CustomInput from '../utils/CustomInput'
import { commerce } from '../../../lib/commerce'

const AddressForm = ({ checkoutToken }) => {

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name}));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name}));
  const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0])
  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  }

  const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
    setShippingOptions(options); 
    setShippingOption(options[0]?.id); 
  }
  
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if(shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if(shippingSubdivision) fetchShippingOptions(checkoutToken?.id, shippingCountry, shippingSubdivision)
  }, [shippingSubdivision]);


  const fetchUsOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
    console.log(options);
  }

  // console.log(shippingCountry)
  // console.log(shippingSubdivisions)
  // console.log(shippingSubdivision)

  useEffect(() => {
    fetchUsOptions(checkoutToken.id, 'US', 'CA');
  }, []);


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form>
          <Grid container spacing={3}>
            <CustomInput label="First Name" name="firstName"/>
            <CustomInput label="Last Name" name="lastName"/>
            <CustomInput label="Address" name="address"/>
            <CustomInput label="Email" name="email"/>
            <CustomInput label="City" name="city"/>
            <CustomInput label="ZIP / Postal code" name="zip"/>
            {/* selects */}
            {/* shipping country */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {countries.map(country => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* shipping subdivision */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {subdivisions.map(subdivision => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* shipping options */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {options.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </React.Fragment>
  )
}

export default AddressForm