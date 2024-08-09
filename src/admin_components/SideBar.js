import { Link, useNavigate } from "react-router-dom";
import { FaClipboardList, FaPepperHot, FaUserDoctor, FaClock } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { BiLogoYelp } from "react-icons/bi";

const SideBar = ({toggleBtn}) => {
    const navigate = useNavigate();
    const handleLogout = _ => {
        localStorage.setItem('login', '0');
        navigate('/login')
    }
    return (
        <ul
            className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${toggleBtn ? 'toggled':''}`}
            id="accordionSidebar"
        >
            {/* Sidebar - Brand */}
            <Link
                className="sidebar-brand d-flex align-items-center justify-content-center"
                to={'/'}
            >
                <div className="sidebar-brand-icon rotate-n-15">
                    <BiLogoYelp size={40} />
                </div>
                <div className="sidebar-brand-text mx-3">
                    SB Admin <sup>2</sup>
                </div>
            </Link>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item active">
                <Link className="nav-link" to={'/dashboard'}>
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Dashboard</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={'/dashboard/gejala'}>
                    <FaClipboardList/>
                    <span>Gejala</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={'/dashboard/penyakit'}>
                    <FaPepperHot />
                    <span>Penyakit</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={'/dashboard/basis-pengetahuan'}>
                    <FaUserDoctor />
                    <span>Basis Pengetahuan</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={'/dashboard/riwayat'}>
                    <FaClock />
                    <span>Riwayat</span>
                </Link>
            </li>
            <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>
                    <TbLogout2 />
                    <span>Logout</span>
                </button>
            </li>
        </ul>
    )
}

export default SideBar;