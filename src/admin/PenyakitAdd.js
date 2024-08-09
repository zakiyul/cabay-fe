import SideBar from '../admin_components/SideBar';
import TopBar from '../admin_components/TopBar';
import FooterComp from '../admin_components/FooterComp';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PenyakitAdd = () => {
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
                                <h1 className="h3 mb-0 text-gray-800">Penyakit</h1>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="penyakit" className="form-label">
                                    Nama Penyakit
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="penyakit"
                                    placeholder="nama penyakit"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                    Keterangan
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows={3}
                                    defaultValue={""}
                                />
                            </div>

                            <Link to={'/dashboard/penyakit'} className="btn btn-success">
                                Tambah Penyakit
                            </Link>

                        </div>
                    </div>
                    <FooterComp/>
                </div>
            </div>
        </>
    )
}

export default PenyakitAdd;