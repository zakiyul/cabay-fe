import React, { useEffect, useState } from 'react';
import AppbarComp from "../components/AppbarComp";
import DrawerComp from "../components/DrawerComp";
import BottomNavComp from '../components/BottomNavComp';

import { Box, Container} from '@mui/material';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import CONFIG  from '../global/config';

const HalamanPenyakit = () => {
  const penyakitId = useParams()
  const [penyakit, setPenyakit] = useState()
  const [open, setOpen] = React.useState(false);

  const getPenyakit = async _ => {
    const res = await axios.get(`${CONFIG.BASE_URL}/api/penyakit/${penyakitId.penyakitId}`);
    console.log(res.data)
    setPenyakit(res.data)
}

const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
};
useEffect(() => {
    console.log(penyakitId)
    getPenyakit()
  },[])
  return (
    <>
      {/* APPBAR & DRAWER */}
      <AppbarComp toggleDrawer={toggleDrawer}/>
      <DrawerComp open={open} toggleDrawer={toggleDrawer} />

      <img src={`${CONFIG.BASE_URL}${penyakit && penyakit.gambar}`} alt="logo cabai" style={{ maxWidth:'100%', height:'auto', marginTop:40 }} />

      {/* CONTENT */}
      <Box sx={{ py:5, mb:12 }}>
        <Container>
            {penyakit && <>
                <strong>{penyakit && penyakit.nama}</strong>
                <p style={{ textAlign:'justify' }}>{penyakit.definisi}</p>
                <strong>Solusi:</strong>
                <p style={{ textAlign:'justify' }}>{penyakit.solusi}</p>
            </>}
        </Container>
      </Box>

      {/* BOTTOM NAVBAR */}
      <BottomNavComp/>
    </>
  )
}

export default HalamanPenyakit;