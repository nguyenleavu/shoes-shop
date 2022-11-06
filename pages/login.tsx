import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Canvas from '../components/Canvas';
import Loader from '../components/Loader';
import { auth } from '../firebase/config';

type Props = {};

const Login = (props: Props) => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // const user = userCredential.user;
                setLoading(false);
                toast.success('Login Successful...!!');
                router.push('/');
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
            });
    };
    // Google
    const GoogleProvider = new GoogleAuthProvider();
    const handleLoginWithGoogle = () => {
        signInWithPopup(auth, GoogleProvider)
            .then((result) => {
                // const user = result.user;
                toast.success('Login Successful...!!');
                router.push('/');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };
    // Facebook
    const FaceBookProvider = new FacebookAuthProvider();
    const handleLoginWithFB = () => {
        signInWithPopup(auth, FaceBookProvider)
            .then((result) => {
                // const user = result.user;
                toast.success('Login Successful...!!');
                router.push('/');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };
    return (
        <>
            {loading && <Loader />}
            <div className=' flex items-center justify-center h-[100vh] dark:bg-[#151515]'>
                <Canvas />
                <section className='container  md:w-[400px]'>
                    <div className='w-full h-[100vh] md:h-[550px] p-10 relative bg-[#00000080] lg:rounded-3xl dark:rounded-none dark:bg-transparent'>
                        <h2 className='text-white text-4xl font-semibold relative tracking-[1px] mb-10'>
                            Login
                        </h2>
                        <form
                            className='h-[86%] translate-y-8'
                            onSubmit={(e) => handleSubmit(e)}
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
                                    placeholder='admin@gmail.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='w-full mt-5'>
                                <input
                                    className='input placeholder-[#ddd]'
                                    type='password'
                                    required
                                    placeholder='123456'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className='w-full mt-8'>
                                <button className='input' type='submit'>
                                    Login
                                </button>
                            </div>
                            <p className='text-center mt-3 font-semibold text-white'>
                                {' '}
                                --- or ---{' '}
                            </p>
                            <div className='h-20 flex items-center justify-center'>
                                <span
                                    className='px-6 m-3 cursor-pointer text-white'
                                    onClick={handleLoginWithFB}
                                >
                                    <i className='fa-brands fa-facebook-f text-3xl shadow-md'></i>
                                </span>
                                <span
                                    className='px-6 m-3 cursor-pointer text-white'
                                    onClick={handleLoginWithGoogle}
                                >
                                    <i className='fa-brands fa-google text-3xl shadow-md'></i>
                                </span>
                            </div>
                            <div className='mt-4 w-full text-white'>
                                <Link href='/reset-password'>
                                    <a>
                                        Forgot Password?{' '}
                                        <span className=' hover:underline'>
                                            Click Here
                                        </span>
                                    </a>
                                </Link>
                            </div>
                            <div className='mt-2 text-white'>
                                <Link href='/register'>
                                    <a>
                                        {`Don't have an account?`}{' '}
                                        <span className=' hover:underline'>
                                            Sign Up
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

export default Login;
