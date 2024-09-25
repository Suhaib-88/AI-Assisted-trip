import React, {useState, useEffect} from "react";
import { useCollection } from "@squidcloud/react";
import "./AddTripForm.css"
import {Trip} from '../types'

function AddTrip(){
    const [country, setCountry] = useState("");
    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [countries, setCountries] = useState([]);
    const tripsCollection= useCollection<Trip>("trips")

    useEffect(()=>{
        fetch("https://restcountries.com/v3.1/all").then((response)=>{
            if (response.ok) return response.json();
        }).then((data)=> {
            const countryNames = data.map((country:any)=> country.name.common);
            setCountries(countryNames);
        }).catch((error)=> console.error(error))
    }, [])

    const addTrip =() =>{
        const tripID = crypto.randomUUID()
        tripsCollection.doc(tripID).insert({
            id: tripID,
            country,
            startDate:new Date(startDate),
            endDate: new Date(endDate),
            notes: []
        })
    }
    
    return(
        <div className= "trip-container">
            <h3> Add Trip</h3>
            <div className="trip-form">
                <select value={country} onChange={(e)=> setCountry(e.target.value)}>
                    <option value="" disabled>Select Country</option>
                    {countries.map((country)=>(<option key={country} value={country}>{country}</option>))}
                </select>
                <input type="date" value={startDate} onChange={(e)=> setstartDate(e.target.value)}></input>
                <input type="date" value={endDate} onChange={(e)=> setendDate(e.target.value)}></input>
                <button onClick={addTrip}> Add Trip</button>
            </div>
        </div>
    )
}

export default AddTrip;