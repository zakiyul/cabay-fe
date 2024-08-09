import { useEffect, useState } from 'react';
import SideBar from '../admin_components/SideBar';
import TopBar from '../admin_components/TopBar';
import FooterComp from '../admin_components/FooterComp';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import DataTableComp from '../admin_components/DataTable';

import axios from 'axios';
import config from '../global/config';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ModalComponent = ({showModal, handleClose, gejalas, setGejala}) => {
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
            setGejala([...gejalas, addGejala])
            handleClose();
         })
         .catch(e => console.log(e))
    }
    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Data Gejala</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="nama" className="form-label">Nama Gejala</label>
                        <input onChange={handleChange} type="text" name="nama" id="nama" className="form-control" />
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

const GejalaAdmin = () => {
    const [gejalas, setGejalas] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = id => {
        Swal.fire({
            title: 'Hapus gejala!',
            text: "Yakin ingin menghapus data gejala?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hapus!'
          }).then((result) => {
            if (result.isConfirmed) {
              axios.delete(`${config.BASE_URL}/api/gejala/${id}`)
              Swal.fire(
                'Terhapus!',
                'Sudah terhapus',
                'success'
              )
            }
          })
    }
    const getGejala = async _ => {
        const response = await axios.get(`${config.BASE_URL}/api/gejala`);
        setGejalas(response.data)
    }
    const handleToggle = _ => {
        setToggle(!toggle)
    }
    const handleShow = _ => setShowModal(true);
    const handleClose = _ => setShowModal(false);

    useEffect(() => {
        getGejala()
    },[])
    return (
        <>
            <div id="wrapper">
                <SideBar toggleBtn={toggle} />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopBar handleToggle={handleToggle}/>
                        <div className="container-fluid">

                            <ModalComponent showModal={showModal} handleClose={handleClose} gejalas={gejalas} setGejala={setGejalas} />

                            {/* Page Heading */}
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Gejala</h1>
                                <button onClick={handleShow} className="btn btn-primary mt-2">
                                    Tambah Gejala <FontAwesomeIcon icon={faPlusCircle} />
                                </button>
                            </div>

                            <DataTableComp dataList={gejalas} handleDelete={handleDelete} />
                        </div>
                    </div>
                    <FooterComp/>
                </div>
            </div>
        </>
    )
}

export default GejalaAdmin;