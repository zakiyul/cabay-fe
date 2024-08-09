import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function BpTable({dataList, handleDelete}) {
    return (
        <>
            {/* DataTales Example */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Daftar Basis Pengetahuan</h6>
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
                                    <th scope="col">Kode Gejala</th>
                                    <th scope="col">Kode Penyakit</th>
                                    <th scope="col">Bobot</th>
                                    <th scope="col">Ubah</th>
                                    <th scope="col">Hapus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataList && dataList.map((i, index) => {
                                    return (

                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{i.kode_gejala}</td>
                                            <td>{i.kode_penyakit}</td>
                                            <td>{i.bobot}</td>
                                            <td>
                                                <Link to={`/dashboard/edit-bp/${i.id}`} className="btn btn-primary">
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