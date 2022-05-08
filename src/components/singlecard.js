import React from 'react';
import './singlecard.css';

export default function Singlecard({card, handlechoice, flipped, disabled}) {
	const handleclick = () => {
		if (!disabled) {
            handlechoice(card);
        }
	};
	return (
		<div className="card">
            <div className={flipped? "flipped": ""}>
                <img src={card.src} alt="front" className='front' />
                <img src="./img/cover.png" onClick={handleclick} alt="back"  className='back'/>
            </div>
		</div>
	);
}
