import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import * as LoggerAPI from '../../api/loggerAPI'

export default function ClusterOverview({ teamVSClusters, setTeamVSClusters }) {

    const [labels, setLabels] = useState([])
    const [values, setValues] = useState([])

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
        // eslint-disable-next-line
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


    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Teams vs Number of Clusters Delivered',
                data: values,
                // data: [1, 2, 3, 4, 55, 4, 6, 8, 5, 0],
                // data: [{ data: 3 }, { data: 3 }, { data: 3 }],
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

    return (
        <div className="card" style={{ height: '49vh' }}>
            <div className="card-header py-1">
                <div className="text-muted text-sm" styl={{ fontSize: 12 }}>Total Clusters Submitted</div>
                <span className='m-0 p-0' style={{ fontSize: 20, fontWeight: 'bold' }}>Performance</span>
            </div>
            <div className="card-body">
                <Line
                    type='bar'
                    options={{
                        fill: 'start',
                        maintainAspectRatio: false,
                        elements: {
                            line: {
                                tension: 0
                            }
                        },
                        animations: {
                            radius: {
                                duration: 500,
                                easing: 'linear',
                                loop: (context) => context.active
                            }
                        },
                        hoverRadius: 5,
                        hoverBackgroundColor: '#3ff',
                        interaction: {
                            mode: 'nearest',
                            intersect: false,
                            axis: 'x'
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
                                min: 0,
                            },
                        },
                        plugins: {
                            legend: {
                                display: false,
                            },
                            tooltip: {
                                callbacks: {
                                    title: (item) => {
                                        // console.log(teamVSClusters[item[0].dataIndex].team.region)
                                        return `Team #${teamVSClusters[item[0].dataIndex].team.teamNumber} (${teamVSClusters[item[0].dataIndex].team.region} Region)`
                                    },
                                    label: (item) => {
                                        // console.log(teamVSClusters[item.dataIndex].count)
                                        return `Clusters ${teamVSClusters[item.dataIndex].count}`
                                    }
                                }
                            },
                        },
                    }}
                    data={data} />
            </div>
        </div>
    )
}
