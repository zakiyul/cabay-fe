import React from 'react';
import { Box } from "@mui/material";
import AppbarComp from "../components/AppbarComp";
import BottomNavComp from "../components/BottomNavComp";
import DrawerComp from "../components/DrawerComp";

const PengaturanPage = _ => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = newOpen => () => {
        setOpen(newOpen)
    };

    return (
        <>
            <AppbarComp toggleDrawer={toggleDrawer}/>
            <DrawerComp open={open} toggleDrawer={toggleDrawer}/>

            <Box>
                <p>Ini halaman pengaturan</p>
            </Box>

            <BottomNavComp/>
        </>
    )
}

export default PengaturanPage;