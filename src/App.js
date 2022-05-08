import { useEffect, useState } from 'react';
import './App.css';
import Singlecard from './components/singlecard';

const cardImages = [
	{ src: '/img/helmet-1.png', matched: false },
	{ src: '/img/potion-1.png', matched: false },
	{ src: '/img/ring-1.png', matched: false },
	{ src: '/img/scroll-1.png', matched: false },
	{ src: '/img/shield-1.png', matched: false },
	{ src: '/img/sword-1.png', matched: false }
];
function App() {
	const [ cards, setCards ] = useState([]);
	const [ turns, setTurns ] = useState(0);
	const [ choiceone, setchoiceone ] = useState(null);
	const [ choicetwo, setchoicetwo ] = useState(null);
	const [ disabled, setdisabled ] = useState(false);
	const shuffleCards = () => {
		const shuffledCards = [ ...cardImages, ...cardImages ]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

		setchoiceone(null);
		setchoicetwo(null);
		setCards(shuffledCards);
		setTurns(0);
	};
	const handlechoice = (card) => {
		choiceone ? setchoicetwo(card) : setchoiceone(card);
	};
	useEffect(
		() => {
			if (choiceone && choicetwo) {
				setdisabled(true);
				if (choiceone.src === choicetwo.src) {
					setCards((prev) => {
						return prev.map((card) => {
							if (card.src === choiceone.src) {
								return { ...card, matched: true };
							}
							else {
								return card;
							}
						});
					});
					resetTurn();
				}
				else {
					setTimeout(() => {
						resetTurn();
					}, 1000);
				}
			}
		},
		[ choiceone, choicetwo ]
	);
	const resetTurn = () => {
		setchoiceone(null);
		setchoicetwo(null);
		setTurns((prev) => prev + 1);
		setdisabled(false);
	};
	useEffect(() => {
		shuffleCards();
	}, []);

	return (
		<div className="App">
			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New Game</button>
			<div className="card-grid">
				{cards.map((card) => (
					<Singlecard
						key={card.id}
						card={card}
						handlechoice={handlechoice}
						flipped={card === choiceone || card === choicetwo || card.matched}
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns : {turns}</p>
		</div>
	);
}

export default App;
