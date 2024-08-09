
import { FaTrash } from "react-icons/fa";

export default function RiwayatTable({dataList, handleDelete}) {
    return (
        <>
            {/* DataTales Example */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Daftar Riwayat</h6>
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
                                    <th scope="col">Nama</th>
                                    <th scope="col">Penyakit</th>
                                    <th scope="col">Tanggal</th>
                                    <th scope="col">Hapus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataList && dataList.map((i, index) => {
                                    const hasil = JSON.parse(i.result);
                                    const maxHasil = hasil[0].sort((a,b) => b.hasil - a.hasil);
                                    return (

                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{i.nama}</td>
                                            <td>{maxHasil[0].penyakit.nama}</td>
                                            <td>
                                                {i.tgl.slice(0,10)}
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