import React from 'react'

export default function Footer() {
    return (
        <React.Fragment>
            <div className="container-fluid mt-5">
                <footer className="footer pt-0">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-lg-6">
                            <div className="copyright text-center  text-lg-left  text-muted">
                                © 2021 <a href="https://www.creative-tim.com" className="font-weight-bold ml-1" target="_blank" rel="noreferrer" >Change Supply inc</a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                                <li className="nav-item">
                                    <a href="https://www.creative-tim.com/presentation" className="nav-link" target="_blank" rel="noreferrer" >About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a href="http://blog.creative-tim.com" className="nav-link" target="_blank" rel="noreferrer" >Blog</a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://www.creative-tim.com/license" className="nav-link" target="_blank" rel="noreferrer" >License</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </React.Fragment>
    )
}
