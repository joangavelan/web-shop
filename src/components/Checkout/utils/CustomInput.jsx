import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'

const CustomInput = ({ name, label }) => {

  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller 
        render={({ field }) => <TextField {...field} fullWidth required label={label}/>}
        control={control} 
        name={name}/>
    </Grid>
  )
}

export default CustomInput