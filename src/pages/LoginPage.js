import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPage(){
    const navigate = useNavigate()
    const [userData, setUserData] = useState();
    const handleChange = e => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value})
    }
    const handleHome = _ => {
        navigate('/')
    }
    const handleSubmit = e => {
        e.preventDefault();
        if(userData.username === 'admin' && userData.password === 'admin'){
            localStorage.setItem('login', '1')
            navigate('/dashboard')
        }else{
            Swal.fire({
                icon: "error",
                title: "Salah",
                text: "Username atau password salah"
            })
        }
    }

    useEffect(() =>{
        if(localStorage.getItem('login') === '1'){
            navigate('/dashboard')
        }
    },[])
    return (
        <div className="">
            <div className="container ">
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5 bg-gradient-primary">
                            <div className="card-body p-0">
                                {/* Nested Row within Card Body */}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Login</h1>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-user"
                                                        id="exampleInputEmail"
                                                        name="username"
                                                        onChange={handleChange}
                                                        aria-describedby="emailHelp"
                                                        placeholder="Username"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        id="exampleInputPassword"
                                                        placeholder="Password"
                                                        name="password"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                {/* <Link
                                                    to={'/dashboard'}
                                                    className="btn btn-primary btn-user btn-block"
                                                >
                                                    Login
                                                </Link> */}
                                                <button onClick={handleSubmit} className="btn btn-primary btn-user btn-block">
                                                    Login
                                                </button>
                                                <button onClick={handleHome} className="btn btn-light btn-user btn-block">
                                                    Homepage
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}