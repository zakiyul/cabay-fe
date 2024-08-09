import React from 'react';
import AppbarComp from "../components/AppbarComp";
import LogoCabai  from '../assets/logo/sipar-cabai.png';
import DrawerComp from "../components/DrawerComp";
import BottomNavComp from '../components/BottomNavComp';

import { Box, Container, List, ListItem } from '@mui/material';
import Button  from '@mui/joy/Button';
import Typography  from '@mui/joy/Typography';
import AccordionGroup  from '@mui/joy/AccordionGroup';
import Accordion  from '@mui/joy/Accordion';
import AccordionDetail  from '@mui/joy/AccordionDetails';
import AccordionSummary  from '@mui/joy/AccordionSummary';
import { useNavigate } from 'react-router-dom';
import { ListItemDecorator } from '@mui/joy';

const penjelasan = [
  {
    id:1,
    nama:'Sistem Pakar',
    pengertian:'Sistem pakar adalah program komputer yang mencoba meniru kemampuan pengambilan keputusan seorang ahli dalam suatu bidang tertentu. Sistem ini biasanya digunakan untuk membantu menyelesaikan masalah yang kompleks atau memberikan rekomendasi berdasarkan pengetahuan yang telah diprogramkan ke dalam sistem.'
  },
  {
    id:2,
    nama:'Certainty Factor',
    pengertian:'Certainty Factor atau Faktor Kepastian adalah metode yang digunakan dalam sistem pakar untuk menangani ketidakpastian. Ketidakpastian ini muncul karena informasi yang tersedia mungkin tidak lengkap atau tidak sepenuhnya akurat. Certainty Factor memberikan cara untuk mengukur seberapa yakin kita terhadap suatu fakta atau keputusan.'
  },
  {
    id:3,
    nama:'Case Based Reasoning',
    pengertian:'Case-Based Reasoning (CBR) adalah metode yang digunakan untuk memecahkan masalah baru berdasarkan solusi dari masalah-masalah sebelumnya yang mirip. Idenya adalah bahwa pengalaman masa lalu dapat digunakan untuk menyelesaikan masalah saat ini.'
  },
]

const HomePage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      {/* APPBAR & DRAWER */}
      <AppbarComp toggleDrawer={toggleDrawer}/>
      <DrawerComp open={open} toggleDrawer={toggleDrawer} />

      <img src={LogoCabai} alt="logo cabai" style={{ maxWidth:'100%', height:'auto' }} />

      {/* CONTENT */}
      <Box sx={{ py:5, mb:12 }}>
        <Container>
          <Button size='lg' color='success' onClick={() => navigate('/diagnosa')}>Mulai Diagnosa</Button>
          <Box sx={{ mt:3 }}>
            <Typography level='h2' fontSize={'xl'} sx={{ mb: 0.5 }}>Sistem Pakar Tanaman Cabai</Typography>
            <Typography textAlign='justify'> Sistem pakar dalam pertanian memiliki potensi besar untuk meningkatkan efisiensi, produktivitas, dan keberlanjutan. Berikut adalah beberapa alasan mengapa sistem pakar dalam pertanian bisa sangat bermanfaat:</Typography>
            <List>
              <ListItem>
                <ListItemDecorator>🚀</ListItemDecorator> &nbsp; <Typography>Peningkatan Efisiensi dan Produktivitas</Typography>
              </ListItem>
              <ListItem>
                <ListItemDecorator>⚙️</ListItemDecorator> &nbsp; <Typography>Pengendalian Hama dan Penyakit</Typography> 
              </ListItem>
              <ListItem>
                <ListItemDecorator>👍</ListItemDecorator> &nbsp; <Typography>Pengambilan Keputusan yang Lebih Baik</Typography>
              </ListItem>
            </List>
          </Box>

          <Box sx={{ mt:3 }}>
            <AccordionGroup>
              {penjelasan.map(i => {
                return (
                  <Accordion key={i.id}>
                    <AccordionSummary>{i.nama}</AccordionSummary>
                    <AccordionDetail>
                      <Typography textAlign={'justify'}>
                        {i.pengertian}
                      </Typography>
                    </AccordionDetail>
                  </Accordion>
                )
              })}
            </AccordionGroup>
          </Box>
        </Container>
      </Box>

      {/* BOTTOM NAVBAR */}
      <BottomNavComp/>
    </>
  )
}

export default HomePage;