import React, { useRef, useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import * as UserAPI from '../../api/authAPI'


export default function NewUser({ show, setShow }) {
    function handleClose() {
        setShow(false)
    }

    // code defn
    /**
     * 0 loading
     * 1 success
     * 2 error
     */
    const [status, setStatus] = useState({ code: 1, message: '' })

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const roleRef = useRef()

    const formRef = useRef()



    async function addRecord(e) {
        e.preventDefault()
        const payload = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            role: roleRef.current.value,
        }
        setStatus({ code: 0, message: '' })

        await UserAPI.register(payload).then(data => {
            console.log(data)
            setStatus({ code: 1, message: 'Successfully Added' })
            formRef.current.reset()
        }).catch(error => {
            console.log(error)
            setStatus({ code: 2, message: error.message })
        })
    }

    return (
        <Modal
            show={show}
            size="lg"
            onHide={handleClose}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>User Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={addRecord} className='' ref={formRef}>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail">First Name:</label>
                            <input type="text" ref={firstNameRef} class="form-control" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputEmail">Last Name:</label>
                            <input type="text" ref={lastNameRef} class="form-control" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputEmail">Email:</label>
                            <input ref={emailRef} type='email' class="form-control" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputEmail">Role:</label>
                            <select className='form-control' ref={roleRef}>
                                <option value={1}>Administator </option>
                                <option value={2}>Member </option>
                            </select>
                        </div>
                    </div>
                    {status.message &&
                        <div className='alert alert-warning text-center'>{status.message}</div>
                    }
                    <button className='float-right btn btn-default px-5' type="submit">
                        Save
                        {status.code === 0 &&
                            <span className='spinner-border spinner-border-sm'></span>
                        }
                    </button>
                    <button className='float-right btn btn-neutral px-5 mr-3'>Clear Input</button>
                </form>
            </Modal.Body>
        </Modal>
    )
}