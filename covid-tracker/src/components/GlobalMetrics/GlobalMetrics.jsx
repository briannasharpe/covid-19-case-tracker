// DISPLAYS TABLE WITH GLOBAL DATA

import React, { useState, useEffect } from 'react';
import { fetchCountryData } from '../../api';
import MaterialTable from 'material-table';

const GlobalMetrics = () => {
    const [countryData, setCountryData] = useState({});

    useEffect(() => {
        const fetchMyAPI = async () => {
            const initialCountryData = await fetchCountryData();
            setCountryData(initialCountryData);
        };

        fetchMyAPI();
    }, []);

    // console.log(countryData);

    // create an array from the CountryData object
    const countries = Object.values(countryData);

    return (
        <MaterialTable
        title="Reported Cases by Country"
        columns={[
          { title: 'Country', field: 'country' },
          { title: 'Confirmed', field: 'confirmed', type: 'numeric' },
          { title: '(Previous)', field: 'previousR', type: 'numeric' },
          { title: 'Recovered', field: 'recovered', type: 'numeric' },
          { title: '(Previous)', field: 'previousD', type: 'numeric' },
          { title: 'Deaths', field: 'deaths', type: 'numeric' },
          { title: '(Previous)', field: 'previousA', type: 'numeric' },
          { title: 'Active', field: 'active', type: 'numeric' },
          { title: 'Region', field: 'region' },
        ]}

        data={countries}
        options={{
          sorting: true
        }}
      />
    )
}

export default GlobalMetrics;