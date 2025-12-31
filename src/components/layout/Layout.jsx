import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
	return (
		<div className='flex h-screen w-screen bg-[#f9fafb] overflow-hidden font-sans'>
			<Sidebar />
			<div className='flex-1 flex flex-col h-full w-full relative'>
				<Navbar />
				<main className='flex-1 overflow-y-auto w-full relative'>
					{children}
				</main>
			</div>
		</div>
	);
};

export default Layout;
