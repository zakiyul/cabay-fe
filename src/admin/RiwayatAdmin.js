import { useEffect, useState } from 'react';
import SideBar from '../admin_components/SideBar';
import TopBar from '../admin_components/TopBar';
import FooterComp from '../admin_components/FooterComp';

import DataTableComp from '../admin_components/RiwayatTable';

import axios from 'axios';
import config from '../global/config';
import Swal from 'sweetalert2';

const RiwayatAdmin = () => {
    const [gejalas, setGejalas] = useState([]);
    const [toggle, setToggle] = useState(true);

    const handleDelete = id => {
        Swal.fire({
            title: 'Hapus riwayat!',
            text: "Yakin ingin menghapus data?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hapus!'
          }).then((result) => {
            if (result.isConfirmed) {
              axios.delete(`${config.BASE_URL}/api/riwayat/${id}`)
              Swal.fire(
                'Terhapus!',
                'Sudah terhapus',
                'success'
              )
            }
          })
    }
    const getGejala = async _ => {
        const response = await axios.get(`${config.BASE_URL}/api/riwayat`);
        setGejalas(response.data)
    }
    const handleToggle = _ => {
        setToggle(!toggle)
    }

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

                            {/* Page Heading */}
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Riwayat</h1>
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

export default RiwayatAdmin;