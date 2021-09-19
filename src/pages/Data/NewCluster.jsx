import React, { useRef, useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import * as LoggerAPI from '../../api/loggerAPI'
import * as TeamsAPI from '../../api/teamsAPI'
import ToastAlert from '../../components/ToastAlert'

import decodeLocation from '../../services/decodeLocation'

export default function NewCluster({ show, setShow }) {
    function handleClose() {
        setShow(false)
    }

    const [showToast, setShowToast] = useState(false)
    const [loading, setLoading] = useState(false)
    // code defn
    /**
     * 0 loading
     * 1 success
     * 2 error
     */
    const [status, setStatus] = useState({ code: 1, message: '' })
    const [teamNames, setTeamNames] = useState([])

    const enumeratorRef = useRef()
    const clusterRef = useRef()
    // const supervisorRef = useRef()
    // const member1Ref = useRef()
    // const member2Ref = useRef()
    const surveyDateRef = useRef()
    const expectedHouseHoldsRef = useRef()
    const listedHouseHoldsRef = useRef()
    const latRef = useRef()
    const lngRef = useRef()
    const altRef = useRef()
    const regionRef = useRef()
    const teamNumberRef = useRef()
    const othersRef = useRef()

    const formRef = useRef()



    async function addRecord(e) {
        e.preventDefault()
        const payload = {
            enumerator: enumeratorRef.current.value,
            cluster: clusterRef.current.value,
            surveyDate: new Date(surveyDateRef.current.value),
            expectedHouseHolds: expectedHouseHoldsRef.current.value,
            listedHouseholds: listedHouseHoldsRef.current.value,
            team: teamNumberRef.current.value,
            // teamNumber: teamNumberRef.current.value,
            gps: {
                latitude: latRef.current.value,
                longitude: lngRef.current.value,
                altitude: altRef.current.value,
            },
            decodedGPS: {
                region: regionRef.current.value,
                // district: districtRef.current.value,
                // ward: wardRef.current.value,
                // street: streetRef.current.value,
                other: othersRef.current.value,
            }
        }
        setStatus({ code: 0, message: '' })

        await LoggerAPI.create(payload).then(data => {
            console.log(data)
            setStatus({ code: 1, message: 'Successfully Added' })
            formRef.current.reset()
        }).catch(error => {
            console.log(error)
            setStatus({ code: 2, message: error.message })
        })
    }

    async function getAllTeamNames() {
        setLoading(true)
        await TeamsAPI.getAll()
            .then(teams => {
                console.log('enums', teams)
                setTeamNames(teams)
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                setLoading(false)
            })
    }

    async function getLocationAddress() {
        // https://www.google.com/maps/@-6.0138888,37.9361579,14024m/data=!3m1!1e3!5m1!1e4
        window.open(`https://www.google.com/maps/@${latRef.current.value},${lngRef.current.value},${altRef.current.value}m/data=!3m1!1e3!5m1!1e4`)
        // await decodeLocation({ lat: latRef.current.value, lng: lngRef.current.value })
        //     .then(address => {
        //         console.log(address)
        //         handleClose()
        //         // address
        //     }).catch(error => {
        //         console.log(error)
        //     })
    }

    useEffect(() => {
        getAllTeamNames()
        return () => {
        }
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
                {/* <Modal.Title>Modal heading</Modal.Title> */}
            </Modal.Header>
            <ToastAlert show={showToast} setShow={setShowToast} message={status.message} />
            <Modal.Body>
                {/* <Logger /> */}
                <form onSubmit={addRecord} className='' ref={formRef}>
                    <h3 className='text-uppercase'>Team Information</h3>
                    <div class="form-row">
                        <div class="form-group col-md-2">
                            <label for="inputEmail">Enumerator Number:</label>
                            <input type="number" ref={enumeratorRef} class="form-control" />
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputEmail">Cluster Number:</label>
                            <input type="number" ref={clusterRef} class="form-control" />
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputEmail">Team Number:</label>
                            {/* <input type="number" ref={teamNumberRef} class="form-control" /> */}
                            <select className='form-control' ref={teamNumberRef}>
                                <option value={0}>Select Team Number </option>
                                {teamNames.map(team => {
                                    return (
                                        <option value={team._id}>{team.teamNumber}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {/* <div class="form-group col-md-10"></div>
                        <h5 className='form-group col-md-10'>Team Members</h5>

                        <div class="form-group col-md-4">
                            <label >Supervisor:</label>
                            <input type="text" ref={supervisorRef} class="form-control" />
                        </div>
                        <div class="form-group col-md-4">
                            <label >Member 1:</label>
                            <input ref={member1Ref} class="form-control" />
                        </div>
                        <div class="form-group col-md-4">
                            <label >Member 2:</label>
                            <input ref={member2Ref} class="form-control" />
                        </div> */}
                    </div>


                    <h3 className='text-uppercase'>Survey Descriptions</h3>
                    <div class="form-row">
                        <div class="form-group col-md-2">
                            <label for="inputEmail">Conduct Date:</label>
                            <input ref={surveyDateRef} type='date' class="form-control" />
                        </div>
                        <div class="form-group col-md-4">
                            <label >Households expected in cluster:</label>
                            <input type='number' ref={expectedHouseHoldsRef} class="form-control" />
                        </div>
                        <div class="form-group col-md-4">
                            <label >households listed:</label>
                            <input type='number' ref={listedHouseHoldsRef} class="form-control" />
                        </div>

                        <div class="form-group col-md-10"></div>
                        <h5 className='form-group col-md-12'>GPS Coordinates</h5>

                        <div class="form-group col-md-2">
                            <label >Latitude:</label>
                            <input ref={latRef} type="decimal" class="form-control" />
                        </div>
                        <div class="form-group col-md-2">
                            <label >Longitude:</label>
                            <input ref={lngRef} type='decimal' class="form-control" />
                        </div>
                        <div class="form-group col-md-2">
                            <label >Altitude:</label>
                            <input ref={altRef} type='number' class="form-control" />
                        </div>
                        <div class="form-group col-md-2">
                            <label >-</label>
                            <button className='form-control btn btn-default px-5' type="button" onClick={getLocationAddress}>Decode</button>
                        </div>

                        <h5 className='form-group col-md-12'></h5>

                        <div class="form-group col-md-2">
                            <label >Region:</label>
                            <input ref={regionRef} class="form-control" />
                        </div>
                        <div class="form-group col-md-8">
                            <label >Other:</label>
                            <input ref={othersRef} class="form-control" />
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
                    <button className='float-right btn btn-neutral px-5 mr-3' onClick={() => setShowToast(true)}>Clear Input</button>
                </form>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer> */}
        </Modal>
        // <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        //     <div class="modal-dialog">
        //         <div class="modal-content">
        //             <div class="modal-header">
        //                 <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        //                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //                     <span aria-hidden="true">&times;</span>
        //                 </button>
        //             </div>
        //             <div class="modal-body">

        //             </div>
        //             <div class="modal-footer">
        //                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        //                 <button type="button" class="btn btn-primary">Save changes</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}