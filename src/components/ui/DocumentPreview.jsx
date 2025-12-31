import React, { useState, useEffect, useRef } from 'react';
import { FileText, MoreHorizontal, Download, Eye } from 'lucide-react';
import DocumentModal from './DocumentModal';

const DocumentPreview = ({ title = 'Document', content }) => {
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleDownload = () => {
		// Mock download - in a real app this would use a URL
		const element = document.createElement('a');
		const file = new Blob([content], { type: 'text/plain' });
		element.href = URL.createObjectURL(file);
		element.download = title;
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
		setShowMenu(false);
	};

	const handlePreview = () => {
		setShowMenu(false);
		setShowModal(true);
	};

	return (
		<>
			<div className='w-full max-w-md border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group mb-2 relative'>
				{/* Header */}
				<div className='flex items-center justify-between p-3 border-b border-gray-100 bg-gray-50/50'>
					<div className='flex items-center gap-3'>
						<div className='flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg'>
							<FileText
								size={16}
								className='text-blue-600'
							/>
						</div>
						<div className='flex flex-col'>
							<span
								className='text-sm font-semibold text-gray-800 truncate max-w-[200px]'
								title={title}
							>
								{title}
							</span>
							<span className='text-[10px] text-gray-400'>DOCX • 14KB</span>
						</div>
					</div>
					<div
						className='relative'
						ref={menuRef}
					>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setShowMenu(!showMenu);
							}}
							className='p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors'
						>
							<MoreHorizontal size={16} />
						</button>

						{/* Flyout Menu */}
						{showMenu && (
							<div className='absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10 animate-in fade-in zoom-in-95 duration-200'>
								<button
									onClick={(e) => {
										e.stopPropagation();
										handlePreview();
									}}
									className='w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left'
								>
									<Eye size={14} />
									<span>Preview</span>
								</button>
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleDownload();
									}}
									className='w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left'
								>
									<Download size={14} />
									<span>Download</span>
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Content Preview */}
				<div
					className='p-4 bg-white relative h-40 overflow-hidden'
					onClick={handlePreview}
				>
					<div
						className='text-xs text-gray-700 leading-relaxed'
						dangerouslySetInnerHTML={{ __html: content }}
						style={{
							maxHeight: '100%',
							overflow: 'hidden',
						}}
					/>

					{/* Gradient Fade to Bottom */}
					<div className='absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none'></div>
				</div>
			</div>

			<DocumentModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				title={title}
				initialContent={content}
			/>
		</>
	);
};

export default DocumentPreview;
