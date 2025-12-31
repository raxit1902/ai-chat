import React from 'react';
import { Bell, Zap } from 'lucide-react'; // Using Zap for the token icon likeness

const Navbar = () => {
	return (
		<div className='h-16 w-full flex items-center justify-between px-6 bg-white shrink-0 shadow-md'>
			<div className='flex items-center gap-2 cursor-pointer'>
				<span className='text-gray-600 font-medium text-sm'>AI Model</span>
				<svg
					className='w-3 h-3 text-gray-400'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M19 9l-7 7-7-7'
					></path>
				</svg>
			</div>

			<div className='flex items-center gap-4'>
				<button className='p-2 hover:bg-gray-100 rounded-full text-gray-500 relative'>
					<Bell size={18} />
					<span className='absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white'></span>
				</button>

				<div className='flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100'>
					<Zap
						size={14}
						className='text-gray-500'
					/>
					<span className='text-sm font-medium text-gray-600'>300</span>
				</div>

				<div className='w-8 h-8 rounded-full bg-gray-900 overflow-hidden flex items-center justify-center text-white text-xs'>
					{/* Placeholder for user avatar if image not available */}
					<div className='w-full h-full bg-gradient-to-tr from-gray-700 to-gray-900'></div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
