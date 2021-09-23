import React from 'react'
import { PolarArea, Pie, Radar } from 'react-chartjs-2'

export default function CheckPolar({ teamVSClusters, labels, values, activeTeam }) {

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Teams vs Number of Clusters Delivered',
                data: values,
                backgroundColor: [
                    // 'rgba(75, 192, 192, 0.2)',
                    'rgb(255, 99, 132,0.3)',
                    // 'rgb(75, 192, 192,0.5)',
                    // 'rgb(255, 205, 86,0.5)',
                    // 'rgb(201, 203, 207,0.5)',
                    // 'rgb(54, 162, 235,0.5)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // function scaleBetween(unscaledNum, minAllowed = 0, maxAllowed = 5, min = 0, max = 27) {
    //     return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
    // }

    return (
        <div className='card' style={{ heigh: '60vh' }}>
            <div className="card-header p-3">
                <span className='m-0 p-0' style={{ fontSiz: 20, fontWeight: 'bold', alignSelf: 'center' }}>Team # {activeTeam.teamNumber} - {activeTeam.region}</span>
            </div>
            <div className="card-body py-1" style={{ height: '41vh' }}>
                <Radar
                    options={{
                        fill: 'start',
                        maintainAspectRatio: false,
                        hoverBackgroundColor: '#3ff',
                        plugins: {
                            legend: {
                                display: false,
                            },
                            tooltip: {
                                callbacks: {
                                    title: (item) => {
                                        console.log(teamVSClusters)
                                        // console.log(teamVSClusters[item[0].dataIndex].team.region)
                                        // return `Team #${teamVSClusters[item[0].dataIndex].team.teamNumber} (${teamVSClusters[item[0].dataIndex].team.region} Region)`
                                    },
                                    // label: (item) => {
                                    //     // console.log(teamVSClusters[item.dataIndex].count)
                                    //     return `Clusters ${teamVSClusters[item.dataIndex].count}`
                                    // },
                                }
                            },
                        },
                    }}
                    data={data}
                />
            </div>
        </div>
    )
}
