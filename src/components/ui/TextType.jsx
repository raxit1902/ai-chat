import React, { useState, useEffect } from 'react';

const TypingText = ({ text, speed = 10, className = '', onComplete }) => {
	const [displayedText, setDisplayedText] = useState('');

	useEffect(() => {
		let index = 0;
		setDisplayedText('');

		if (!text) {
			if (onComplete) onComplete();
			return;
		}

		const intervalId = setInterval(() => {
			if (index < text.length - 1) {
				setDisplayedText((prev) => prev + text.charAt(index));
				index++;
			} else {
				setDisplayedText(text);
				clearInterval(intervalId);
				if (onComplete) onComplete();
			}
		}, speed);

		return () => clearInterval(intervalId);
	}, [text, speed]);

	return <span className={className}>{displayedText}</span>;
};

export default TypingText;
