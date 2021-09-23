import React, { useEffect, useState } from 'react'
import TeamDetails from './teamDetails';
import MaterialTable from 'material-table';
import ClusterOverview from './ClusterOverview';
import * as LoggerAPI from '../../api/loggerAPI'
import moment from 'moment';

export default function Dashboard() {
    const [teamVSClusters, setTeamVSClusters] = useState([])
    const [lastEntry, setLastEntry] = useState({ loading: true, data: null, error: null })
    function renderFullName(names) {
        return `${names.firstName} ${names.middleName} ${names.lastName}`
    }


    async function getLastDataEntry() {
        setLastEntry({ loading: true, data: null, error: null })
        await LoggerAPI.getLastEntryTime().then(data => {
            console.log(data)
            setLastEntry({ loading: false, data, error: null })
        }).catch(error => {
            console.log(error)
            setLastEntry({ loading: false, data: null, error })
        })
    }

    useEffect(() => {
        getLastDataEntry()
    }, [])

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-auto">
                    <div className="card">
                        <div className="card-body p-3" style={{ fontSiz: 20, fontWeight: 'bold' }}>
                            Last Data Entry:{lastEntry.loading ?
                                <span className='spinner-border spinner-border-sm'></span>
                                :
                                <span className='ml-2'>
                                    {moment(lastEntry.data.createdAt).format('DD MMM YYYY, HH:MM')} hrs ({moment(lastEntry.data.createdAt).fromNow()})
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ClusterOverview teamVSClusters={teamVSClusters} setTeamVSClusters={setTeamVSClusters} />
                </div>
                <div className="col-12">
                    <TeamDetails teamVSClusters={teamVSClusters} />
                </div>
                <div className="col-6" >
                    <div className="card">
                        {/* <div className="card-header">
                            <span className='m-0 p-0' style={{ fontSiz: 20, fontWeight: 'bold' }}>Team Performance</span>
                        </div> */}
                        <div className="card-body p-0 shadow-0" style={{ maxHeight: '57vh', overflowY: 'auto', overflowX: 'hidden' }}>
                            <MaterialTable
                                // style={{ height: '50vh' }}
                                data={teamVSClusters}
                                title='Team Performance'
                                columns={[
                                    {
                                        title: 'Team', field: 'team',
                                        render: (data) => `${data.team.region} (${data.team.teamNumber})`
                                    },
                                    {
                                        title: 'Total Clusters',
                                        field: 'count',
                                        cellStyle: {
                                            width: 100,
                                        },
                                    },
                                    {
                                        title: 'Supervisor', field: 'team',
                                        render: (data) => renderFullName(data.team.supervisor)
                                    },
                                    // {
                                    //     title: 'Supervisor', field: 'team',
                                    //     render: (data) => renderPhoneNumber(data.team.supervisor)
                                    // },
                                ]}
                                options={{
                                    tableLayout: 'fixed',
                                    paging: false,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
