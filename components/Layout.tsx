import React, { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import SideBarAdmin from './SideBarAdmin';

type Props = {
    children: ReactNode;
    admin?: boolean;
};

const Layout = ({ children, admin }: Props) => {
    return admin ? (
        <div>
            <Header />
            <div>
                <div className='flex mt-20'>
                    <SideBarAdmin />
                    <div className='flex-1 lg:ml-[25%]'>{children}</div>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <Header />
            <div className='mt-20'>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
