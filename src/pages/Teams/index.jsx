import React, { useEffect, useState } from 'react'
import * as TeamsAPI from '../../api/teamsAPI'
import MaterialTable from 'material-table'
import NewTeam from './NewTeam'

export default function Teams() {
    const [logData, setLogData] = useState([])
    const [status, setStatus] = useState({ code: 1, message: '' })
    const [modalVisible, setModalVisible] = useState(false)

    async function fetchAll() {
        setStatus({ code: 0, message: '' })
        await TeamsAPI.getAll()
            .then(data => {
                console.log(data)
                setLogData(data)
                setStatus({ code: 1, message: '' })

            }).catch(error => {
                setStatus({ code: 2, message: error.message })
            })
    }

    useEffect(() => {
        fetchAll()
        return () => {
            // setLogData()
            // setStatus()
        }
    }, [])

    function renderFullName(names) {
        return `${names.firstName} ${names.middleName} ${names.lastName}`
    }

    return (
        <div className="container-fluid mt-3">
            <div className="d-flex justify-content-end">
                <NewTeam updateTeams={setLogData} show={modalVisible} setShow={setModalVisible} />
                <div className="btn btn-neutral mb-2 px-6" onClick={() => setModalVisible(true)}>New Entry</div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="card">
                        <MaterialTable
                            data={logData}
                            totalCount
                            editable={{
                                onRowUpdate: async (newData, oldData) => {
                                    await TeamsAPI.updateOne(newData).then(res => {
                                        const dataUpdate = [...logData];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        setLogData([...dataUpdate]);
                                    }).catch(error => {
                                        console.error(error)
                                    })
                                },
                                onRowDelete: async oldData => {
                                    console.log('delete')
                                    await TeamsAPI.deleteOne(oldData._id)
                                        .then(res => {
                                            const dataDelete = [...logData];
                                            const index = oldData.tableData.id;
                                            dataDelete.splice(index, 1);
                                            setLogData([...dataDelete]);
                                        }).catch(error => {
                                            console.error(error)
                                        })
                                },
                            }}
                            isLoading={status.code === 0}
                            title='Registered Teams'
                            columns={[
                                { title: 'Team Number', field: 'teamNumber' },
                                { title: 'Supervisor', field: 'cluster', render: (data) => renderFullName(data.supervisor) },
                                { title: 'Member 1', field: 'member', render: (data) => renderFullName(data.members[0].memberId) },
                                { title: 'Member 2', field: 'member', render: (data) => renderFullName(data.members[1].memberId) },
                                { title: 'Region', field: 'region', },
                                // { title: 'Survey Date', field: 'surveyDate', render: (data) => `${moment(data.surveyDate).fromNow()} (${moment(data.surveyDate).format('DD MMM')})` },
                                // { title: 'altitude', field: 'decodedGPS', render: (data) => data.decodedGPS.region },
                                // { title: 'Region', field: 'decodedGPS', render: (data) => data.decodedGPS.region },
                                // { title: 'Registered At', field: 'createdAt', render: (data) => moment(data.createdAt).fromNow() },
                                // { title: 'surveyDate', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
