import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';

function ViewTrip() {

  const [trip, setTrip] = useState([]);

  const {tripId} = useParams();

  useEffect(() => {
    tripId && GetTripData();
  },[tripId])

  const GetTripData = async() => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTrip(docSnap.data());
    }else {
      console.log("No such document!");
      toast("No trip found with this ID");
    }
  }

  return (
    <div>
      {/* Info Section  */}

      <InfoSection trip={trip}/>

      {/* Food  */}

      {/* Activities  */}

      {/* Shopping  */}

      {/* Transportation  */}

      {/* Miscellaneous  */}

      {/* Footer  */}
    </div>
  )
}

export default ViewTrip