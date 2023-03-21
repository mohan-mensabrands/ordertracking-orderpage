import React from 'react';
import { FallbackSvg } from '../svg';


export default function AllEvents({ allEvents, loading, show, onClose }) { 
    if (show) {
        document.body.classList.add('mensaModalActive')
    } else {
        document.body.classList.remove('mensaModalActive')
    }
    return (
        <div className={show ? "mensaModalWrapper" : ""}>
            <div className={show ? 'mensaSubeventClosebtn': 'mensaHide'} onClick={onClose}> <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                <path d="M20 12L12 20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20 20L12 12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            </div>
            <div className={show ? 'mensaSubeventContainer' : 'mensaHide'}>
                {loading ? <div>loading</div>:
                allEvents.length < 1 ? <Fallback/>:
                <div className='mensaSubeventTimeline'>
                    {allEvents?.map(
                        (event) =>
                            <div className='eventCard'>
                                <SubEvent
                                    date={dateFormat(new Date(event.date))}
                                    location={event.location}
                                    name={event.activity}
                                ></SubEvent>
                            </div>
                    )}
                </div>}
            </div>
        </div>
    )
}

const SubEvent = ({ date, name, location, time }) => {
    return (
        <>
            <div className="mensaSubeventALDContainer">
                <div className="mensaSubeventName">{name}</div>
                <div className="mensaSubeventLDContainer">
                    <div className="mensaSubeventDate">{date}</div>
                    <div className="mensaSubeventLocation">{location}</div>
                    {/* <div className="mensaSubeventTime">{time}</div> */}
                </div>
            </div>
        </>
    )
}

const dateFormat = (isoDate) => {
    var options = { weekday: 'short', month: 'short', day: 'numeric' };
    return isoDate.toLocaleDateString("en-US", options)
}

const Fallback = () => {
    return(
        <div className='mensaFallbackPage'>
            <FallbackSvg/>
            <div className="mensaFallback">Hey!, we know what you are looking for</div>
            <div className="mensaFallbackSecondary">Come back in sometime for this information</div>
        </div>
    )
}