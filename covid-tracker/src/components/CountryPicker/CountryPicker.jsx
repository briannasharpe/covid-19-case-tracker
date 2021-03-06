//DISPLAYS A FORM CONTROL TO CHOOSE A COUNTRY

import React, { useState, useEffect } from 'react';  
import { NativeSelect, FormControl } from '@material-ui/core';  
import styles from './CountryPicker.module.css';  
import { fetchCountryForBar } from '../../api';  

const CountryPicker = ({handleCountryChange}) => {
    const [countryOption, setCountryOption] = useState([]); 

    useEffect(() => {
        const fetchMyAPI = async () => {
            const initialCountryData = await fetchCountryForBar();
            setCountryOption(initialCountryData);
        };

        fetchMyAPI();
    }, [setCountryOption]);

    return (
        <div className={styles.container}>
            <div>
                <FormControl className={styles.formControl}>
                    <NativeSelect defaultValue="" onChange ={(e) => handleCountryChange(e.target.value)} variant="filled">
                        <option value="">Country</option>
                        {countryOption.map((countrySelect, i) => 
                            <option key={i} value={countrySelect.country} > {countrySelect.country} </option>
                        )}
                    </NativeSelect>
                </FormControl>
            </div>
        </div>
    )
}

export default CountryPicker;