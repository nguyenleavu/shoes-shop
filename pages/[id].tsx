import { useRouter } from 'next/router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase/config';
import { ProductType } from '../config/@type';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ModalSizes from '../components/ModalSizes';
import { addCart } from '../redux/slice/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {};

const myLoader = ({ src }: any) => {
    return src;
};

const Cart = (props: Props) => {
    const router = useRouter();
    const [cart, setCart] = useState<ProductType>();
    const [size, setSize] = useState(42);
    const [color, setColor] = useState('');
    const [modal, setModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const dispatch = useAppDispatch();

    const userLogin = useAppSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        const fetchAPI = async () => {
            if (router.query.id) {
                const q = query(
                    collection(db, 'man'),
                    where('id', '==', router.query.id)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc: any) => {
                    setCart(doc.data());
                });
            }
        };
        fetchAPI();
    }, [router.query.id]);

    const handleAddCart = () => {
        if (cart) {
            dispatch(
                addCart({
                    name: cart.name,
                    image: cart.image,
                    id: cart.id,
                    colorText: 'Sail/White/Metallic Gold/Blue Jay',
                    introduce: cart.introduce,
                    price: cart.price,
                    size,
                    color,
                    quantity,
                })
            );
            toast.success('Add to Bag Successfully !');
        }
    };

    return cart ? (
        <>
            {modal && <ModalSizes setModal={() => setModal(false)} />}
            <div className='hidden lg:flex px-10 2xl:px-20 py-20'>
                <div className='flex-1 grid grid-cols-2 gap-4'>
                    {cart.other.map((img, index) => (
                        <Image
                            key={index}
                            loader={myLoader}
                            unoptimized={true}
                            src={img}
                            alt={cart.name}
                            priority={true}
                            width={1000}
                            height={1000}
                        />
                    ))}
                </div>
                <div className='w-1/3 px-10 text-base max-w-md text-[#151515] dark:text-[#ddd]'>
                    <h1 className='font-medium text-3xl tracking-wide'>
                        {cart.name}
                    </h1>
                    <p className='text-base'>{cart.introduce}</p>
                    <span className='block py-3 tracking-widest text-xl font-semibold'>
                        {cart.price}$
                    </span>
                    <div className='grid grid-cols-4 gap-2 mt-4'>
                        {cart.color.map((color, index) => (
                            <div key={index}>
                                <input
                                    className='colorInput'
                                    name='color'
                                    onChange={() => setColor(color)}
                                    type='radio'
                                    id={color}
                                />
                                <label
                                    htmlFor={color}
                                    cursor-pointer='true'
                                    className='cursor-pointer'
                                >
                                    <Image
                                        loader={myLoader}
                                        unoptimized={true}
                                        src={color}
                                        alt={color}
                                        priority={true}
                                        width={70}
                                        height={70}
                                        className='rounded-lg'
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-between items-center mt-8'>
                        <span className=''>Quantity</span>
                        <div>
                            {quantity > 1 && (
                                <span
                                    onClick={() => setQuantity(quantity - 1)}
                                    className='cursor-pointer'
                                >
                                    <i className='fa-solid fa-minus mr-4 text-xl'></i>
                                </span>
                            )}
                            <span className='text-xl'>{quantity}</span>
                            <span
                                onClick={() => setQuantity(quantity + 1)}
                                className='cursor-pointer'
                            >
                                <i className='fa-solid fa-plus ml-4 text-xl'></i>
                            </span>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <div className='flex items-center justify-between'>
                            <span>Select Size</span>
                            <span
                                className='cursor-pointer text-zinc-600 dark:text-zinc-400'
                                data-modal-toggle='modal'
                                onClick={() => setModal(true)}
                            >
                                Size Guide
                            </span>
                        </div>
                        <ul className='grid grid-cols-3 gap-2 mt-4 size '>
                            <li>
                                <input
                                    name='size'
                                    type='radio'
                                    onChange={(e) => setSize(39)}
                                    value={39}
                                    id='39'
                                    className='opacity-0 absolute'
                                />
                                <label
                                    cursor-pointer='true'
                                    htmlFor='39'
                                    className='flex items-center justify-center border-[1px] border-neutral-300 dark:border-neutral-600  h-12 rounded-lg transition-all cursor-pointer    '
                                >
                                    EU 39
                                </label>
                            </li>
                            <li>
                                <input
                                    name='size'
                                    type='radio'
                                    onChange={() => setSize(40)}
                                    value={40}
                                    id='40'
                                    className='opacity-0 absolute'
                                />
                                <label
                                    htmlFor='40'
                                    cursor-pointer='true'
                                    className='flex items-center justify-center border-[1px] border-neutral-300 dark:border-neutral-600  h-12 rounded-lg transition-all cursor-pointer   '
                                >
                                    EU 40
                                </label>
                            </li>
                            <li>
                                <input
                                    name='size'
                                    type='radio'
                                    onChange={() => setSize(41)}
                                    value={41}
                                    id='41'
                                    className='opacity-0 absolute'
                                />
                                <label
                                    htmlFor='41'
                                    cursor-pointer='true'
                                    className=' flex items-center justify-center border-[1px] border-neutral-300  dark:border-neutral-600 h-12 rounded-lg transition-all cursor-pointer'
                                >
                                    EU 41
                                </label>
                            </li>
                            <li>
                                <input
                                    name='size'
                                    type='radio'
                                    value={42}
                                    onChange={() => setSize(42)}
                                    id='42'
                                    defaultChecked={true}
                                    className='opacity-0 absolute'
                                />
                                <label
                                    htmlFor='42'
                                    cursor-pointer='true'
                                    className='flex items-center justify-center border-[1px] border-neutral-300 dark:border-neutral-600  h-12 rounded-lg transition-all cursor-pointer'
                                >
                                    EU 42
                                </label>
                            </li>
                            <li>
                                <input
                                    name='size'
                                    type='radio'
                                    onChange={() => setSize(43)}
                                    value={43}
                                    id='43'
                                    className='opacity-0 absolute'
                                />
                                <label
                                    htmlFor='43'
                                    cursor-pointer='true'
                                    className='flex items-center justify-center border-[1px] border-neutral-300 dark:border-neutral-600  h-12 rounded-lg transition-all cursor-pointer   '
                                >
                                    EU 43
                                </label>
                            </li>
                            <li>
                                <input
                                    name='size'
                                    type='radio'
                                    onChange={() => setSize(44)}
                                    value={44}
                                    id='44'
                                    className='opacity-0 absolute'
                                />
                                <label
                                    htmlFor='44'
                                    cursor-pointer='true'
                                    className='flex items-center justify-center border-[1px] border-neutral-300 dark:border-neutral-600  h-12 rounded-lg transition-all cursor-pointer   '
                                >
                                    EU 44
                                </label>
                            </li>
                            <li>
                                <input
                                    name='size'
                                    type='radio'
                                    onChange={() => setSize(45)}
                                    value={45}
                                    id='45'
                                    className='opacity-0 absolute'
                                />
                                <label
                                    htmlFor='45'
                                    cursor-pointer='true'
                                    className='flex items-center justify-center border-[1px] border-neutral-300 dark:border-neutral-600  h-12 rounded-lg transition-all cursor-pointer   '
                                >
                                    EU 45
                                </label>
                            </li>
                            <li>
                                <input
                                    name='size'
                                    type='radio'
                                    onChange={() => setSize(46)}
                                    value={46}
                                    id='46'
                                    className='opacity-0 absolute'
                                />
                                <label
                                    htmlFor='46'
                                    cursor-pointer='true'
                                    className='flex items-center justify-center border-[1px] border-neutral-300 dark:border-neutral-600  h-12 rounded-lg transition-all cursor-pointer   '
                                >
                                    EU 46
                                </label>
                            </li>
                            <li>
                                <input
                                    name='size'
                                    type='radio'
                                    onChange={() => setSize(47)}
                                    value={47}
                                    id='47'
                                    className='opacity-0 absolute'
                                />
                                <label
                                    htmlFor='47'
                                    cursor-pointer='true'
                                    className='flex items-center justify-center border-[1px] border-neutral-300 dark:border-neutral-600  h-12 rounded-lg transition-all cursor-pointer   '
                                >
                                    EU 47
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className='mt-16'>
                        {userLogin ? (
                            <button
                                className='w-full h-16 rounded-full bg-black dark:bg-white dark:text-[#151515] dark:hover:bg-zinc-300 text-[#eee] hover:bg-zinc-800 transition-colors'
                                onClick={handleAddCart}
                            >
                                Add to Bag
                            </button>
                        ) : (
                            <button
                                className='w-full h-16 rounded-full bg-black dark:bg-white dark:text-[#151515] dark:hover:bg-zinc-300 text-[#eee] hover:bg-zinc-800 transition-colors'
                                onClick={() => router.push('/login')}
                            >
                                Sign In to Buy
                            </button>
                        )}
                        
                    </div>
                    <p className='mt-12'>{cart.description}</p>
                    <ul className='list-disc ml-4 py-8'>
                        <li>Color Shown: Black/Anthracite/White/Chile Red</li>
                        <li className='mt-2'>Style: {cart.code}</li>
                    </ul>
                    <div className='flex items-center justify-between'>
                        <span className='text-xl'>Vote</span>
                        {cart.vote && cart.vote < 5 ? (
                            <div className='text-xl'>
                                <i className='fa-regular fa-star'></i>
                                <i className='fa-regular fa-star'></i>
                                <i className='fa-regular fa-star'></i>
                                <i className='fa-regular fa-star'></i>
                            </div>
                        ) : (
                            <div className='text-xl'>
                                <i className='fa-regular fa-star'></i>
                                <i className='fa-regular fa-star'></i>
                                <i className='fa-regular fa-star'></i>
                                <i className='fa-regular fa-star'></i>
                                <i className='fa-regular fa-star'></i>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='lg:hidden'>
                <div className='px-8 pb-8 pt-16 '>
                    <h1 className='text-2xl font-medium tracking-wide'>
                        {cart.name}
                    </h1>
                    <p className='text-base'>{cart.introduce}</p>
                    <span className='block py-4 text-xl font-medium tracking-wider'>
                        {cart.price}$
                    </span>
                </div>
                <Carousel
                    showArrows={true}
                    showThumbs={false}
                    autoPlay
                    autoFocus
                    infiniteLoop
                    showStatus
                    showIndicators
                    useKeyboardArrows
                    swipeable
                    dynamicHeight={true}
                    emulateTouch
                >
                    {cart.other.map((img, index) => (
                        <Image
                            key={index}
                            loader={myLoader}
                            unoptimized={true}
                            src={img}
                            alt={cart.name}
                            priority={true}
                            width={1000}
                            height={1000}
                        />
                    ))}
                </Carousel>
                <div className='grid grid-cols-4 gap-2 mt-4 px-2'>
                    {cart.color.map((color, index) => (
                        <div key={index} className='cursor-pointer'>
                            <input
                                className='colorInputMobile'
                                name='color'
                                onChange={() => setColor(color)}
                                type='radio'
                                id={`${color} ${index}`}
                            />
                            <label
                                htmlFor={`${color} ${index}`}
                                cursor-pointer='true'
                            >
                                <Image
                                    loader={myLoader}
                                    unoptimized={true}
                                    src={color}
                                    alt={color}
                                    priority={true}
                                    width={80}
                                    height={80}
                                    className='rounded-lg'
                                />
                            </label>
                        </div>
                    ))}
                </div>
                <div className='mt-10 px-8'>
                    <div className='flex items-center justify-between px-1'>
                        <span>Select Size</span>
                        <span className='cursor-pointer text-zinc-600'>
                            Size Guide
                        </span>
                    </div>
                    <ul className='grid grid-cols-3 gap-2 mt-4 size '>
                        <li>
                            <input
                                name='size'
                                type='radio'
                                onChange={(e) => setSize(39)}
                                value={39}
                                id='size39'
                                className='opacity-0 absolute'
                            />
                            <label
                                cursor-pointer='true'
                                htmlFor='size39'
                                className='flex items-center justify-center border-[1px] border-neutral-300 h-12 rounded-lg transition-all'
                            >
                                EU 39
                            </label>
                        </li>
                        <li>
                            <input
                                name='size'
                                type='radio'
                                onChange={() => setSize(40)}
                                value={40}
                                id='size40'
                                className='opacity-0 absolute'
                            />
                            <label
                                htmlFor='size40'
                                cursor-pointer='true'
                                className='flex items-center justify-center border-[1px] border-neutral-300 h-12 rounded-lg transition-all'
                            >
                                EU 40
                            </label>
                        </li>
                        <li>
                            <input
                                name='size'
                                type='radio'
                                onChange={() => setSize(41)}
                                value={41}
                                id='size41'
                                className='opacity-0 absolute'
                            />
                            <label
                                htmlFor='size41'
                                cursor-pointer='true'
                                className=' flex items-center justify-center border-[1px] border-neutral-300 h-12 rounded-lg transition-all'
                            >
                                EU 41
                            </label>
                        </li>
                        <li>
                            <input
                                name='size'
                                type='radio'
                                value={42}
                                onChange={() => setSize(42)}
                                id='size42'
                                defaultChecked={true}
                                className='opacity-0 absolute'
                            />
                            <label
                                htmlFor='size42'
                                cursor-pointer='true'
                                className='flex items-center justify-center border-[1px] border-neutral-300 h-12 rounded-lg transition-all'
                            >
                                EU 42
                            </label>
                        </li>
                        <li>
                            <input
                                name='size'
                                type='radio'
                                onChange={() => setSize(43)}
                                value={43}
                                id='size43'
                                className='opacity-0 absolute'
                            />
                            <label
                                htmlFor='size43'
                                cursor-pointer='true'
                                className='flex items-center justify-center border-[1px] border-neutral-300 h-12 rounded-lg transition-all'
                            >
                                EU 43
                            </label>
                        </li>
                        <li>
                            <input
                                name='size'
                                type='radio'
                                onChange={() => setSize(44)}
                                value={44}
                                id='size44'
                                className='opacity-0 absolute'
                            />
                            <label
                                htmlFor='size44'
                                cursor-pointer='true'
                                className='flex items-center justify-center border-[1px] border-neutral-300 h-12 rounded-lg transition-all'
                            >
                                EU 44
                            </label>
                        </li>
                        <li>
                            <input
                                name='size'
                                type='radio'
                                onChange={() => setSize(45)}
                                value={45}
                                id='size45'
                                className='opacity-0 absolute'
                            />
                            <label
                                htmlFor='size45'
                                cursor-pointer='true'
                                className='flex items-center justify-center border-[1px] border-neutral-300 h-12 rounded-lg transition-all'
                            >
                                EU 45
                            </label>
                        </li>
                        <li>
                            <input
                                name='size'
                                type='radio'
                                onChange={() => setSize(46)}
                                value={46}
                                id='size46'
                                className='opacity-0 absolute'
                            />
                            <label
                                htmlFor='size46'
                                cursor-pointer='true'
                                className='flex items-center justify-center border-[1px] border-neutral-300 h-12 rounded-lg transition-all'
                            >
                                EU 46
                            </label>
                        </li>
                        <li>
                            <input
                                name='size'
                                type='radio'
                                onChange={() => setSize(47)}
                                value={47}
                                id='size47'
                                className='opacity-0 absolute'
                            />
                            <label
                                htmlFor='size47'
                                cursor-pointer='true'
                                className='flex items-center justify-center border-[1px] border-neutral-300 h-12 rounded-lg transition-all'
                            >
                                EU 47
                            </label>
                        </li>
                    </ul>
                </div>
                <div className='mt-4 px-8'>
                    {userLogin ? (
                        <button className='w-full h-16 rounded-full bg-black text-[#eee] hover:bg-zinc-800 transition-colors dark:bg-white dark:text-[#151515]'>
                            Add to Bag
                        </button>
                    ) : (
                        <button
                            className='w-full h-16 rounded-full bg-black text-[#eee] hover:bg-zinc-800 transition-colors dark:bg-white dark:text-[#151515]'
                            onClick={() => router.push('/login')}
                        >
                            Sign In to Buy
                        </button>
                    )}
                    {userLogin ? (
                        <button
                            className='w-full h-16 rounded-full bg-transparent text-[#151515] border-[1px] border-zinc-300 hover:border-zinc-800 transition-all mt-4 dark:text-[#ddd]'
                            onClick={() => console.log('next step')}
                        >
                            Favorite{' '}
                            <i className='fa-regular fa-heart ml-2'></i>
                        </button>
                    ) : (
                        <button
                            className='w-full h-16 rounded-full bg-transparent text-[#151515] border-[1px] border-zinc-300 hover:border-zinc-800 transition-all mt-4 dark:text-[#ddd]'
                            onClick={() => router.push('/login')}
                        >
                            Favorite{' '}
                            <i className='fa-regular fa-heart ml-2'></i>
                        </button>
                    )}
                </div>
                <div className='px-8 pb-16'>
                    <p className='mt-12'>{cart.description}</p>
                    <ul className='list-disc ml-4 py-8'>
                        <li>Color Shown: Black/Anthracite/White/Chile Red</li>
                        <li className='mt-2'>Style: {cart.code}</li>
                    </ul>
                    <div className='flex items-center justify-between'>
                        <span className='text-xl'>Vote</span>
                        {cart.vote && cart.vote < 5 ? (
                            <div className='text-xl'>
                                <i className='fa-regular fa-star'></i>
                                <i className='fa-regular fa-star'></i>
                                <i className='fa-regular fa-star'></i>
                                <i className='fa-regular fa-star'></i>
                            </div>
                        ) : (
                            <div className='text-xl'>
                                <i className='fa-regular fa-star'></i>
                                <i className='fa-regular fa-star'></i>
                                <i className='fa-regular fa-star'></i>
                                <i className='fa-regular fa-star'></i>
                                <i className='fa-regular fa-star'></i>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    ) : (
        <>
            <div
                role='status'
                className='animate-pulse hidden lg:flex px-10 2xl:px-20 py-20'
            >
                <div className='flex-1 grid grid-cols-2 gap-4'>
                    <div className='w-full h-[600px] bg-gray-200 dark:bg-gray-800'></div>
                    <div className='w-full h-[600px] bg-gray-200 dark:bg-gray-800'></div>
                    <div className='w-full h-[600px] bg-gray-200 dark:bg-gray-800'></div>
                    <div className='w-full h-[600px] bg-gray-200 dark:bg-gray-800'></div>
                    <div className='w-full h-[600px] bg-gray-200 dark:bg-gray-800'></div>
                    <div className='w-full h-[600px] bg-gray-200 dark:bg-gray-800'></div>
                </div>
                <div className='w-1/3 px-10 text-base max-w-md'>
                    <div className='h-8 bg-gray-200 dark:bg-gray-800 rounded-full w-72'></div>
                    <div className='h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-12 mt-4'></div>
                    <div className='h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-24 mt-4'></div>
                    <div className='h-16 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg mt-4'></div>
                    <div className='flex justify-between mt-12'>
                        <div className='h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-24 mb-2.5'></div>
                        <div className='h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-24 mb-2.5'></div>
                    </div>
                    <div className='grid grid-cols-3 gap-2 mt-2'>
                        <div className='h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-28'></div>
                        <div className='h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-28'></div>
                        <div className='h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-28'></div>
                        <div className='h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-28'></div>
                        <div className='h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-28'></div>
                        <div className='h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-28'></div>
                        <div className='h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-28'></div>
                        <div className='h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-28'></div>
                        <div className='h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-28'></div>
                    </div>

                    <div className='h-16 bg-gray-200 dark:bg-gray-800 rounded-full w-full mt-4'></div>
                    <div className='h-16 bg-gray-200 dark:bg-gray-800 rounded-full w-full mt-4'></div>
                    <div className='mt-12'>
                        <div className='h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-full mt-4'></div>
                        <div className='h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-full mt-4'></div>
                        <div className='h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-full mt-4'></div>
                        <div className='h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-full mt-4'></div>
                        <div className='h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-full mt-4'></div>
                        <div className='h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-full mt-4'></div>

                        <div className='h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-[90%] mt-16'></div>
                        <div className='h-3 bg-gray-200 dark:bg-gray-800 rounded-full w-20 mt-4'></div>
                    </div>
                </div>
            </div>
            <div role='status' className='lg:hidden animate-pulse'>
                <div className='px-8 pb-8 pt-16 '>
                    <div className='h-8 w-72 bg-gray-200 dark:bg-gray-800 rounded-full'></div>
                    <div className='h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded-full mt-2'></div>
                    <div className='h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded-full mt-2 py-4'></div>
                </div>
                <div className='h-96 w-full bg-gray-200 dark:bg-gray-800'></div>
                <div className='grid grid-cols-5 px-2 mt-4'>
                    <div className='h-16 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg'></div>
                    <div className='h-16 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg'></div>
                </div>
                <div className='mt-4'>
                    <div className='flex justify-between px-8'>
                        <div className='h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg'></div>
                        <div className='h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg'></div>
                    </div>
                    <div className='grid grid-cols-3 gap-2 px-8 mt-4'>
                        <div className='h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-lg'></div>
                        <div className='h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-lg'></div>
                        <div className='h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-lg'></div>
                        <div className='h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-lg'></div>
                        <div className='h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-lg'></div>
                        <div className='h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-lg'></div>
                        <div className='h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-lg'></div>
                        <div className='h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-lg'></div>
                        <div className='h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-lg'></div>
                    </div>
                    <div className='px-8 mt-4'>
                        <div className='h-20 w-full bg-gray-200 dark:bg-gray-800 rounded-full'></div>
                        <div className='h-20 w-full bg-gray-200 dark:bg-gray-800 rounded-full mt-4'></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
