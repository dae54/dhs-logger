import React, { useEffect, useState } from 'react'
import * as LoggerAPI from '../../api/loggerAPI'
import { Bar, Line } from 'react-chartjs-2';
import TeamDetails from './teamDetails';
import MaterialTable from 'material-table';

export default function Dashboard() {
    const [teamVSClusters, setTeamVSClusters] = useState([])
    const [labels, setLabels] = useState([])
    const [values, setValues] = useState([])

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Teams vs Number of Clusters Delivered',
                data: values,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Month',
                    color: '#911',
                    font: {
                        family: 'Comic Sans MS',
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                    padding: { top: 20, left: 0, right: 0, bottom: 0 }
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value',
                    color: '#191',
                    font: {
                        family: 'Times',
                        size: 20,
                        style: 'normal',
                        lineHeight: 1.2
                    },
                    padding: { top: 30, left: 0, right: 0, bottom: 0 }
                }
            }
            // }
        }
    };

    async function getTeamVsClusters() {
        await LoggerAPI.getTeamVsClusters()
            .then(response => {
                console.log(response)
                setTeamVSClusters(response)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getTeamVsClusters()
    }, [])


    useEffect(() => {
        let values = teamVSClusters.map(item => {
            return item.count
        })
        // console.log(data)
        let labels = teamVSClusters.map(item => {
            return item.team.teamNumber
        })
        setLabels(labels)
        setValues(values)

    }, [teamVSClusters])

    function renderFullName(names) {
        return `${names.firstName} ${names.middleName} ${names.lastName}`
    }

    function renderPhoneNumber(ob) {
        return `(${ob.phoneNumber})`
    }


    return (
        <div className="container-fluid mt-4">
            <div className="row" style={{ height: '50vh' }}>
                <div className="col-12">
                    <div className="card" style={{ height: '49vh' }}>
                        <div className="card-header py-1">
                            <div className="text-muted text-sm" styl={{ fontSize: 12 }}>Total Clusters Submitted</div>
                            <span className='m-0 p-0' style={{ fontSize: 20, fontWeight: 'bold' }}>Performance</span>
                        </div>
                        <div className="card-body">
                            <Line type='bar'
                                options={{
                                    fill: 'start',
                                    maintainAspectRatio: false,
                                    elements: {
                                        line: {
                                            tension: 0
                                        }
                                    },
                                    scales: {
                                        x: {
                                            display: true,
                                            title: {
                                                display: true,
                                                text: 'Team Number',
                                                font: {
                                                    size: 14,
                                                },
                                            },
                                            grid: {
                                                display: false
                                            }
                                        },
                                        y: {
                                            display: true,
                                            title: {
                                                display: true,
                                                text: 'Clusters Submitted',
                                                font: {
                                                    size: 14,
                                                },
                                            },
                                            grid: {
                                                // display: false
                                            }
                                        }
                                    },
                                    plugins: {
                                        legend: {
                                            display: false,
                                        }
                                    },
                                }}
                                data={data} />
                        </div>
                    </div>
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
                                        title: 'Team Number', field: 'team',
                                        render: (data) => data.team.teamNumber
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
                                    {
                                        title: 'Supervisor', field: 'team',
                                        render: (data) => renderPhoneNumber(data.team.supervisor)
                                    },
                                ]}
                                options={{
                                    tableLayout: 'fixed',
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <TeamDetails />
                </div>
            </div>
        </div>
    )
}
