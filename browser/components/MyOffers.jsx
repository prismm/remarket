import React from 'react'; 
import Loader from '../HOC/Loader.jsx'

/*----------------------- MyOffers Component ---------------------------*/
export default function MyOffers(){
    return (
        <div>
        <h3>My Offers</h3>
        <Loader loadingText="Sending...(this may take a few minutes)" />
        </div>
    )
}
