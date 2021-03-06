// DISPLAYS A RESPONSIVE GRAPH WITH GLOBAL DATA

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from "numeral";
import { fetchGraphData } from '../../api';
import styles from './Chart.module.css';

// used a parameter for the line graph
const options = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 3,
        },
    },
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: true,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

//builds an array with the results of cases from (current day - previous day)
const buildChartData = (data, casesType = "cases") => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

const Chart = () => {
    const [graphData, setGraphData] = useState({});

    useEffect(() => {
        const fetchMyAPI = async () => {
            const initialGraphData = await fetchGraphData();
            let chartData = buildChartData(initialGraphData, "cases");
            // console.log(chartData);
            // console.log(graphData.cases);
            // setGraphData(initialGraphData);
            setGraphData(chartData);
        };

        fetchMyAPI();
    }, [graphData.cases]);

    // console.log(graphData.cases);
    // const globalGraphData = Object.values(graphData);
    // console.log(globalGraphData);


    return (
        <div className={styles.container}>
            <div className={styles.line}>
                {/* Shows changes in cases from two dates
                    Ex. Hover over the date 11/30/20 and you should get +506,064 cases 
                    [ (11/30/20) : 63,278,795 cases] - [ (11/29/20) : 62,772,731] = 506,064 cases */}
                {graphData?.length > 0 && (
                    <Line
                        data={{
                            datasets: [
                                {
                                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                                    borderColor: "#CC1034",
                                    data: graphData,
                                },
                            ],
                        }}
                        options={options}
                    />
                )}
            </div>
        </div>
    )
}

export default Chart;