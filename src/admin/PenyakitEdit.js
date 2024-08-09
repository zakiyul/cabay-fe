import SideBar from '../admin_components/SideBar';
import TopBar from '../admin_components/TopBar';
import FooterComp from '../admin_components/FooterComp';

import axios from 'axios';
import config from '../global/config';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { IoMdArrowRoundBack } from "react-icons/io";


const PenyakitEdit = () => {
    const { penyakitId } = useParams();
    const [penyakit, setPenyakit] = useState([]);
    const [toggle, setToggle] = useState(true);
    const getPenyakit = async _ => {
        const response = await axios.get(`${config.BASE_URL}/api/penyakit/${penyakitId}`);
        console.log(penyakit)
        setPenyakit(response.data)
    }
    const handleToggle = _ => {
        setToggle(!toggle)
    }

    useEffect(() => {
        getPenyakit()
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
                                <h1 className="h3 mb-0 text-gray-800">Edit Penyakit</h1>
                            </div>
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <Link to={'/dashboard/penyakit'}>
                                        <IoMdArrowRoundBack />
                                    </Link>
                                </div>
                                <div className="card-body">

                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="nama" className="form-label">Nama</label>
                                            <input value={penyakit && penyakit.nama} type="text" name="nama" id="nama" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="gambar" className="form-label">Gambar</label>
                                            <input type="file" name="gambar" id="gambar" className="form-control" />
                                        </div>
                                        <div className="mb-3 form-floating">
                                            <textarea style={{ height: '100px' }} name="pengertian" id="pengertian" className="form-control">
                                                {penyakit && penyakit.definisi}
                                            </textarea>
                                            <label htmlFor="pengertian">Pengertaian Penyakit</label>
                                        </div>
                                        <div className="mb-3 form-floating">
                                            <textarea style={{ height: '100px' }} name="solusi" id="solusi" className="form-control">
                                                {penyakit && penyakit.solusi}
                                            </textarea>
                                            <label htmlFor="solusi">Pengertaian Solusi</label>
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

export default PenyakitEdit;