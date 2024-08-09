import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import DiagnosaPage from "./pages/DiagnosaPage";
import ListdataPage from './pages/ListdataPage';
import PengaturanPage from './pages/PengaturanPage';
import RiwayatPage from "./pages/RiwayatPage";
import HasilPage from "./pages/HasilPage";
import HalamanPenyakit from "./pages/HalamanPenyakit";
import LoginPage from "./pages/LoginPage";

import DashboardPage from './admin/Dashboard';
import PenyakitAdmin  from './admin/PenyakitAdmin';
import GejalaAdmin from './admin/GejalaAdmin';
import BasisPengAdmin  from './admin/BasisPengAdmin';
import RiwayatAdmin from "./admin/RiwayatAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/diagnosa" element={<DiagnosaPage/>} />
        <Route path="/hasil" element={<HasilPage/>} />
        <Route path="/data-list" element={<ListdataPage/>} />
        <Route path="/pengaturan" element={<PengaturanPage/>} />
        <Route path="/riwayat" element={<RiwayatPage/>} />
        <Route path="/penyakit/:penyakitId" element={<HalamanPenyakit/>} />
        <Route path="/login" element={<LoginPage/>} />


        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/dashboard/penyakit" element={<PenyakitAdmin/>} />
        <Route path="/dashboard/gejala" element={<GejalaAdmin/>} />
        <Route path="/dashboard/basis-pengetahuan" element={<BasisPengAdmin/>} />
        <Route path="/dashboard/riwayat" element={<RiwayatAdmin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
