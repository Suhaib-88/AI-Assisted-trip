import {Trip} from "../types";
import { useState } from "react";
import {format} from 'date-fns';
import "./Trip.css"


type Props = {
    trip:Trip,
    onDelete: (id:string) => void,
    onAddNote: (tripId: string,note: string)=> void,
    onDeleteNote: (tripId:string, noteIndex:number)=> void;
    index:number;
};

function TripCard({trip, onDelete, onAddNote, onDeleteNote, index}: Props){
    const [newnote, setNewnote] = useState('')

    const handleAddNote=(tripId:string, note: string)=>{
        if (note.trim()!== ''){
            onAddNote(tripId, note);
            setNewnote('');
        }
    };

    return <div className="trip-card" key= {index}>
        <h4>
            <span>
                {format(trip.startDate, 'PPP')} - {format(trip.endDate, "PPP")}
            </span>
            <button className="country-button">
                {trip.country}
            </button>
            <button className="delete-button" onClick={()=>onDelete(trip.id)}>Delete</button>
        </h4>
        <ul>
            {trip.notes.map((note, noteIndex)=>(<li key ={noteIndex} className="note">
                {note}{''}
                <button className="delete-button" onClick={()=> onDeleteNote(trip.id, noteIndex)}>
                    X
                </button>
            </li>
        ))}
        </ul>
        <div className="note-form">
            <input type="text" value={newnote} onChange={(e)=>setNewnote(e.target.value)} placeholder="Add a note"/>
        <button className="add-note-button" onClick={()=>handleAddNote(trip.id, newnote)}>Add note</button>
        </div>

    </div>
}

export default TripCard;