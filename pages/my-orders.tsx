import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { OrderType } from '../config/@type';
import { db } from '../firebase/config';
import { useAppSelector } from '../redux/hook';

type Props = {};

const MyOrders = (props: Props) => {
    const [orders, setOrders] = useState([]);
    const id = useAppSelector((state) => state.auth.userID);

    useEffect(() => {
        const fetchApi = async () => {
            const orders: any = [];
            const q = query(
                collection(db, 'orders'),
                where('userId', '==', id)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc: any) => {
                orders.push(doc.data());
            });
            setOrders(orders);
        };
        fetchApi();
    }, [id]);
    return (
        
        <div className=' flex justify-center py-16 min-h-[60.5vh]'>
            <div className=''>
                <h2 className='text-4xl font-semibold tracking-wide'>
                    Orders History
                </h2>
                <p className='text-lg mt-4 text-gray-600'>
                    Open an order to leave a Product Review
                </p>
                <div>
                    <div className='flex justify-between lg:min-w-[1000px] h-14 font-semibold bg-black text-white px-4 rounded-lg mt-8 border-[1px] border-gray-600 dark:bg-gray-50 dark:text-black'>
                        <span className='flex items-center'>
                            Stt
                        </span>
                        <p className='flex items-center'>Date</p>
                        <p className='hidden lg:flex min-w-[310px] items-center'>
                            Order ID
                        </p>
                        <p className='mr-8 lg:mr-0 flex items-center'>
                            Amount
                        </p>
                        <p className='flex items-center'>Status</p>
                    </div>
                    <div className=''>
                        {orders &&
                            orders.map((item: OrderType, index: number) => (
                                <div
                                    key={item.id}
                                    className='flex justify-between  h-12 px-4 border-[1px] border-gray-400 rounded-lg mt-2 font-normal bg-gray-200 dark:bg-slate-800'
                                >
                                    <span className='flex items-center'>
                                        {index + 1}
                                    </span>
                                    <p className='flex items-center'>
                                        {item.date}
                                    </p>
                                    <p className='hidden lg:flex items-center'>
                                        {item.id}
                                    </p>
                                    <p className=' flex items-center'>
                                        {item.price}
                                    </p>
                                    <p
                                        className={
                                            item.status === 'Ordered'
                                                ? 'flex items-center text-red-500'
                                                : item.status === 'Delivered'
                                                ? 'flex items-center text-blue-500'
                                                : 'flex items-center text-yellow-500'
                                        }
                                    >
                                        {item.status}

                                        {item.status === 'Ordered' && (
                                            <span className=' ml-2 text-xl'>
                                                <i className='fa-solid fa-truck-ramp-box'></i>
                                            </span>
                                        )}
                                        {item.status === 'Delivered' && (
                                            <span className=' ml-2 text-xl'>
                                                <i className='fa-solid fa-truck'></i>
                                            </span>
                                        )}
                                        {item.status === 'Shipped' && (
                                            <span className=' ml-2 text-xl'>
                                                <i className='fa-solid fa-truck-fast'></i>
                                            </span>
                                        )}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;
