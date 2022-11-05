const Footer = () => {
    return (
        <footer className='flex flex-col justify-between h-[300px] bg-[#151515]  px-10 pt-10 text-[#eee] text-base z-50'>
            <div className='grid grid-cols-2 lg:grid-cols-2'>
                <div className='grid grid-cols-1 lg:grid-cols-3'>
                    <div className='bebas'>
                        <p className='py-3'>FIND A STORE</p>
                        <p className='py-'>BECOME A MEMBER</p>
                        <p className='py-2'>SIGN UP FOR EMAIL</p>
                        <p className='py-2'>SEND US FEEDBACK</p>
                    </div>
                    <div className="hidden lg:block">
                        <p className='bebas'>GET HELP</p>
                        <p className='text-xs py-2 text-[#eeeeee60]'>
                            Order Status
                        </p>
                        <p className='text-xs py-2 text-[#eeeeee60]'>
                            Delivery
                        </p>
                        <p className='text-xs py-2 text-[#eeeeee60]'>Returns</p>
                        <p className='text-xs py-2 text-[#eeeeee60]'>
                            Payment Options
                        </p>
                    </div>
                    <div className="hidden lg:block">
                        <p className=' bebas'>ABOUT NIKE</p>
                        <p className='text-xs py-2 text-[#eeeeee60]'>News</p>
                        <p className='text-xs py-2 text-[#eeeeee60]'>Careers</p>
                        <p className='text-xs py-2 text-[#eeeeee60]'>
                            Investors
                        </p>
                        <p className='text-xs py-2 text-[#eeeeee60]'>
                            Sustainability
                        </p>
                    </div>
                </div>
                <div className='flex justify-end '>
                    <span>
                        <i className='fa-brands fa-twitter text-2xl ml-4'></i>
                    </span>
                    <span>
                        <i className='fa-brands fa-facebook-f text-2xl ml-4'></i>
                    </span>
                    <span>
                        <i className='fa-brands fa-youtube text-2xl ml-4'></i>
                    </span>
                    <span>
                        <i className='fa-brands fa-instagram text-2xl ml-4'></i>
                    </span>
                </div>
            </div>
            <div className='px-0 lg:px-8 flex justify-between py-4'>
                <div className='flex items-center'>
                    <span className='mr-2'>
                        <i className='fa-solid fa-location-dot'></i>
                    </span>
                    <p className='text-xs'>
                        VIET NAM, © {new Date().getFullYear()} Nike, Inc. All
                        Rights Reserved
                    </p>
                </div>
                <div className='hidden lg:flex list-none text-xs text-[#eeeeee60]'>
                    <li className='ml-4'>Guides</li>{' '}
                    <li className='ml-4'>Terms of Sale</li>{' '}
                    <li className='ml-4'>Terms of Use</li>{' '}
                    <li className='ml-4'>Nike Privacy Policy</li>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
