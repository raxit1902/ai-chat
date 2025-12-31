import React, { useState, useRef, useEffect } from 'react';
import {
	X,
	Download,
	Share2,
	FileText,
	Bold,
	Italic,
	Underline,
	List,
} from 'lucide-react';

const DocumentModal = ({ isOpen, onClose, title, initialContent }) => {
	const [isSaving, setIsSaving] = useState(false);
	const editorRef = useRef(null);
	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isOpen && editorRef.current && isInitialMount.current) {
			// Set initial content only on first mount
			editorRef.current.innerHTML = initialContent || '';
			isInitialMount.current = false;
		}

		// Reset when modal closes
		if (!isOpen) {
			isInitialMount.current = true;
		}
	}, [isOpen, initialContent]);

	if (!isOpen) return null;

	const handleDownload = () => {
		setIsSaving(true);
		setTimeout(() => {
			const plainText = editorRef.current ? editorRef.current.innerText : '';

			const element = document.createElement('a');
			const file = new Blob([plainText], { type: 'text/plain' });
			element.href = URL.createObjectURL(file);
			element.download = title;
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);

			setIsSaving(false);
		}, 800);
	};

	const execCommand = (command) => {
		document.execCommand(command, false, null);
		editorRef.current.focus();
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200'>
			<div
				className='bg-white w-[90vw] h-[85vh] max-w-5xl rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white'>
					<div className='flex items-center gap-4'>
						<div className='bg-blue-600 p-2 rounded-lg'>
							<FileText
								className='text-white'
								size={20}
							/>
						</div>
						<div>
							<h2 className='text-lg font-semibold text-gray-800 leading-none'>
								{title}
							</h2>
							<span className='text-xs text-gray-500 mt-1 block'>
								Last modified: Just now
							</span>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<button
							onClick={handleDownload}
							className='flex items-center gap-2 px-6 py-2 bg-black text-white hover:bg-gray-800 rounded-full transition-all shadow-md hover:shadow-lg text-sm font-medium'
						>
							{isSaving ? (
								<span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
							) : (
								<Download size={16} />
							)}
							<span>{isSaving ? 'Downloading...' : 'Download'}</span>
						</button>
						<button
							onClick={onClose}
							className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors ml-2'
						>
							<X size={24} />
						</button>
					</div>
				</div>

				{/* Simple Toolbar */}
				<div className='flex items-center gap-1 px-6 py-2 border-b border-gray-100 bg-gray-50'>
					<ToolbarButton
						icon={<Bold size={18} />}
						onClick={() => execCommand('bold')}
						label='Bold'
					/>
					<ToolbarButton
						icon={<Italic size={18} />}
						onClick={() => execCommand('italic')}
						label='Italic'
					/>
					<ToolbarButton
						icon={<Underline size={18} />}
						onClick={() => execCommand('underline')}
						label='Underline'
					/>
					<div className='w-px h-6 bg-gray-300 mx-2' />
					<ToolbarButton
						icon={<List size={18} />}
						onClick={() => execCommand('insertUnorderedList')}
						label='List'
					/>
				</div>

				{/* Editor Body */}
				<div className='flex-1 overflow-hidden bg-gray-50 flex justify-center p-8 overflow-y-auto custom-scrollbar'>
					<div
						className='w-full max-w-4xl bg-white shadow-sm min-h-full border border-gray-200/60 rounded-sm p-12 cursor-text'
						onClick={() => editorRef.current?.focus()}
					>
						<div
							ref={editorRef}
							className='outline-none min-h-[600px] text-gray-800 text-lg leading-relaxed'
							contentEditable
							suppressContentEditableWarning
						/>
					</div>
				</div>
			</div>

			<style>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background-color: #d1d5db;
                  border-radius: 4px;
                }
            `}</style>
		</div>
	);
};

const ToolbarButton = ({ icon, onClick, label }) => (
	<button
		onClick={onClick}
		className='p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors'
		title={label}
	>
		{icon}
	</button>
);

export default DocumentModal;
