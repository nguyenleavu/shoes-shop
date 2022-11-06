import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import React, { useState } from 'react';
import Canvas from '../components/Canvas';
import { auth } from '../firebase/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';

type Props = {};

const Reset = (props: Props) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success(
                    'Check your email for a reset link (and check spam)...!!'
                );
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.message);
                setLoading(false);
            });
    };
    return (
        <>
            {loading && <Loader />}
            <div className='flex items-center justify-center h-[100vh] relative dark:bg-[#151515]'>
                <Canvas />
                <section className='container md:w-[400px]'>
                    <div className='w-full h-[100vh] md:h-[550px] p-10 relative bg-[#00000080] lg:rounded-3xl dark:rounded-none dark:bg-transparent'>
                        <h2 className='text-4xl font-semibold relative tracking-[1px] mb-10 text-white'>
                            Reset Password
                        </h2>
                        <form
                            className='md:h-[76%] translate-y-8 h-[86%] flex justify-between flex-col'
                            onSubmit={handleSubmit}
                        >
                            <div className='w-full mt-8'>
                                <input
                                    className={
                                        email.length > 1
                                            ? 'input invalid placeholder-[#ddd]'
                                            : 'input placeholder-[#ddd]'
                                    }
                                    type='email'
                                    placeholder='email'
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    className='input w-full mt-8'
                                    type='submit'
                                >
                                    Sent
                                </button>
                            </div>
                            <div className='flex justify-between text-white'>
                                <Link href='/login'>
                                    <a className=' hover:underline'>Login</a>
                                </Link>
                                <Link href='/register'>
                                    <a className=' hover:underline'>Sign Up</a>
                                </Link>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Reset;
