import React from 'react';
import PropTypes from 'prop-types';
import AppbarComp from '../components/AppbarComp';
import DrawerComp from '../components/DrawerComp';
import { Box, Tabs, Tab, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import BottomNavComp from '../components/BottomNavComp';
import axios from 'axios';
import CONFIG  from '../global/config';

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
  

const ListdataPage = _ => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [listGejala, setListGejala] = React.useState([]);
    const [listPenyakit, setListPenyakit] = React.useState([]);
    const [rules, setRules] = React.useState([]);

    const getDataGejala = async () => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/gejala/`);
        setListGejala(res.data)
    }
    const getDataPenyakit = async () => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/penyakit/`);
        setListPenyakit(res.data);
    }
    const getRules = async () => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/basis-pengetahuan`);
        setRules(res.data)
    }
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const TableComponent = () => {
        return (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nama Gejala</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listGejala.map((row,index) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                {row.nama}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        )
    }
    const TableComponentPenyakit = _ => {
        return (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350, }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nama Penyakit</TableCell>
                        <TableCell>Pengertian Penyakit</TableCell>
                        <TableCell>Solusi Penyakit</TableCell>
                        <TableCell>Gambar Penyakit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listPenyakit.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.nama}</TableCell>
                            <TableCell>{row.definisi.slice(0, 100)}</TableCell>
                            <TableCell>{row.solusi.slice(0,100)}</TableCell>
                            <TableCell>
                                <img src={`${CONFIG.BASE_URL}${row.gambar}`} alt={row.nama} style={{ maxWidth:'100px' }} />
                            </TableCell>
    
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        )
    }
    const TableComponentRules = _ => {
        return (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Kode Gejala</TableCell>
                        <TableCell>Kode Penyakit</TableCell>
                        <TableCell>Bobot</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rules.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.id}</TableCell>
                            <TableCell>
                                {row.kode_gejala}
                            </TableCell>
                            <TableCell>
                                {row.kode_penyakit}
                            </TableCell>
                            <TableCell>
                                {row.bobot}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        )
    }

    React.useEffect(() => {
        getDataGejala();
        getDataPenyakit();
        getRules();
    },[])

    return (
        <>
            <AppbarComp toggleDrawer={toggleDrawer} />
            <DrawerComp open={open} toggleDrawer={toggleDrawer} />
            <Box>
                <Container sx={{ mt: 10 }}>
                    <Box>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Gejala" {...a11yProps(0)} />
                            <Tab label="Penyakit" {...a11yProps(1)} />
                            <Tab label="Rules" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <TableComponent/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <TableComponentPenyakit/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <TableComponentRules/>
                    </CustomTabPanel>
                    {/* <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert (100g serving)</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> */}
                </Container>
            </Box>
            <BottomNavComp />
        </>
    )
}

export default ListdataPage;