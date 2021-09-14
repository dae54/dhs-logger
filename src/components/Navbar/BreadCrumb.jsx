import React from 'react'
import { useHistory } from 'react-router-dom'

export default function BreadCrumb() {
    const hist = useHistory()
    // const [comps, setComps] = useState({})
    // console.log(hist.location.pathname)

    // const me ={
    //     currentPage:'Dashboard'
    // }
    function handleNavigation(path) {
        hist.push('')
        hist.push(path)
    }
    const paths = hist.location.pathname.split('/')
    return (
        <React.Fragment>
            <div className="navbar-search navbar-search-light form-inline mr-sm-3 mb--4" id="navbar-search-main">
                <div className="col">
                    {/* <h6 className="h2 text-white d-none d-md-inline-block">{paths[paths.length - 1].toUpperCase() || 'DASHBOARD'}</h6> */}
                    <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-0">
                        <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                            {paths.map((path, index) => {
                                return (
                                    <li className="breadcrumb-item" key={index}>
                                        {paths.length === index + 1 ?
                                            <span className="breadcrumb-item active" aria-current="page">{path.toUpperCase() || 'DASHBOARD'}</span>
                                            :
                                            <span className='text-primary' style={{ cursor: 'pointer' }} onClick={() => handleNavigation(path)}>{path.toUpperCase() || <i className="fas fa-home" ></i>}</span>
                                        }
                                    </li>
                                )
                            })}
                        </ol>
                    </nav>
                </div>
            </div>
        </React.Fragment>
    )
}
