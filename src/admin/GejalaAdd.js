import {useState} from 'react';

import SideBar from '../admin_components/SideBar';
import TopBar from '../admin_components/TopBar';
import FooterComp from '../admin_components/FooterComp';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../global/config';

const GejalaAdd = () => {
    const navigate = useNavigate()
    const [gejala, setGejala] = useState({});
    const handleChange = e => {
        const {name, value} = e.target;
        setGejala({...gejala, [name]:value})
    }
    const handleSubmit = e => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${config.BASE_URL}/api/gejala/`,
            headers: {},
            data: gejala,
        })
         .then(res => {
            console.log(res.data);
            navigate('/dashboard/gejala')
         })
         .catch(e => {
            console.log(e)
         })
    }
    return (
        <>
            <div id="wrapper">
                <SideBar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopBar/>
                        <div className="container-fluid">

                            {/* Page Heading */}
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Gejala</h1>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="penyakit" className="form-label">
                                    Nama Gejala
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="penyakit"
                                    placeholder="nama penyakit"
                                    name='nama'
                                    onChange={handleChange}
                                />
                            </div>

                            <button onClick={handleSubmit} className="btn btn-success">
                                Tambah Penyakit
                            </button>

                        </div>
                    </div>
                    <FooterComp/>
                </div>
            </div>
        </>
    )
}

export default GejalaAdd;