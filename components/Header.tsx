import { onAuthStateChanged, signOut } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { images } from '../assets/images';
import { auth } from '../firebase/config';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { activeUser, removeUser } from '../redux/slice/authSlice';
import Tippy from '@tippyjs/react/headless';
import Tooltip from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import NavLink from './NavLink';
import { useTheme } from 'next-themes';

const Header = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.cart.products);

    const [username, setUsername] = useState<string | null>('');
    const [open, setOpen] = useState(false);
    const themeRef = useRef<any>(null);
    const themeMobileRef = useRef<any>(null);
    const [admin,setAdmin]=useState<string | null>('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsername(user.displayName);
                setAdmin(user.email)
                if (!user.displayName) {
                    setUsername(user.email);
                }
                dispatch(
                    activeUser({
                        email: user.email,
                        username: user.displayName,
                        userID: user.uid,
                    })
                );
            } else {
                setUsername('');
                dispatch(removeUser());
            }
        });
    }, [username, dispatch]);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            toast.success('Log out Successful...!');
            router.push('/login');
        });
    };

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        if (!!currentTheme) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            themeRef.current && (themeRef.current.checked = true);
            themeMobileRef.current && (themeMobileRef.current.checked = true);
        }
    }, []);

    const handleChangeTheme = (e: any) => {
        if (e.target.checked) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.removeItem('theme');
        }
    };

    return (
        <header className='h-20 p-4 z-10 border-b-[1px] border-zinc-300 dark:border-zinc-600 fixed top-0 ring-0 left-0 w-full bg-white dark:bg-[#151515]'>
            <div className='px-4 hidden lg:flex items-center h-full justify-between'>
                <Link href='/'>
                    <a>
                        <Image
                            src={images.logo}
                            width={100}
                            height={50}
                            alt='logo'
                        />
                    </a>
                </Link>
                <ul className='flex items-center  tracking-widest justify-between font-medium text-xl cursor-pointer text-[#252525] dark:text-[#ddd]'>
                    {admin === 'admin@gmail.com' && (
                        <Link href='/admin'>
                            <a className='h-10 w-24 flex justify-center items-center bg-blue-400 rounded text-white hover:bg-blue-500 transition-colors'>
                                ADMIN
                            </a>
                        </Link>
                    )}
                    <li className='px-4'>
                        <NavLink href='/' title='HOME' />
                    </li>
                    <li className='px-4'>
                        <NavLink href='/man' title='MAN' />
                    </li>
                    <li className='px-4'>
                        <NavLink href='/woman' title='WOMAN' />
                    </li>
                    <li className='px-4'>
                        <NavLink href='/kids' title='KIDS' />
                    </li>
                </ul>

                <div className='flex justify-center items-center'>
                    <div className='flex items-center justify-center'>
                        <span className='px-2 text-[#151515] dark:text-[#ddd] font-medium'>
                            DarkMode :{' '}
                        </span>
                        <label htmlFor='theme' className='theme mr-4'>
                            <input
                                type='checkbox'
                                name='theme'
                                id='theme'
                                className='hidden'
                                ref={themeRef}
                                onChange={handleChangeTheme}
                            />
                        </label>
                        <button>
                            <Tooltip content='My Bag'>
                                <Link href='/my-bag'>
                                    <a className='text-pink-400 relative'>
                                        <i className='fa-solid fa-cart-shopping text-2xl mr-5'></i>
                                        <span className='absolute -top-4 left-4 h-5 w-5 bg-pink-400 text-white rounded-full text-sm'>{products.length}</span>
                                    </a>
                                </Link>
                            </Tooltip>
                        </button>
                        <Tippy
                            interactive
                            placement='bottom-start'
                            render={(attrs) => (
                                <div
                                    className='bg-gray-200 rounded w-52 min-h-[160px]'
                                    tabIndex={-1}
                                    {...attrs}
                                >
                                    {username ? (
                                        <div className='flex flex-col text-pink-400 rounded'>
                                            <strong className='flex h-14 w-full justify-center items-center rounded bg-slate-300'>
                                                Hi, {username}
                                            </strong>
                                            <Link href='/my-account'>
                                                <a className='flex hover:bg-[#ffffff39] h-12 w-full justify-center items-center rounded'>
                                                    My Account
                                                </a>
                                            </Link>
                                            <Link href='/my-orders'>
                                                <a className='flex hover:bg-[#ffffff39] h-12 w-full justify-center items-center rounded'>
                                                    My Orders
                                                </a>
                                            </Link>
                                            <button
                                                className='h-12 w-full hover:bg-[#ffffff39] transition-colors flex justify-center items-center rounded'
                                                onClick={handleSignOut}
                                            >
                                                SIGN OUT
                                            </button>
                                        </div>
                                    ) : (
                                        <Link href='/login'>
                                            <a className='h-12 hover:bg-slate-400 bg-slate-300 transition-colors flex justify-center items-center rounded-lg w-full text-pink-400 hover:text-pink-500'>
                                                {' '}
                                                SIGN IN
                                            </a>
                                        </Link>
                                    )}
                                </div>
                            )}
                        >
                            <span className='text-pink-400'>
                                <i className='fa-regular fa-circle-user text-3xl cursor-pointer'></i>
                            </span>
                        </Tippy>
                    </div>
                </div>
            </div>
            <div className='flex lg:hidden items-center justify-between'>
                <Link href='/'>
                    <a>
                        <Image
                            src={images.logo}
                            width={100}
                            height={50}
                            alt='logo'
                        />
                    </a>
                </Link>
                <div className='flex justify-center items-center'>
                    <div className='flex items-center justify-center'>
                        <button>
                            <Tooltip content='My Bag'>
                                <i className='fa-solid fa-cart-shopping text-2xl mr-5 text-pink-400'></i>
                            </Tooltip>
                        </button>

                        <span
                            className='text-pink-400'
                            onClick={() => setOpen(true)}
                        >
                            <i className='fa-solid fa-bars text-3xl ml-2 cursor-pointer'></i>
                        </span>
                        {open && (
                            <div
                                className='fixed h-full w-full right-0 top-0 bottom-0 bg-[#00000090] flex justify-end '
                                onClick={() => setOpen(false)}
                            >
                                <ul
                                    className=' flex items-start w-2/3 tracking-widest flex-col  font-medium text-xl cursor-pointer text-[#ffffffae] bg-zinc-800 p-10 m-sidebar'
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <li className='flex justify-between w-full h-14'>
                                        <p>Dark</p>
                                        <label
                                            htmlFor='themeMobile'
                                            className='theme mr-2'
                                        >
                                            <input
                                                type='checkbox'
                                                name='theme'
                                                id='themeMobile'
                                                className='hidden'
                                                ref={themeMobileRef}
                                                onChange={handleChangeTheme}
                                            />
                                        </label>
                                    </li>
                                    <li
                                        className='h-14 w-full transition-all'
                                        onClick={() => setOpen(false)}
                                    >
                                        <NavLink href='/' title='HOME' />
                                    </li>
                                    <li
                                        className='h-14 w-full transition-all'
                                        onClick={() => setOpen(false)}
                                    >
                                        <NavLink href='/man' title='MEN' />
                                    </li>
                                    <li
                                        className='h-14 w-full transition-all'
                                        onClick={() => setOpen(false)}
                                    >
                                        <NavLink href='/woman' title='WOMAN' />
                                    </li>
                                    <li
                                        className='h-14 w-full transition-all'
                                        onClick={() => setOpen(false)}
                                    >
                                        <NavLink href='/kids' title='KIDS' />
                                    </li>
                                    {username && <li
                                        className='h-14 w-full transition-all'
                                        onClick={() => setOpen(false)}
                                    >
                                        <NavLink href='/my-orders' title='My ORDERS' />
                                    </li>}
                                    {username === 'admin' && (
                                        <Tippy
                                            interactive
                                            trigger='click'
                                            placement='bottom'
                                            offset={[20, -20]}
                                            render={(attrs) => (
                                                <div
                                                    className='bg-zinc-800 rounded w-40 transition-all'
                                                    tabIndex={-1}
                                                    {...attrs}
                                                >
                                                    <div>
                                                        <li
                                                            className='h-12 w-40 transition-all text-base'
                                                            onClick={() =>
                                                                setOpen(false)
                                                            }
                                                        >
                                                            <NavLink
                                                                href='/admin'
                                                                title='HOME'
                                                            />
                                                        </li>
                                                        <li
                                                            className='h-12 w-40 transition-all text-base'
                                                            onClick={() =>
                                                                setOpen(false)
                                                            }
                                                        >
                                                            <NavLink
                                                                href='/admin/all-products'
                                                                title='All products'
                                                            />
                                                        </li>
                                                        <li
                                                            className='h-12 w-40 transition-all text-base'
                                                            onClick={() =>
                                                                setOpen(false)
                                                            }
                                                        >
                                                            <NavLink
                                                                href='/admin/add-products'
                                                                title='Add products'
                                                            />
                                                        </li>
                                                        <li
                                                            className='h-12 w-40 transition-all text-base'
                                                            onClick={() =>
                                                                setOpen(false)
                                                            }
                                                        >
                                                            <NavLink
                                                                href='/admin/orders'
                                                                title='Orders'
                                                            />
                                                        </li>
                                                    </div>
                                                </div>
                                            )}
                                        >
                                            <li className='h-20 w-full transition-all flex justify-between'>
                                                <span>ADMIN</span>
                                                <span>
                                                    <i className='fa-solid fa-plus'></i>
                                                </span>
                                            </li>
                                        </Tippy>
                                    )}

                                     
                                    {username ? (
                                        <li
                                            className='absolute bottom-0 h-16 w-full transition-all border-t-[1px] border-neutral-600 flex items-center'
                                            onClick={handleSignOut}
                                        >
                                            <span>SIGN OUT</span>
                                        </li>
                                    ) : (
                                        <li className='h-20 w-full transition-all border-t-[1px] border-neutral-600 flex items-center'>
                                            <Link href='/login'>
                                                <a>SIGN IN</a>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
