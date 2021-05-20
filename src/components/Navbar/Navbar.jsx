import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/commerce.png'
import useStyles from './styles'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({totalItems}) => {

  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <AppBar position="fixed" className={classes.appBar} color="inherit">
      <Toolbar>
        <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
          <img src={logo} alt="Web Shop" height="25px" className={classes.image} />
          Web Shop
        </Typography>
        <div className={classes.grow} />
        {pathname === '/' && 
          <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar