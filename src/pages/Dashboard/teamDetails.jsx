import React, { useEffect, useState } from 'react'
import * as TeamsAPI from '../../api/teamsAPI'
import * as LoggerAPI from '../../api/loggerAPI'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import CheckPolar from './checkPolar'

export default function TeamDetails({ teamVSClusters }) {
    const [loading, setLoading] = useState(true)
    const [teamNames, setTeamNames] = useState([])
    const [activeTeam, setActiveTeam] = useState('')

    const [values, setValues] = useState([])
    const [labels, setLabels] = useState([])

    // const [from, setFrom] = useState(moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'))
    const [from, setFrom] = useState(moment("20210913", "YYYYMMDD").format('YYYY-MM-DD'))
    const [to, setTo] = useState(moment().format('YYYY-MM-DD'))

    async function getTeamClusterInfo(teamId) {
        console.log(teamId)
        await LoggerAPI.getTeamClusterInfo(teamId, { from, to })
            .then(data => {
                console.log(data)
                let values = data.map(item => {
                    return item.count
                })
                let labels = data.map(item => {
                    return moment(item.surveyDate).format('DD/MM/YYYY')
                })
                setLabels(labels)
                setValues(values)
            }).catch(error => {
                console.log(error)
            })
    }

    async function getAllTeamNames() {
        setLoading(true)
        await TeamsAPI.getAll()
            .then(teams => {
                setTeamNames(teams)
                setActiveTeam(teams[0])
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getAllTeamNames()
        return () => {
        }
    }, [])


    useEffect(() => {
        console.log('activeTeam', activeTeam)
        return () => {
        }
    }, [activeTeam])

    useEffect(() => {
        console.log('called')
        console.log(activeTeam)
        if (activeTeam) {
            console.log('going on')
            getTeamClusterInfo(activeTeam._id)
        }
        // eslint-disable-next-line 
    }, [to, from, activeTeam])

    const data = {
        labels: labels,
        datasets: [
            {
                label: '',
                data: values,
                fill: 'start',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="row">
            <div className="col-8">
                <div className='card'>
                    <div className="card-header d-flex justify-content-between py-1">
                        {/* <span style={{ alignSelf: 'center' }}>Team # {activeTeam.teamNumber}  Cluster Progress Chart</span> */}
                        <span className='m-0 p-0' style={{ fontSiz: 20, fontWeight: 'bold', alignSelf: 'center' }}>Team's Performance (# {activeTeam.teamNumber}-{activeTeam.region})</span>

                        <div className='d-flex' style={{ alignItems: 'center' }}>
                            Select Team Number
                            {loading ?
                                <span className='spinner-border spinner-border-sm p-2 m-2'></span>
                                :
                                <span className='ml-2' >
                                    <select className='form-control' value={activeTeam._id} onChange={(e) => setActiveTeam(teamNames.find(team => team._id === e.target.value))}>
                                        {teamNames.map(team => <option value={team._id}>{`#${team.teamNumber} (${team.region})`}</option>)}
                                    </select>
                                </span>
                            }
                        </div>
                    </div>
                    <div className="card-body p-1">
                        {/* <div className="d-flex justify-content-between">
                    <div>
                        <span className="">Member 1</span> <br />
                        <p className="m-0">Daniel Ernest (0626325152)</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <span className="">Member 2</span> <br />
                        <p className="m-0">Daniel Ernest (0626325152)</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span className="">Supervisor</span> <br />
                        <p className="m-0">Daniel Ernest (0626325152)</p>
                    </div>
                </div> */}
                        {/* <div className='d-flex justify-content-between'>
                            <div class="form-row w-10">
                                <div class="form-group col-md-6">
                                    <label for="inputEmail">Start :</label>
                                    <input type='date' value={from} onChange={e => setFrom(e.target.value)} className='form-control' max={moment().format('YYYY-MM-DD')} />
                                </div>
                                <div class="form-group col-md-6 p-0">
                                    <label for="inputEmail">End:</label>
                                    <input type='date' value={to} onChange={e => setTo(e.target.value)} max={moment().format('YYYY-MM-DD')} className='form-control' />
                                </div>
                            </div>
                        </div> */}
                        <div className="" style={{ height: '40vh' }}>
                            <Line
                                // type='area'
                                width={100}
                                height={50}
                                options={{
                                    maintainAspectRatio: false,
                                    label: {
                                        show: false
                                    },
                                    scales: {
                                        x: {
                                            display: true,
                                            title: {
                                                display: true,
                                                text: 'Cluster Survey Date',
                                                font: {
                                                    size: 14,
                                                },
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
                                            // min: 1,
                                            max: Math.max(...values) + 1
                                        }
                                    },
                                    plugins: {
                                        legend: {
                                            display: false,
                                        }
                                    },
                                    // elements.line.tension = smooth ? 0.4 : 0;
                                    elements: {
                                        line: {
                                            tension: .3
                                        }
                                    }
                                }}
                                data={data} />
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-4">
                <CheckPolar values={values} labels={labels} teamVSClusters={teamVSClusters} activeTeam={activeTeam} />
            </div>
        </div>
    )
}
