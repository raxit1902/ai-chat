import React from 'react';
import { SquarePen, Search, Library, Settings, User } from 'lucide-react';

const Sidebar = () => {
	return (
		<div className='h-screen w-16 flex flex-col items-center py-4 border-r border-gray-100 justify-between shadow-lg'>
			<div className='flex flex-col gap-6'>
				<button className='p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600'>
					<SquarePen size={20} />
				</button>
				<button className='p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600'>
					<Search size={20} />
				</button>
				<button className='p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600'>
					<Library size={20} />
				</button>
			</div>

			<div className='flex flex-col gap-4'>
				<button className='p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600'>
					<User size={20} />
				</button>
				<button className='p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600'>
					<Settings size={20} />
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
