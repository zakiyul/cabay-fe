import SideBar from '../admin_components/SideBar';
import TopBar from '../admin_components/TopBar';
import FooterComp from '../admin_components/FooterComp';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import PenyakitTable from '../admin_components/PenyakitTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../global/config'
import { Modal } from 'react-bootstrap';

const ModalComponent = ({showModal, handleClose, penyakits, setPenyakits}) => {
    const [addGejala, setAddGejala] = useState({});

    const handleChange = e => {
        const {value, name} = e.target;
        setAddGejala({...addGejala, [name]: value});
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(addGejala);
        axios.post(`${config.BASE_URL}/api/gejala/`, addGejala)
         .then(res => {
            console.log(res);
            setPenyakits([...penyakits, addGejala])
            handleClose();
         })
         .catch(e => console.log(e))
    }
    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Data Penyakit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Nama Penyakit</label>
                        <input onChange={handleChange} type="text" name="nama" id="nama" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gambar" className="form-label">Gambar Penyakit</label>
                        <input type="file" name="gambar" id="gambar" className="form-control" />
                    </div>
                    <div className="mb-3 form-floating">
                        <textarea style={{ height:'100px' }} name="pengertian" id="pengertian" className="form-control"></textarea>
                        <label htmlFor="pengertian">Pengertaian Penyakit</label>
                    </div>
                    <div className="mb-3 form-floating">
                        <textarea style={{ height:'100px' }} name="solusi" id="solusi" className="form-control"></textarea>
                        <label htmlFor="solusi">Pengertaian Solusi</label>
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

const PenyakitAdmin = () => {
    const [penyakits, setPenyakits] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const getPenyakit = async _ => {
        const response = await axios.get(`${config.BASE_URL}/api/penyakit`);
        setPenyakits(response.data)
    }
    const handleDelete = _ => {
        console.log('delete')
    }
    const handleToggle = _ => {
        setToggle(!toggle)
    }
    const handleShow = _ => setShowModal(true);
    const handleClose = _ => setShowModal(false);

    useEffect(() => {
        getPenyakit()
    },[])
    return (
        <>
            <div id="wrapper">
                <SideBar toggleBtn={toggle} />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopBar handleToggle={handleToggle}/>
                        <div className="container-fluid">

                            <ModalComponent penyakits={penyakits} handleClose={handleClose} setPenyakits={setPenyakits} showModal={showModal} />

                            {/* Page Heading */}
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Penyakit</h1>
                                <button onClick={handleShow} className="btn btn-primary mt-2">
                                    Tambah Penyakit <FontAwesomeIcon icon={faPlusCircle} />
                                </button>
                            </div>

                            <PenyakitTable dataList={penyakits} handleDelete={handleDelete}/>

                        </div>
                    </div>
                    <FooterComp/>
                </div>
            </div>
        </>
    )
}

export default PenyakitAdmin;