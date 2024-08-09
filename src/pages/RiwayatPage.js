import React, { useEffect, useState } from 'react';

import AppbarComp from "../components/AppbarComp";
import DrawerComp from "../components/DrawerComp";
import BottomNavComp from '../components/BottomNavComp';

import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import { Container } from '@mui/joy';
import axios from 'axios';
import CONFIG  from '../global/config';

const RiwayatPage = () => {
    const [riwayats, setRiwayat] = useState([]);
    const [open, setOpen] = React.useState(false);

    const getRiwayat = async _ => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/riwayat`);
        setRiwayat(res.data.reverse())
    }

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        getRiwayat()
    },[])
    return (
        <>
            {/* APPBAR & DRAWER */}
            <AppbarComp toggleDrawer={toggleDrawer} />
            <DrawerComp open={open} toggleDrawer={toggleDrawer} />
            <Box sx={{ width: 320, mt: 10 }}>
                <Container>

                    <Typography
                        id="ellipsis-list-demo"
                        level="body-xs"
                        textTransform="uppercase"
                        sx={{ letterSpacing: '0.15rem' }}
                    >
                        Riwayat Diagnosa
                    </Typography>
                    <List
                        aria-labelledby="ellipsis-list-demo"
                        sx={{ '--ListItemDecorator-size': '56px', mb:10 }}
                    >
                        {riwayats && riwayats.map(i => {
                            const hasil = JSON.parse(i.result);
                            const maxHasil = hasil[0].sort((a,b) => b.hasil - a.hasil);
                            return (

                                <ListItem key={i} sx={{ mb:1 }}>
                                    <ListItemDecorator>
                                        <Avatar src="/static/images/avatar/1.jpg" />
                                    </ListItemDecorator>
                                    <ListItemContent>
                                        {/* <Typography level="title-sm">{i.nama}</Typography> */}
                                        <Typography level="title-sm">{maxHasil[0].penyakit.nama}</Typography>
                                        <Typography level='body-sm'>{i.nama}</Typography>
                                        <Typography level="body-sm" noWrap>
                                            {i.tgl.slice(0,10)}
                                        </Typography>
                                    </ListItemContent>
                                    <hr/>
                                </ListItem>
                            )
                        })}
                    </List>
                </Container>

            </Box>
            <BottomNavComp />
        </>
    )
}

export default RiwayatPage;