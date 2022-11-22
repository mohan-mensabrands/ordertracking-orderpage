import React from 'react'

export default function HelpModal({ contactDetails, show, onClose }) {
    if (show) {
        document.body.classList.add('mensaModalActive')
        let n = document.querySelectorAll('[title="Chat with us on WhatsApp"]')
        n.forEach(i => i.remove())
    } else {
        document.body.classList.remove('mensaModalActive')
    }
    return (
        <div className={show ? "mensaModalWrapper" : ""}>
            <div className={show ? 'mensaShowHelp' : 'mensaHide'}>
                <div className="mensaHelpContainer">
                    <div className="mensa20700">Share your Experience</div>
                    <div className="orderTracking-xbold mensaCallAt"> Call us @ <span className='mensaHelpContact'>{contactDetails.phone}</span></div>
                    <a id='callHelp' href={`tel:${contactDetails.phone}`} style={{ textDecorationLine: 'none', color: 'black' }}>
                        <div className="mensaHelpCall orderTracking-para-bold">
                            Call
                        </div>
                    </a>
                    {contactDetails.whatsapp ?
                        <a id='whatsappHelp' href={`https://wa.me/${contactDetails.whatsapp}`} target="_blank" rel='noreferrer' style={{ textDecorationLine: 'none', color: 'white' }}>
                            <div className="mensaHelpWhatsapp">
                                Whatsapp
                            </div>
                        </a> :
                        <a id='emailHelp' href={`mailto:${contactDetails.email}`} target="_blank" rel='noreferrer'>
                            <div className="mensaHelpEmail orderTracking-para-bold">
                                Mail Us
                            </div>
                        </a>
                    }
                </div>

                <div className='mensaModalClosebtn' onClick={onClose}> <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                    <path d="M20 12L12 20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M20 20L12 12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                </div>
            </div>
        </div>
    )
}
