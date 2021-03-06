import React from 'react';
import { Cards, Chart, CountryPicker, GlobalMetrics, Map, BarChart } from './components'; // comes from the components/index.js export
import styles from './App.module.css';
import { fetchCountryDataForBar } from './api';
import mask from './img/mask_cover.png';

// USING FUNCTIONAL COMPONENTS WITH HOOKS AND APP IS CLASS BASED
class App extends React.Component {
    state = { 
        data: {},
        country: ''
    }

    handleCountryChange = async (country) => {          
        const data = await fetchCountryDataForBar(country);  
        this.setState({data: data, country: country});  
     }

    render() {
        const {data, country} = this.state; 

        return (
            <div className={styles.container}>
                <img src={mask} alt="mask title"></img>
                <span className={styles.title}>COVID-19 Cases</span>

                <Cards />   {/* DISPLAYS CARDS WITH GLOBAL DATA */}
                <span className={styles.cards} />

                <h1>Timeline of Total Global Cases</h1>
                <Chart />   {/* DISPLAYS A RESPONSIVE GRAPH WITH GLOBAL DATA */}

                <br /><br /><h1>Global Metrics</h1>
                <GlobalMetrics />   {/*DISPLAYS TABLE WITH GLOBAL DATA */}

                <br /><br /><h1>Worldwide Map</h1>
                <Map />     {/* DISPLAYS A RESPONSIVE GLOBAL MAP WITH COUNTRY DATA */}

                <br /><br /><h1>Country Picker</h1>
                <div className={styles.countrypicker}>
                    <center>
                        <CountryPicker handleCountryChange={this.handleCountryChange}/> {/* PICKS A COUNTRY AND PASSES IT TO BARCHART */}
                        <BarChart data={data} country={country}/>   {/* DISPLAYS A RESPONSIVE GRAPH WITH A CHOSEN COUNTRY'S DATA */}
                    </center>
                </div>
            </div>
        )
    }
}

export default App;