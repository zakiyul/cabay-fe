import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListAlt  from '@mui/icons-material/ListAlt';
import LoginIcon from '@mui/icons-material/Login';
import Logo from '../assets/logo/logo.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



export default function DrawerComp({open, toggleDrawer}) {
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);
    // const [open, setOpen] = React.useState(false);

    // const toggleDrawer = (newOpen) => () => {
    //     setOpen(newOpen);
    // };
    useEffect(() => {
        setLogin(localStorage.getItem('login'))
    },[])


    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {/* {['Gejala', 'Penyakit', 'Tentang', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ fontFamily:'Montserrat' }} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/data-list')}>
                        <ListItemIcon>
                            <ListAlt />
                            {/* <BugReport /> */}
                        </ListItemIcon>
                        <ListItemText>
                            List Data
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <Divider/>
                <ListItem disablePadding>
                    {login === true ? <ListItemButton onClick={_ => navigate('/dashboard')}>
                        <ListItemIcon>
                            <LoginIcon />
                            {/* <ListAlt /> */}
                        </ListItemIcon>
                        <ListItemText>
                            Dashboard
                        </ListItemText>
                    </ListItemButton> : <ListItemButton onClick={_ => navigate('/login')}>
                        <ListItemIcon>
                            <LoginIcon />
                            {/* <ListAlt /> */}
                        </ListItemIcon>
                        <ListItemText>
                            Login
                        </ListItemText>
                    </ListItemButton> }
                    
                </ListItem>
            </List>
        </Box>
    );

    return (
        
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ paddingTop:'30px', paddingBottom:'30px', paddingLeft:'18px', bgcolor:'#ef9a9a' }}>

                    <img src={Logo} alt="logo" height='60' />
                    {/* <strong>SP Cabai.</strong> */}
                </Box>
                {DrawerList}
            </Drawer>
    );
}