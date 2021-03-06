// DISPLAYS BAR GRAPHS WITH COUNTRY DATA

import React from 'react';
import { Bar } from 'react-chartjs-2';  
import styles from './BarChart.module.css'

const BarChart = ( { data, country }) => {
  
    return (
        <div className={styles.container}>
            <Bar className={styles.maingraph}
                data={{
                    labels: ['Cases', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                        data: [data.cases, data.recovered, data.deaths]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `current state in ${country}` }
                }}
            />

            <Bar className={styles.secondarygraph}
                data={{
                    labels: ['Projected Cases', 'Projected Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(255, 222, 87, 0.5)', 'rgba(255, 222, 87, 0.5)'],
                        data: [(data.cases * 10), (data.deaths * 1000)]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `projected state in ${country}` }
                }}
            />
        </div>
    )
}

export default BarChart; 