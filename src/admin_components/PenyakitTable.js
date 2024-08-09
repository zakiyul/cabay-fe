import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function PenyakitTable({dataList, handleDelete}) {
    return (
        <>
            {/* DataTales Example */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Daftar Penyakit</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table
                            className="table table-bordered"
                            cellSpacing={0}
                        >
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Kode</th>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Pengertian</th>
                                    <th scope="col">Solusi</th>
                                    <th scope="col">Gambar</th>
                                    <th scope="col">Ubah</th>
                                    <th scope="col">Hapus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataList && dataList.map((i, index) => {
                                    return (

                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>C-{i.id}</td>
                                            <td>{i.nama}</td>
                                            {/* <td>{i.definisi.slice(3)}</td>
                                            <td>{i.solusi.slice(3)}</td> */}
                                            <td>definisi</td>
                                            <td>solusi</td>
                                            <td>
                                                <img className="img-fluid" src="https://images.tokopedia.net/img/cache/700/product-1/2020/6/7/8389043/8389043_68f1b346-95f3-497e-b198-79437ca1c8d7_700_700.jpg" alt="cabai" />
                                            </td>
                                            <td>
                                                <Link to={`/dashboard/edit-penyakit/${i.id}`} className="btn btn-primary">
                                                    <FaEdit />
                                                </Link>
                                            </td>
                                            <td>
                                                <button onClick={() => handleDelete(i.id)} className="btn btn-danger">
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}