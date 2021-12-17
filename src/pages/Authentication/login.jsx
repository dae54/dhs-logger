import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

export default function Login({ setAccountStatus }) {
    const { signIn } = useAuth()
    let dssd = 'danieel'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function login(e) {
        e.preventDefault()
        setError('')
        setLoading(true)
        await signIn(email, password).then(response => {
            console.log(response)
        }).catch(error => {
            if (error.message === 'Network Error') {
                return setError(error.message)
            }
            setLoading(false)
            return setError(error.message)
        })
    }

    return (
        <section className='bg-gradient-green' style={{ height: '100vh' }} >
            <div className="main-content">
                <div className="header bg-gradient-green py-7 py-lg-8 pt-lg-9">
                    <div className="container">
                        <div className="header-body text-center mb-7">
                            <div className="row justify-content-center">
                                <div className="col-xl-5 col-lg-6 col-md-8 px-5">
                                    <h3 className="text-white text-dark">Welcome to DHS-LOGGER!</h3>
                                    <h1 className="text-white text-dark">Login Page. Dont miss it out</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt--8 pb-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-7">
                            <div className="card bg-secondary border-0 mb-0">
                                <div className="card-body px-lg-5 py-lg-5">
                                    <form onSubmit={login}>
                                        <div className="form-group mb-3">
                                            <div className="input-group input-group-merge input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                                                </div>
                                                <input className="form-control" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-merge input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                                </div>
                                                <input className="form-control" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn text-dark bg-brown-1 my-4">
                                                {loading &&
                                                    <div className="spinner-border spinner-border-sm"></div>
                                                }
                                                &nbsp; Log in
                                            </button>
                                        </div>
                                    </form>
                                    {error &&
                                        <div className="alert alert-warning" role="alert">
                                            {error}
                                        </div>
                                    }
                                    <div className="row mt-3">
                                        <div className="col">
                                            <Link to='#' className="text-" ><small>Forgot password</small></Link>
                                            {/* onClick={() => setAccountStatus('forgotPassword')} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
