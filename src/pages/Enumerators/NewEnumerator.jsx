import React, { useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import * as EnumeratorAPI from '../../api/enumeratorAPI'


export default function NewTeam({ show, setShow, setEnumerators }) {
    function handleClose() {
        setShow(false)
    }

    // const [showToast, setShowToast] = useState(false)
    // const [loading, setLoading] = useState(false)
    // code defn
    /**
     * 0 loading
     * 1 success
     * 2 error
     */
    const [status, setStatus] = useState({ code: 1, message: '' })

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const middleNameRef = useRef()
    const phoneNumberRef = useRef()
    const formRef = useRef()
    const roleRef = useRef()

    async function addRecord(e) {
        e.preventDefault()
        const payload = {
            firstName: firstNameRef.current.value,
            middleName: middleNameRef.current.value,
            lastName: lastNameRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            role: roleRef.current.value
        }
        console.log(payload)
        setStatus({ code: 0, message: '' })

        await EnumeratorAPI.create(payload).then(data => {
            console.log(data)
            setEnumerators(enumerators => [data].concat(enumerators))
            setStatus({ code: 1, message: 'Successfully Added' })
            formRef.current.reset()
            firstNameRef.current.focus()
        }).catch(error => {
            console.log(error)
            setStatus({ code: 2, message: error.message })
        })
    }

    return (
        <Modal
            show={show}
            size="xl"
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3 className='text-uppercase'>New Enumerator</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={addRecord} ref={formRef} className=''>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label >First Name:</label>
                            <input type="text" ref={firstNameRef} class="form-control" />
                        </div>
                        <div class="form-group col-md-3">
                            <label >Middle Name:</label>
                            <input type="text" ref={middleNameRef} class="form-control" />
                        </div>
                        <div class="form-group col-md-3">
                            <label >Last Name:</label>
                            <input type="text" ref={lastNameRef} class="form-control" />
                        </div>
                        <div class="form-group col-md-4">
                            <label>Phone Number:</label>
                            <input type="number" ref={phoneNumberRef} class="form-control" />
                        </div>
                        <div className='form-group col-md-4'>
                            <label >Role:</label>
                            <select className='form-control' ref={roleRef}>
                                <option value='member'>Member</option>
                                <option value='supervisor'>Supervisor</option>
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
                    <button className='float-right btn btn-neutral px-5 mr-3' type='reset'>Clear Input</button>
                </form>
            </Modal.Body>
        </Modal>
    )
}