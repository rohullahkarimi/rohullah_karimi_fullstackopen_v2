import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Input } from 'semantic-ui-react'

export default function Posts() {
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/all`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(APIData)
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <Input icon='search'
                placeholder='Etsi...'
                onChange={(e) => searchItems(e.target.value)}
            />
            <div style={{ marginTop: 20 }} className="countryContent">
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                            <div key={item.cca2}>
                              <strong>{item.name.common}</strong><br></br>
                              <p>Capital: {item.capital}</p>
                              <p>Population: {item.population}</p>

                              <strong>Spoken languages</strong><br></br>
                              {
                                JSON.stringify(item.languages)
                              }
                              <img style={{height: 50, width: 80, marginBottom: 30}} src={item.flags.png}></img><br></br>


                              <strong>Weather in {item.capital}</strong><br></br>
                              <p>Start Of Week: {item.startOfWeek}</p>
                              <p>Flag: {item.flag}</p>

                            </div>
                        )
                    })
                ) : (
                  console.log("nothing")
                  /*
                    APIData.map((item) => {
                        return (
                          <div key={item.cca2}>
                            <strong>{item.name.common}</strong><br></br>
                            <p>Capital: {item.capital[0]}</p>
                          </div>
                        )
                    })
                  */
                )}
            </div>
        </div>
    )
}