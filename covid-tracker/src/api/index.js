// functions that fetches data
import axios from 'axios';


// ROUTE FOR CARDS.JSX
export const fetchGlobalData = async () => {
    //asynchronous function returns a response from the API
    try {
        // destructure data to make syntax easier
        const { data : { cases, active, recovered, deaths } } = await axios.get('https://disease.sh/v3/covid-19/all');
        // Cumulative confirmed (cases), active, recovered, and died cases
        return { cases, active, recovered, deaths};

    } catch (error) {
        return error;
    }
}

//  ROUTE FOR GLOBALMETRICS.JSX
export const fetchCountryData = async () => {
    try {
        const { data } = await axios.get('https://disease.sh/v3/covid-19/countries?yesterday=true');

        const modifiedCountryData = data.map((dailyData) => ({
            country: dailyData.country,
            confirmed: dailyData.cases,
            previousR: dailyData.cases - dailyData.todayCases,
            recovered: dailyData.recovered,
            previousD: dailyData.recovered - dailyData.todayRecovered,
            deaths: dailyData.deaths,
            previousA: dailyData.deaths - dailyData.todayDeaths,
            active: dailyData.active,
            region: dailyData.continent
        }));

        return modifiedCountryData;
    } catch (error) {
        return error;
    }
}

//  ROUTE FOR MAP.JSX
export const fetchMapData = async () => {
    try {
        const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');

        const mapCountryData = data.map((mapData) => ({
            country: mapData.country,
            cases: mapData.cases,
            active: mapData.active,
            recovered: mapData.recovered,
            deaths: mapData.deaths,
            flag: mapData.countryInfo.flag,
            countryLat: mapData.countryInfo.lat,
            countryLong: mapData.countryInfo.long
        }));

        return mapCountryData;
    } catch (error) {
        return error;
    }
}

//  ROUTE FOR CHART.JSX
export const fetchGraphData = async () => {
    try {
        const { data : { cases, deaths, recovered } } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=120');
        
        return { cases, deaths, recovered };
    } catch (error) {
        return error;
    }
}

//  ROUTE FOR COUNTRYPICKER.JSX
export const fetchCountryForBar = async (country) => {
    try {
        const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');

        const countryName = data.map((countryData) => ({
            country: countryData.country,
        }));

        return countryName;
    } catch (error) {
        return error;
    }
}

//  ROUTE FOR APP.JS
export const fetchCountryDataForBar = async (country) => {
    const url = 'https://disease.sh/v3/covid-19/countries';
    let urlWithCountry = url;
    if (country) {
        urlWithCountry = `${url}/${country}`;
    }

    try {
        const { data: {cases, recovered, deaths} } = await axios.get(urlWithCountry);

        return {cases, recovered, deaths};

    } catch (error) {
        return error;
    }
}