import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import * as TeamsAPI from '../../api/teamsAPI'
import * as EnumerartorAPI from '../../api/enumeratorAPI'


export default function NewTeam({ show, setShow, updateTeams }) {
    function handleClose() {
        setShow(false)
    }

    const [loading, setLoading] = useState(false)
    // code defn
    /**
     * 0 loading
     * 1 success
     * 2 error
     */
    const [status, setStatus] = useState({ code: 1, message: '' })
    const [enumerators, setEnumerators] = useState([])


    const teamNumberRef = useRef()
    const supervisorRef = useRef()
    const member1Ref = useRef()
    const member2Ref = useRef()

    const formRef = useRef()






    async function addRecord(e) {
        e.preventDefault()
        const payload = {
            supervisor: supervisorRef.current.value,
            members: [
                member1Ref.current.value,
                member2Ref.current.value
            ],
            teamNumber: teamNumberRef.current.value
        }
        setStatus({ code: 0, message: '' })

        await TeamsAPI.create(payload).then(data => {
            formRef.current.reset()
            setStatus({ code: 1, message: 'Successfully Added' })
            updateTeams(teams => [data].concat(teams))
        }).catch(error => {
            console.log(error)
            setStatus({ code: 2, message: error.message })
        })
    }

    async function getEnumerators() {
        setLoading(true)
        await EnumerartorAPI.getAll()
            .then(enums => {
                console.log('enums', enums)
                setEnumerators(enums)
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getEnumerators()
    }, [])

    return (
        <Modal
            show={show}
            size="xl"
            onHide={handleClose}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3 className='text-uppercase'>Team Information</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={addRecord} className='' ref={formRef}>
                    <div class="form-row">
                        <div class="form-group col-md-2">
                            <label >Team Number:</label>
                            <input type="number" ref={teamNumberRef} class="form-control" />
                        </div>
                        <h4 className='form-group col-md-12 my-1'>Team Members</h4>

                        <div className='form-group col-md-4'>
                            <label >Supervisor:</label>
                            <select className='form-control' ref={supervisorRef}>
                                <option value={0}>Select Enumerator </option>
                                {enumerators.map(enumerator => {
                                    return (
                                        <option value={enumerator._id}>{enumerator.firstName}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='form-group col-md-4'>
                            <label >Member 1:</label>
                            <select className='form-control' ref={member1Ref}>
                                <option value={0}>Select Enumerator </option>
                                {enumerators.map(enumerator => {
                                    return (
                                        <option value={enumerator._id}>{enumerator.firstName}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='form-group col-md-4'>
                            <label >Member 2:</label>
                            <select className='form-control' ref={member2Ref}>
                                <option value={0}>Select Enumerator </option>
                                {enumerators.map(enumerator => {
                                    return (
                                        <option value={enumerator._id}>{enumerator.firstName}</option>
                                    )
                                })}
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