import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Canvas from '../components/Canvas';
import Loader from '../components/Loader';
import { auth, db } from '../firebase/config';

type Props = {};

const Register = (props: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            toast.error('Passwords do not match !');
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const { email, uid, displayName, phoneNumber, photoURL } =
                        user;
                    if (user) {
                        addDoc(collection(db, 'users'), {
                            email,
                            uid,
                            name: displayName,
                            phoneNumber,
                            photoURL,
                        });
                    }
                    setLoading(false);
                    toast.success('Registration Successful...');
                    // router.push('/');
                })
                .catch((error) => {
                    toast.error(error.message);
                    setLoading(false);
                });
        }
    };

    return (
        <>
            {loading && <Loader />}
            <div className='flex items-center justify-center h-[100vh] relative dark:bg-[#151515]'>
                <Canvas />
                <section className='container md:w-[400px]'>
                    <div className='w-full h-[100vh] md:h-[550px] p-10 relative bg-[#00000080] lg:rounded-3xl dark:rounded-none dark:bg-transparent'>
                        <h2 className='text-4xl font-semibold relative tracking-[1px] mb-10 text-white'>
                            Sign Up
                        </h2>
                        <form
                            className='h-[86%] translate-y-8'
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
                                    required
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='w-full mt-5'>
                                <input
                                    className='input placeholder-[#ddd]'
                                    type='password'
                                    required
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className='w-full mt-5'>
                                <input
                                    className='input placeholder-[#ddd]'
                                    type='password'
                                    required
                                    placeholder='Confirm password'
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className='w-full mt-8 '>
                                <button
                                    className='input hover:bg-[rgba(255,255,255,0.3)] transition'
                                    type='submit'
                                >
                                    Sign Up
                                </button>
                            </div>
                            <div className='mt-20 text-center text-white'>
                                <Link href='/login'>
                                    <a>
                                        {`Already an account?`}{' '}
                                        <span className=' hover:underline'>
                                            Login
                                        </span>
                                    </a>
                                </Link>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Register;
