import React from 'react';
import AppbarComp from '../components/AppbarComp';
import DrawerComp from '../components/DrawerComp';
import BottomNavComp from '../components/BottomNavComp';
import { Box, Container, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Table from '@mui/joy/Table';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { Card, Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
CustomTabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.number.isRequired,
value: PropTypes.number.isRequired,
};

function a11yProps(index) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}

const HasilPage = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [hasilCf, setHasilCf] = React.useState([]);
    const [hasilCbr, setHasilCbr] = React.useState([]);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
        console.log(open)
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    const getResult = () => {
        setHasilCf(JSON.parse(localStorage.getItem('hasil_cf')));
        setHasilCbr(JSON.parse(localStorage.getItem('hasil_cbr')));
    }

    React.useEffect(() => {
        getResult();
    },[])
    return (
        <>
            <AppbarComp toggleDrawer={toggleDrawer}/>
            <DrawerComp open={open} toggleDrawer={toggleDrawer} />
            <Box sx={{ marginTop:10 }}>
                <Container>
                    <h5>Hasil Diagnosa</h5>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="CBR" {...a11yProps(0)} />
                        <Tab label="CF" {...a11yProps(1)} />
                    </Tabs>
                    <CustomTabPanel value={value} index={0}>
                        <Card color='neutral' variant='soft'>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nama</TableCell>
                                        <TableCell>Persentasi</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {hasilCbr && hasilCbr.sort((a,b) => b.hasil - a.hasil).map(cbr => {
                                        if (cbr.hasil !== 0) {
                                            // return (<li>{cbr.penyakit.nama} = {cbr.hasil} %</li>)
                                            return (
                                                <TableRow>
                                                    <TableCell>{cbr.penyakit.nama}</TableCell>
                                                    <TableCell>{cbr.hasil}%</TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => navigate(`/penyakit/${cbr.penyakit.id}`)}>Cek!</Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </Card>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Card color='neutral' variant='soft'>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nama</TableCell>
                                        <TableCell>Persentasi</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {hasilCf && hasilCf.sort((a,b) => b.hasil - a.hasil).map(cbr => {
                                        if (cbr.hasil !== 0) {
                                            // return (<li>{cbr.penyakit.nama} = {cbr.hasil} %</li>)
                                            return (
                                                <TableRow>
                                                    <TableCell>{cbr.penyakit.nama}</TableCell>
                                                    <TableCell>{cbr.hasil}%</TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => navigate(`/penyakit/${cbr.id}`)}>Cek!</Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </Card>
                    </CustomTabPanel>
                </Container>
            </Box>
            <BottomNavComp/>
        </>
    )
}

export default HasilPage;