import React, { useState, useRef, useEffect } from 'react';
import {
	Plus,
	Image as ImageIcon,
	Mic,
	ArrowUp,
	ChevronDown,
	ChevronUp,
	Copy,
	Check,
	FileText,
} from 'lucide-react';
import { CHAT_DATA } from '../data/mockData';
import TextType from './ui/TextType';
import DocumentPreview from './ui/DocumentPreview';

const Home = () => {
	const [hasStarted, setHasStarted] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [messages, setMessages] = useState([]);
	const [isThinking, setIsThinking] = useState(false);
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages, isThinking]);

	const handleSend = (promptText) => {
		const textToSend = promptText || inputValue;
		if (!textToSend.trim()) return;

		// Transition to chat mode
		setHasStarted(true);

		// Add user message with timestamp
		const userMsg = {
			role: 'user',
			content: textToSend,
			timestamp: new Date(),
		};
		setMessages((prev) => [...prev, userMsg]);
		setIsThinking(true);

		// Find matching response
		const matchedData = CHAT_DATA.find(
			(item) =>
				item.prompt.toLowerCase().trim() === textToSend.toLowerCase().trim(),
		);

		const responseContent = matchedData
			? matchedData.response
			: {
					intro:
						"I'm sorry, I don't have a standardized answer for that specific prompt yet. Please try asking: 'What is react js. give me some detailed overview on it.",
					sections: [],
					conclusion: '',
			  };

		setInputValue('');

		// Simulate thinking delay
		setTimeout(() => {
			setIsThinking(false);
			setMessages((prev) => [
				...prev,
				{ role: 'bot', content: responseContent, timestamp: new Date() },
			]);
		}, 2500);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div
			className={`flex flex-col h-full w-full bg-transparent relative transition-all duration-500 ${
				hasStarted ? 'justify-between' : 'items-center justify-center'
			}`}
		>
			{/* Messages Area */}
			{hasStarted && (
				<div
					className='flex-1 w-full max-w-3xl px-4 overflow-y-auto pt-8 pb-8 mx-auto custom-scrollbar'
					style={{ scrollbarGutter: 'stable' }}
				>
					{messages.map((msg, idx) => (
						<div
							key={idx}
							className={`mb-8 ${
								msg.role === 'user' ? 'flex justify-end' : ''
							}`}
						>
							{msg.role === 'user' ? (
								<div className='bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm max-w-[80%] text-gray-800 text-lg'>
									{msg.content}
								</div>
							) : (
								<BotResponse
									data={msg.content}
									timestamp={msg.timestamp}
									onPromptClick={handleSend}
								/>
							)}
						</div>
					))}

					{isThinking && <ThinkingState />}
					<div ref={messagesEndRef} />
				</div>
			)}

			{/* Hero Content */}
			{!hasStarted && (
				<div className='flex flex-col items-center w-full max-w-3xl px-4 -mt-20'>
					<h1 className='text-xl md:text-4xl font-serif text-gray-800 md:mb-10 tracking-tight'>
						<TextType
							text='What can I do for you today?'
							speed={50}
							className='text-gray-800'
						/>
					</h1>
				</div>
			)}

			{/* Input Area */}
			<div className='w-full px-3 sm:px-4 py-6 border-gray-100'>
				<div className='w-full max-w-3xl mx-auto'>
					<div
						className={`w-full bg-white rounded-[28px] border border-gray-200 hover:border-gray-500 shadow-sm transition-all duration-300 relative group ring-1 ring-black/5 ${
							hasStarted
								? 'shadow-lg border-gray-300'
								: 'hover:shadow-lg hover:border-gray-500'
						}`}
					>
						<textarea
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder='Ask anything...'
							className={`w-full resize-none outline-none font-normal text-base sm:text-lg placeholder:text-gray-400 bg-transparent -mb-3 custom-scrollbar ${
								hasStarted ? 'h-14 py-3 pr-12 pl-4' : 'h-14 p-4'
							}`}
						/>

						<div
							className={`flex items-center justify-between px-2 ${
								hasStarted ? 'absolute right-2 top-1.5' : 'mb-2'
							}`}
						>
							{!hasStarted && (
								<div className='flex items-center gap-2'>
									<button className='p-2 '>
										<Plus size={20} />
									</button>
									<button className='p-2 '>
										<ImageIcon size={20} />
									</button>
								</div>
							)}

							<div className='flex items-center gap-2 ml-auto'>
								{!hasStarted && (
									<button className='p-2 '>
										<Mic size={20} />
									</button>
								)}
								<button
									onClick={handleSend}
									className={`flex items-center justify-center rounded-full transition-all duration-200 ${
										inputValue.trim()
											? 'bg-black text-white hover:bg-gray-800'
											: 'bg-gray-100 text-gray-400'
									} ${hasStarted ? 'p-2 w-10 h-10' : 'p-2 w-10 h-10'}`}
								>
									<button className='p-2 '>
										<ArrowUp size={20} />
									</button>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const ThinkingState = () => {
	const [isExpanded, setIsExpanded] = useState(true);

	return (
		<div className='mb-8 w-full'>
			<div className='flex items-center gap-2 mb-2'>
				<span className='font-semibold text-sm text-gray-800'>AI Model</span>
				<span className='px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500 border border-gray-200'>
					Lite
				</span>
			</div>

			<div className='border-l-2 border-gray-200 pl-4 py-1 animate-pulse'>
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className='flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors'
				>
					<span className='text-sm font-medium'>Thinking process</span>
					{isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
				</button>
			</div>
		</div>
	);
};

const BotResponse = ({ data, timestamp, onPromptClick }) => {
	const [copied, setCopied] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const responseEndRef = useRef(null);

	// Auto-scroll as text types
	useEffect(() => {
		responseEndRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		});
	}, [currentStep]);

	// Flatten the data into a renderable sequence
	const sequence = React.useMemo(() => {
		const steps = [];
		// 1. Intro
		if (data.intro && !data.intro.includes("I'm sorry")) {
			steps.push({
				type: 'intro',
				text: data.intro,
				citation: {
					source: 'wikipedia.org',
					url: 'https://en.wikipedia.org/wiki/React_(software)',
				},
			});
		} else {
			steps.push({
				type: 'intro',
				text: data.intro,
			});
		}
		// 2. Sections
		if (data.sections) {
			data.sections.forEach((section) => {
				if (section.title) steps.push({ type: 'heading', text: section.title });
				if (section.items) {
					section.items.forEach((item) => {
						steps.push({ type: 'list-item', item: item });
					});
				}
			});
		}

		// 3. Conclusion
		if (data.conclusion)
			steps.push({ type: 'conclusion', text: data.conclusion });

		return steps;
	}, [data]);

	const handleNext = () => {
		if (currentStep < sequence.length) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	// Calculate when to show actions (after last step)
	const showActions = currentStep >= sequence.length;

	// Format timestamp
	const formatTime = (date) => {
		if (!date) return '11:18';
		const hours = date.getHours();
		const minutes = date.getMinutes();
		return `${hours}:${minutes.toString().padStart(2, '0')}`;
	};

	const handleCopy = () => {
		const textToCopy = [
			data.intro,
			...data.sections.map(
				(s) =>
					`${s.title}\n${s.items
						.map((i) => `- ${i.bold} ${i.text}`)
						.join('\n')}`,
			),
			data.conclusion,
		].join('\n\n');

		navigator.clipboard.writeText(textToCopy);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<div className='w-full text-gray-800 leading-relaxed space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 mb-8'>
				{/* Header Info */}
				<div className='flex items-center gap-2 relative -left-1 mb-2'>
					<span className='font-bold text-sm text-gray-900'>AI Model</span>
					<span className='px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500 border border-gray-200'>
						Lite
					</span>
					<span className='ml-auto text-xs text-gray-400'>
						{formatTime(timestamp)}
					</span>
				</div>

				{/* Sequential Rendering */}
				{sequence.map((step, index) => {
					// If this step is not yet reached, don't render
					if (index > currentStep) return null;

					// If it's the current step, it's animating. If it's a past step, it's static.
					const isAnimating = index === currentStep;

					return (
						<div
							key={index}
							className='block'
						>
							{step.type === 'intro' && (
								<p className='text-[17px] font-normal text-gray-700'>
									{isAnimating ? (
										<TextType
											text={step.text}
											speed={2}
											onComplete={handleNext}
										/>
									) : (
										<span>{step.text}</span>
									)}
									{(index < currentStep || !isAnimating) && step.citation && (
										<CitationChip
											data={step.citation}
											count='+2'
										/>
									)}
								</p>
							)}

							{step.type === 'heading' && (
								<h3 className='text-xl font-semibold text-gray-900 mt-6 mb-2'>
									{isAnimating ? (
										<TextType
											text={step.text}
											speed={15}
											onComplete={handleNext}
										/>
									) : (
										step.text
									)}
								</h3>
							)}

							{step.type === 'list-item' && (
								<div className='flex gap-2 ml-1 mb-2'>
									<div className='min-w-[4px] h-[4px] rounded-full bg-gray-400 mt-[10px]' />
									<div className='pl-2 my-0 leading-relaxed text-[17px]'>
										<span className='font-semibold text-gray-900'>
											{step.item.bold}{' '}
										</span>
										{isAnimating ? (
											<TextType
												text={step.item.text}
												speed={2}
												onComplete={handleNext}
											/>
										) : (
											<span className='text-gray-700'>{step.item.text}</span>
										)}
										{(index < currentStep || !isAnimating) &&
											step.item.citation && (
												<CitationChip
													data={step.item.citation}
													count='+1'
												/>
											)}
									</div>
								</div>
							)}

							{step.type === 'conclusion' && (
								<p className='text-[17px] font-normal text-gray-700 mt-6'>
									{isAnimating ? (
										<TextType
											text={step.text}
											speed={2}
											onComplete={handleNext}
										/>
									) : (
										step.text
									)}
								</p>
							)}
						</div>
					);
				})}

				{/* Actions (Only show when fully complete) */}
				{showActions && (
					<div
						className='flex flex-col gap-2 pt-4 opacity-0 animate-in fade-in duration-700 fill-mode-forwards'
						style={{ animationDelay: '0.5s', opacity: 1 }}
					>
						{data.document &&
							(() => {
								// Generate full document HTML from response data
								const fullDocumentHTML = `
							<h1 style="font-size: 28px; font-weight: bold; margin-bottom: 20px; color: #1a1a1a;">A Detailed Overview of ReactJS: Core Concepts, Architecture, and the 2025 Ecosystem</h1>
							
							<h2 style="font-size: 18px; font-weight: 600; margin-top: 24px; margin-bottom: 12px; color: #2c2c2c;">1. Introduction: Definition and Purpose</h2>
							<p style="margin-bottom: 16px; line-height: 1.6;">${data.intro}</p>
							
							${data.sections
								.map(
									(section, idx) => `
								<h2 style="font-size: 18px; font-weight: 600; margin-top: 24px; margin-bottom: 12px; color: #2c2c2c;">${
									idx + 2
								}. ${section.title}</h2>
								<ul style="margin-left: 20px; margin-bottom: 16px;">
									${section.items
										.map(
											(item) => `
										<li style="margin-bottom: 12px; line-height: 1.6;">
											<strong>${item.bold}</strong> ${item.text}
										</li>
									`,
										)
										.join('')}
								</ul>
							`,
								)
								.join('')}
							
							<h2 style="font-size: 18px; font-weight: 600; margin-top: 24px; margin-bottom: 12px; color: #2c2c2c;">Conclusion</h2>
							<p style="margin-bottom: 16px; line-height: 1.6;">${data.conclusion}</p>
						`;

								return (
									<div className='w-full'>
										<DocumentPreview
											title='A Detailed Overview of ReactJS.docx'
											content={fullDocumentHTML}
										/>
									</div>
								);
							})()}

						<div className='flex items-center justify-between w-full mt-1'>
							<div className='flex-1'></div>
							<button
								onClick={handleCopy}
								className='p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100'
								title='Copy response'
							>
								{copied ? (
									<Check
										size={16}
										className='text-green-500'
									/>
								) : (
									<Copy size={16} />
								)}
							</button>
						</div>

						{/* Prompt Suggestions */}
						<PromptSuggestions onPromptClick={onPromptClick} />
					</div>
				)}
			</div>
			<div ref={responseEndRef} />
		</>
	);
};

const CitationChip = ({ data, count }) => (
	<a
		href={data.url}
		target='_blank'
		rel='noopener noreferrer'
		className='inline-flex items-center gap-1 px-1.5 py-0.5 mx-1.5 bg-gray-100/80 rounded-md border border-gray-200/50 align-baseline cursor-pointer hover:bg-gray-200/80 transition-colors select-none no-underline'
		onClick={(e) => e.stopPropagation()} // Prevent parent clicks if any
	>
		<span className='text-[10px] text-gray-500 font-medium'>{data.source}</span>
		{count && <span className='text-[10px] text-gray-400'>{count}</span>}
		<img
			src={`https://www.google.com/s2/favicons?domain=${data.source}`}
			alt=''
			className='w-3 h-3 opacity-70'
		/>
	</a>
);

const PromptSuggestions = ({ onPromptClick }) => {
	return (
		<div className='mt-6 pt-4 border-t border-gray-200'>
			<h4 className='text-sm font-medium text-gray-500 mb-3'>Try asking:</h4>
			<div className='flex flex-col gap-2'>
				{CHAT_DATA.map((item) => (
					<button
						key={item.id}
						onClick={() => onPromptClick(item.prompt)}
						className='text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 text-sm text-gray-700 hover:text-gray-900'
					>
						{item.prompt}
					</button>
				))}
			</div>
		</div>
	);
};

export default Home;
