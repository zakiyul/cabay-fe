import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Logo from '../assets/logo/logo.png';
import { useNavigate } from 'react-router-dom';

export default function AppbarComp({toggleDrawer}){
    const navigate = useNavigate()
    return (
        <AppBar position="fixed" color='inherit'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <img src={Logo} alt="logo" height='40' style={{ marginLeft:'-15px' }} onClick={_ => navigate('/')} />
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Cabai.
            </Typography> */}
          </Toolbar>
        </AppBar>
    )
}