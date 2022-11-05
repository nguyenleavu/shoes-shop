import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';

type Props = {};

const HomeAdmin = (props: Props) => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    console.log()
    useEffect(() => {
        const fetchAPI = async () => {
            const products: any = [];
            const orders: any = [];
            const querySnapshot = await getDocs(collection(db, 'man'));
            querySnapshot.forEach((doc: any) => {
                products.push(doc.data());
            });
            const querySnapshot2 = await getDocs(collection(db, 'orders'));
            querySnapshot2.forEach((doc: any) => {
                orders.push(doc.data());
            });
            setProducts(products);
            setOrders(orders);
        };

        fetchAPI();
    }, []);

    return (
        <div className='py-8 px-4 lg:px-14'>
            <div className='grid gap-10'>
                <div className='rounded-lg bg-pink-400 p-3 text-white'>
                    <p className='text-3xl font-semibold '>Earnings</p>
                    <p className='flex justify-between mt-4'>
                        <span className='text-2xl tracking-wider'> ${orders.reduce((a, b: any) => a + b.price, 0)}</span>
                        <i className='fa-solid fa-dollar-sign text-4xl'></i>
                    </p>
                </div>
                <Link href='/admin/all-products'>
                    <a className='block rounded-lg bg-blue-400 p-3 text-white'>
                        <p className='text-3xl font-semibold '>Products</p>
                        <p className='flex justify-between mt-4'>
                            <span className='text-2xl tracking-wider'>
                                {products && products.length}
                            </span>
                            <i className='fa-solid fa-cart-shopping text-4xl'></i>
                        </p>
                    </a>
                </Link>
                <Link href='/admin/orders'>
                    <a className='block rounded-lg bg-orange-400 p-3 text-white'>
                        <p className='text-3xl font-semibold '>Orders</p>
                        <p className='flex justify-between mt-4'>
                            <span className='text-2xl tracking-wider'>
                                {orders && orders.length}
                            </span>
                            <i className='fa-solid fa-cart-plus text-4xl'></i>
                        </p>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default HomeAdmin;
