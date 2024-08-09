import { useEffect, useState } from "react";
import AppbarComp from "../components/AppbarComp";
import DrawerComp from "../components/DrawerComp";
import BottomNavComp from "../components/BottomNavComp";
import { Card, Container, FormLabel, Input, } from "@mui/joy";
import {MenuItem, Select} from '@mui/material'
import { FormControl, InputLabel, Stack, Typography } from '@mui/material'
import { Box, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Swal  from 'sweetalert2';

import '../assets/style.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CONFIG  from '../global/config';

const rumusCBR = (penyakits, basisPengetahuan, realData) => {
    const result = [];
    for (let idx_penyakit = 0; idx_penyakit < penyakits.length; idx_penyakit++) {

        let w = []
        let s = 0

        for (let idx_bp = 0; idx_bp < basisPengetahuan.length; idx_bp++) {
            if(basisPengetahuan[idx_bp].kode_penyakit === penyakits[idx_penyakit].id){
                w.push(basisPengetahuan[idx_bp].bobot)
            }
        }

        for (let idx_kb = 0; idx_kb < realData.length; idx_kb++) {
            for (let idx_bp = 0; idx_bp < basisPengetahuan.length; idx_bp++) {
                if(basisPengetahuan[idx_bp].kode_penyakit === penyakits[idx_penyakit].id){
                    if(realData[idx_kb] === basisPengetahuan[idx_bp].kode_gejala){
                        const hitung = 1 * basisPengetahuan[idx_bp].bobot;
                        s = s + hitung
                    }
                }
            }
        }
        const w_sumed = w.reduce((acc, crrt) => acc + crrt)

        result.push({penyakit: penyakits[idx_penyakit], hasil: Math.round((s/w_sumed) * 100)})
    }

    return result;
}
function hitungCf(gejalas) {
    if(gejalas.length > 1){
        const a = gejalas[0].pakar * gejalas[0].user;
        const b = gejalas[1].pakar * gejalas[1].user;

        const cf_combine = a + (b * (1 - a));
        let cf_old = cf_combine;
        for (let i = 2; i < gejalas.length; i++) {
            const kali_user = gejalas[i].pakar * gejalas[i].user;
            const cf_combine2 = cf_old + (kali_user * (1 - cf_old));
            cf_old = cf_combine2
        }

        return cf_old;
    } else if(gejalas.length === 1) {
        const hasil = gejalas[0].pakar *gejalas[0].user;
        return hasil;
    } else {
        return 0;
    }
}
function rumusCf(penyakits, basisPengetahuan, kasusBaru) {
    const resultCF = [];
    for (let i = 0; i < penyakits.length; i++) {
        const current_penyakit = [];
        const hitung_gejala = []
        const gejala_counted = []

        for (let j = 0; j < basisPengetahuan.length; j++) {
            if (penyakits[i].id === basisPengetahuan[j].kode_penyakit) {
                current_penyakit.push(basisPengetahuan[j]);
            }
        }
        const sisa_bp = basisPengetahuan.length - current_penyakit.length;
        for (let s = 0; s < sisa_bp; s++) {
            current_penyakit.push({ kode_gejala: 0, kode_penyakit: penyakits[i].id, bobot: 0 })
        }
        

        for (let cp = 0; cp < current_penyakit.length; cp++) {
            for (let gfu = 0; gfu < kasusBaru.length; gfu++) {
                if (current_penyakit[cp].kode_gejala === kasusBaru[gfu].id_gejala) {
                    // console.log({...current_penyakit[cp],user:Number(kasusBaru[gfu].nilai)})
                    // gejala_counted.push(current_penyakit[cp])
                    gejala_counted.push({...current_penyakit[cp],user:Number(kasusBaru[gfu].nilai)})
                }
            }
        }

        for (let gc = 0; gc < gejala_counted.length; gc++) {
            hitung_gejala.push({ pakar: gejala_counted[gc].bobot, user: gejala_counted[gc].user });
        }
        // hitung_gejala.push(0)
        // console.log({penyakit: penyakits[i], hasil: Math.round(hitungCf(hitung_gejala)*100)})
        resultCF.push({ penyakit: penyakits[i], hasil: Math.round(hitungCf(hitung_gejala) * 100) })
    }
    return resultCF;
}
const DiagnosaPage = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const [namaUser, setNamaUser] = useState();

    const [listGejala, setListGejala] = useState([]);
    const [listPenyakit, setListPenyakit] = useState([]);
    const [listBp, setListBp] = useState([]);

    const getDataGejala = async () => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/gejala/`);
        setListGejala(res.data)
    };
    const getDataPenyakit = async () => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/penyakit/`);
        setListPenyakit(res.data)
    };
    const getDataBp = async () => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/basis-pengetahuan/`);
        setListBp(res.data)
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const handleChange = e => {
        const { value } = e.target;
        setNamaUser(value)
    }
    const handleSelect = (e) => {
        setSelected([...selected, { id_gejala: e.target.name, nilai: e.target.value }]);
    }
    const handleSubmit = e => {
        e.preventDefault();
        if(namaUser === undefined){
            Swal.fire({
                title: "Isi Nama!",
                text: "Silahkan isi nama terlebih dahulu",
                icon: "info"
              });
        }else{
            localStorage.removeItem('hasil_cbr');
            localStorage.removeItem('hasil_cf');
    
            const getIdGejala = selected.map(i => Number(i.id_gejala));
            const removeData = getIdGejala.reduce((acc,crrnt) => {
                acc[crrnt] = (acc[crrnt] || 0) + 1;
                return acc;
            },{})
            const duplicateData = Object.entries(removeData)
                .filter(([key, value]) => value > 1)
                .map(([key]) => Number(key));
    
            const realData = getIdGejala.filter(kb => {
                return !duplicateData.includes(kb)
            })
            const resultCBR = rumusCBR(listPenyakit, listBp, realData);
            const resultCF  = rumusCf(listPenyakit,listBp,selected);
    
            localStorage.setItem('hasil_cbr',JSON.stringify(resultCBR));
            localStorage.setItem('hasil_cf', JSON.stringify(resultCF));
            var date = new Date();  
            const data = { nama: namaUser, tgl: date.toISOString(), result:`[${JSON.stringify(resultCBR)}, ${JSON.stringify(resultCF)}]`};
    
            axios.post(`${CONFIG.BASE_URL}/api/riwayat/`, data)
             .then(res => console.log(res.data))
             .catch(e => console.log(e))
            
            navigate('/hasil');
        }
    }

    useEffect(() => {
        getDataGejala();
        getDataPenyakit();
        getDataBp();
    }, [])

    return (
        <>
            <AppbarComp toggleDrawer={toggleDrawer} />
            <DrawerComp open={open} toggleDrawer={toggleDrawer} />

            <Box>
                <Container sx={{ mt: 10 }}>
                    <Typography variant="h6" gutterBottom>
                        Silahkan pilih gejala
                    </Typography>

                    <Card color="neutral" variant="soft">
                        <FormLabel>Nama</FormLabel>
                        <Input placeholder="masukan nama" onChange={handleChange} />
                    </Card>

                    <Box display={'grid'} gap={1} sx={{ mt: 2, mb: 20 }}>
                        {listGejala && listGejala.map(i => {
                            return (
                                // <CustomCheckbox title={`Lorem ipsum dolor sit amet ${i}`} handleChange={handleChange} value={`nilai ${i}`} />
                                <Card sx={{ pb: 2 }} key={i.id}>
                                    <Stack spacing={{ xs: 1, sm: 2 }} justifyContent={'space-between'} alignItems={'center'} direction='row' useFlexGap flexWrap='wrap'>
                                        <Box sx={{ maxWidth: '210px' }}>
                                            <label>{i.nama}</label>
                                        </Box>
                                            {/* <Select
                                                placeholder="Pilih"
                                                name='mySelect'
                                                onChange={handleSelect}
                                                indicator={<KeyboardArrowDown />}
                                                sx={{
                                                    [`& .${selectClasses.indicator}`]: {
                                                        transition: '0.2s',
                                                        [`&.${selectClasses.expanded}`]: {
                                                            transform: 'rotate(-180deg)',
                                                        },
                                                    },
                                                }}
                                            >
                                                <Option value={'0.2'}>Tidak Yakin</Option>
                                                <Option value={'0.4'}>Mungkin</Option>
                                                <Option value={'0.6'}>Kemungkinana Besar</Option>
                                                <Option value={'0.8'}>Hampir Pasti</Option>
                                                <Option value={'1'}>Pasti</Option>
                                            </Select> */}
                                            <FormControl>
                                                <InputLabel></InputLabel>
                                                <Select name={i.id} onChange={handleSelect} defaultValue={'0'}>
                                                    <MenuItem value={'0.2'}>Tidak Yakin</MenuItem>
                                                    <MenuItem value={'0.4'}>Mungin</MenuItem>
                                                    <MenuItem value={'0.6'}>Kemungkinan Besar</MenuItem>
                                                    <MenuItem value={'0.8'}>Hampir Pasti</MenuItem>
                                                    <MenuItem value={'1.0'}>Pasti</MenuItem>
                                                </Select>
                                            </FormControl>
                                    </Stack>
                                </Card>
                            )
                        })}
                    </Box>
                </Container>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab color="primary" aria-label="add" onClick={handleSubmit} sx={{
                        position: 'fixed',
                        bottom: theme => theme.spacing(13),
                        right: theme => theme.spacing(2)
                    }}>
                        <AddIcon />
                    </Fab>
                </Box>
            </Box>

            <BottomNavComp />
        </>
    )
}

export default DiagnosaPage;