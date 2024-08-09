import SideBar from '../admin_components/SideBar';
import TopBar from '../admin_components/TopBar';
import FooterComp from '../admin_components/FooterComp';
import BpTable from '../admin_components/BpTable';

import { useEffect, useState } from 'react';
import axios from 'axios';

import config from '../global/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

import {Modal} from 'react-bootstrap'
import Swal from 'sweetalert2';

const ModalComponent = ({showModal, handleClose, gejalas, penyakits, setBp}) => {
    const [addBp, setAddBp] = useState({});

    const handleChange = e => {
        const {value, name} = e.target;
        setAddBp({...addBp, [name]: value});
    }
    const handleSubmit = e => {
        e.preventDefault();
        // console.log(addGejala);
        axios.post(`${config.BASE_URL}/api/basis-pengetahuan/`, addBp)
         .then(res => {
            console.log(res);
            setBp([...gejalas, addBp])
            handleClose();
         })
         .catch(e => console.log(e))
    }
    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Data Basis Pengetahuan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="kode_penyakit" className="form-label">Penyakit</label>
                        <select className="form-select" aria-label="Default select example" name='kode_penyakit' onChange={handleChange}>
                            <option selected>Open this select menu</option>
                            {penyakits && penyakits.map(penyakit => {
                                return (
                                    <option value={penyakit.id}>{penyakit.nama}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="kode_gejala" className="form-label">Gejala</label>
                        <select className="form-select" aria-label="Default select example" name='kode_gejala' onChange={handleChange}>
                            <option selected>Open this select menu</option>
                            {gejalas && gejalas.map(gejala => {
                                return (
                                    <option value={gejala.id}>{gejala.nama}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Bobot</label>
                        <input onChange={handleChange} type="text" name="bobot" id="nama" className="form-control" />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-primary' onClick={handleSubmit}>
                    Tambah Gejala
                </button>
            </Modal.Footer>
        </Modal>
    )
}


const BasisPengAdmin = () => {
    const [bps, setBps] = useState([]);
    const [gejalas, setGejalas] = useState([]);
    const [penyakits, setPenyakits] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const handleShow = _ => setShowModal(true);
    const handleClose = _ => setShowModal(false);
    
    const getGejala = async _ => {
        const res = await axios.get(`${config.BASE_URL}/api/gejala`);
        setGejalas(res.data)
    }
    const getPenyakit = async _ => {
        const res = await axios.get(`${config.BASE_URL}/api/penyakit`);
        setPenyakits(res.data)
    }
    const getBps = async _ => {
        const res = await axios.get(`${config.BASE_URL}/api/basis-pengetahuan`);
        setBps(res.data)
    }
    const handleToggle = _ => {
        setToggle(!toggle)
    }
    const handleDelete = id => {
        Swal.fire({
            title: 'Hapus Basis Pengetahuan!',
            text: "Yakin ingin menghapus data?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hapus!'
          }).then((result) => {
            if (result.isConfirmed) {
              axios.delete(`${config.BASE_URL}/api/basis-pengetahuan/${id}`)
              Swal.fire(
                'Terhapus!',
                'Sudah terhapus',
                'success'
              )
            }
          })
    }

    useEffect(() => {
        getBps()
        getGejala()
        getPenyakit()
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
                                <h1 className="h3 mb-0 text-gray-800">Basis Pengetahuan</h1>
                                <button className="btn btn-primary mt-2" onClick={handleShow}>
                                    Tambah Basis Pengetahuan <FontAwesomeIcon icon={faPlusCircle} />
                                </button>
                                <ModalComponent showModal={showModal} handleClose={handleClose} gejalas={gejalas} penyakits={penyakits} />
                            </div>

                            <BpTable dataList={bps} handleDelete={handleDelete}  />

                        </div>
                    </div>
                    <FooterComp/>
                </div>
            </div>
        </>
    )
}

export default BasisPengAdmin;