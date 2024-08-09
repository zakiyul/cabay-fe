import { Link } from "react-router-dom";
import { FaEdit,FaTrash } from "react-icons/fa";

export default function DataTableComp({dataList, handleDelete}) {
    return (
        <>
            {/* DataTales Example */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Daftar Gejala</h6>
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
                                            <td>
                                                <Link to={`/dashboard/edit-gejala/${i.id}`} className="btn btn-primary">
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