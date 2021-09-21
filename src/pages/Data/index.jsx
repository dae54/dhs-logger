import React, { useEffect, useState } from 'react'
import * as LoggerAPI from '../../api/loggerAPI'
import * as TeamsAPI from '../../api/teamsAPI'
import MaterialTable from 'material-table'
import moment from 'moment'
import NewCluster from './NewCluster'

export default function LogData() {
    const [logData, setLogData] = useState([])
    const [teams, setTeams] = useState([])
    const [status, setStatus] = useState({ code: 1, message: '' })
    const [modalVisible, setModalVisible] = useState(false)

    async function fetchAll() {
        setStatus({ code: 0, message: '' })
        await LoggerAPI.getAll()
            .then(data => {
                // console.log(data)
                console.log('here')
                console.table(data)
                let fin = data.map(item => {
                    // console.log(item)
                    // return { ...item, teamNumber: item.team && item.team._id }
                    return { ...item, teamNumber: item.team && item.team._id }
                })
                // console.log('************************************')
                // console.log('fin', fin)
                // console.log('************************************')

                // setLogData(data.map(dt => {
                //     return { ...dt, team: dt.team._id }
                // }))
                setLogData(fin)
                setStatus({ code: 1, message: '' })

            }).catch(error => {
                console.log(error)
                setStatus({ code: 2, message: error.message })
            })
    }

    async function fetchTeams() {
        await TeamsAPI.getAll()
            .then(teams => {
                let data = teams.map(team => {
                    return { [team._id]: team.teamNumber }
                })
                console.log(Object.assign({}, ...data));
                setTeams(Object.assign({}, ...data))
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchAll()

        fetchTeams()

        return () => {
            // setLogData()
            // setStatus()
        }
    }, [])

    return (
        <div className="container-fluid mt-3">
            <div className="d-flex justify-content-end">
                <NewCluster show={modalVisible} setShow={setModalVisible} />
                <div className="btn btn-neutral mb-2 px-6" onClick={() => setModalVisible(true)}>New Entry</div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="card">
                        <MaterialTable
                            data={logData}
                            editable={{
                                onRowUpdate: async (newData, oldData) => {
                                    // console.log(newData)
                                    const payload = { ...newData, team: newData.teamNumber }
                                    console.log(payload)
                                    await LoggerAPI.updateOne(payload).then(res => {
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
                                    await LoggerAPI.deleteOne(oldData._id)
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
                            title='Registered Clusters'
                            options={{
                                pageSize: 10,
                            }}
                            columns={[
                                { title: 'Cluster', field: 'cluster', width: '100' },
                                { title: 'Enumerator', field: 'enumerator', },
                                // { title: 'Team Number', field: 'teamNumber', },
                                {
                                    title: 'Team', field: 'teamNumber',
                                    lookup: teams,
                                    // editable: false
                                },
                                { title: 'Expected Households', field: 'expectedHouseHolds', },
                                { title: 'Listed Households', field: 'listedHouseholds', },
                                { title: 'Survey Date', field: 'surveyDate', render: (data) => `${moment(data.surveyDate).fromNow()} (${moment(data.surveyDate).format('DD MMM')})` },
                                // { title: 'altitude', field: 'decodedGPS', render: (data) => data.decodedGPS.region },
                                { title: 'Region', field: 'team', render: (data) => data.team.region },
                                { title: 'Registered At', field: 'createdAt', render: (data) => moment(data.createdAt).fromNow() },
                                // { title: 'surveyDate', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
