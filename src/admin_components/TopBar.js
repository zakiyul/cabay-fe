import { Link } from "react-router-dom";

const TopBar = ({handleToggle}) => {
    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Sidebar Toggle (Topbar) */}
                <button
                    id="sidebarToggleTop"
                    className="btn btn-link d-md-none rounded-circle mr-3"
                    onClick={handleToggle}
                >
                    <i className="fa fa-bars" />
                </button>
                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                    <div className="topbar-divider d-none d-sm-block" />
                    {/* Nav Item - User Information */}
                    <li className="nav-item dropdown no-arrow">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="userDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <strong className="mr-2 d-none d-lg-inline text-gray-600 small">
                                <Link to='/'>
                                    Logout
                                </Link>
                            </strong>
                        </a>
                    </li>
                </ul>

            </nav>
        </>
    )
}

export default TopBar;