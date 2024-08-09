import SideBar from '../admin_components/SideBar';
import TopBar from '../admin_components/TopBar';
import FooterComp from '../admin_components/FooterComp';

import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../global/config';


const DashboardPage = () => {
    const [toggle, setToggle] = useState(true);
    const [penyakits, setPenyakits] = useState([]);
    const [gejalas, setGejalas] = useState([]);
    const [bps, setBps] = useState([]);
    const [riwayat, setRiwayat] = useState([])

    const getDatas = async _ => {
        const penyakit_res = await axios.get(`${config.BASE_URL}/api/penyakit`);
        const gejala_res = await axios.get(`${config.BASE_URL}/api/gejala`);
        const bp_res = await axios.get(`${config.BASE_URL}/api/basis-pengetahuan`);
        const riwyat_res = await axios.get(`${config.BASE_URL}/api/riwayat`);

        setPenyakits(penyakit_res.data);
        setGejalas(gejala_res.data);
        setBps(bp_res.data);
        setRiwayat(riwyat_res.data)
    }
    const handleToggle = _ => {
        setToggle(!toggle)
    }

    useEffect(() => {
        getDatas()
    },[])
    return (
        <>
            <div id="wrapper">
                <SideBar toggleBtn={toggle} />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopBar handleToggle={handleToggle} />
                        <div className="container-fluid">

                        {/* Page Heading */}
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                        </div>

                        <div className="row">
                                {/* Penyakit */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Gejala
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {gejalas && gejalas.length}
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-calendar fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Gejala */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Penyakit
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {penyakits && penyakits.length}
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-calendar fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Basis Pengetahuan */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-warning shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Basis Pengetahuan
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {bps && bps.length}
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-calendar fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Riwayat */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-danger shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                                        Riwayat
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {riwayat && riwayat.length}
                                                    </div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-calendar fa-2x text-gray-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        </div>
                    </div>
                    <FooterComp/>
                </div>
            </div>
        </>
    )
}

export default DashboardPage;