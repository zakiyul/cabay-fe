import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import VaccinesRoundedIcon from '@mui/icons-material/VaccinesRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useNavigate } from "react-router-dom";

export default function BottomNavComp(){
    const navigate = useNavigate();
    return(
        <Box sx={{ pb:1 }}>
            <BottomNavigation showLabels style={{ position: 'fixed', bottom: 0, width: '100%', paddingBottom:'25px'}}>
                <BottomNavigationAction onClick={() => navigate('/')} label="Home" icon={<HomeRoundedIcon/>} />
                <BottomNavigationAction onClick={() => navigate('/diagnosa')} label="Diagnosa" icon={<VaccinesRoundedIcon/>} />
                <BottomNavigationAction onClick={() => navigate('/riwayat')} label="Riwayat" icon={<FactCheckRoundedIcon/>} />
                <BottomNavigationAction onClick={() => navigate('/pengaturan')} label="Tentang" icon={<InfoRoundedIcon/>} />
            </BottomNavigation>
        </Box>
    )
}