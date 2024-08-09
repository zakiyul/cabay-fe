import SideBar from '../admin_components/SideBar';
import TopBar from '../admin_components/TopBar';
import FooterComp from '../admin_components/FooterComp';

import axios from 'axios';
import config from '../global/config';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { IoMdArrowRoundBack } from "react-icons/io";


const GejalaEdit = () => {
    const { gejalaId } = useParams();
    const [gejala, setGejala] = useState([]);
    const [toggle, setToggle] = useState(true);
    const getGejala = async _ => {
        const response = await axios.get(`${config.BASE_URL}/api/gejala/${gejalaId}`);
        setGejala(response.data)
    }
    const handleToggle = _ => {
        setToggle(!toggle)
    }

    useEffect(() => {
        getGejala()
    }, [])
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
                                <h1 className="h3 mb-0 text-gray-800">Edit Gejala</h1>
                            </div>
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <Link to={'/dashboard/gejala'}>
                                        <IoMdArrowRoundBack />
                                    </Link>
                                </div>
                                <div className="card-body">

                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="nama" className="form-label">Nama</label>
                                            <input value={gejala && gejala.nama} type="text" name="nama" id="nama" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <button className="btn btn-warning">Update!</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterComp />
                </div>
            </div>
        </>
    )
}

export default GejalaEdit;