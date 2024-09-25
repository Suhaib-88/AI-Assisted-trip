import squidLogo from '/squid.svg';
import './App.css';
import { useCollection, useDoc } from '@squidcloud/react';
import TripList from './components/TripList';
import AddTrip from './components/AddTripForm'
import { useQuery } from '@squidcloud/react';
import { Trip } from './types';
import AskAI from './components/AskAI';

function App() {
  const collection = useCollection<Trip>("trips")
  const trips = useQuery(collection.query())

  const findTrip = (id:string) =>{
    return trips.data.find((trip)=> trip.data.id===id)
  }

  const onDelete= (id: string) =>{
    const trip = findTrip(id);
    if (trip) trip.delete()
  };
  const onAddNote= (tripId: string, note:string) =>{
    const trip = findTrip(tripId);
    if (!trip) return
      const notes = trip.data.notes
      notes.push(note)
      trip.update({
        notes:notes
      })
    }
  
  const onDeleteNote= (tripId: string, noteIndex: number) =>{
    const trip = findTrip(tripId);
    if (!trip) return
    const notes = trip.data.notes;
    trip.update({
      notes:notes.filter((_:any, index:any)=> index!== noteIndex)
    })
  };



  return <div className='Card'>
  <AskAI/>
  <AddTrip/>
  <TripList trips={trips.data.map((trip)=> trip.data)} onDelete={onDelete} onAddNote={onAddNote} onDeleteNote={onDeleteNote}/>
  </div>
}

export default App;
