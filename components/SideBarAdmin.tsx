import React from 'react';
import NavLink from './NavLink';

type Props = {};

const SideBarAdmin = (props: Props) => {
    return (
        <aside className='hidden lg:block w-1/4 bg-gray-50 h-[100vh] fixed dark:bg-zinc-800' >
            <div className='h-40 flex items-center justify-center'>
                <p className='flex flex-col items-center'>
                    <i className='fa-solid fa-key text-5xl'></i>
                    <span className='text-2xl'>ADMIN</span>
                </p>
            </div>
            <ul className='flex flex-col items-center mt-8'>
                <li className='h-16 w-64 rounded-full flex items-center justify-center mb-4 font-semibold border-2 border-black dark:border-white transition-colors'>
                    <NavLink admin href='/admin' title='HOME' />
                </li>
                <li className='h-16 w-64 rounded-full flex items-center justify-center mb-4 font-semibold border-2 border-black dark:border-white transition-colors'>
                    <NavLink admin href='/admin/all-products' title='VIEW PRODUCTS' />
                </li>
                <li className='h-16 w-64 rounded-full flex items-center justify-center mb-4 font-semibold border-2 border-black dark:border-white transition-colors'>
                    <NavLink admin href='/admin/add-products' title='ADD PRODUCTS' />
                </li>
                <li className='h-16 w-64 rounded-full flex items-center justify-center mb-4 font-semibold border-2 border-black dark:border-white transition-colors'>
                    <NavLink admin href='/admin/orders' title='VIEW ORDERS' />
                </li>
            </ul>
        </aside>
    );
};

export default SideBarAdmin;
