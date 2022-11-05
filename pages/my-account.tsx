import { updateProfile } from 'firebase/auth';
import Image from 'next/image';
import { useState } from 'react';
import { myLoader } from '../components/Product';
import { auth } from '../firebase/config';
import { upLoadImage } from '../firebase/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {};

const MyAccount = (props: Props) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('');

    const handleChange = (e: any, setAvatar: any) => {
        upLoadImage(e, setAvatar);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: avatar,
        })
            .then(() => {
                setName('')
                setPhone('')
                setAvatar('')
                toast.success('Update Success !');
            })
            .catch((error) => {
                toast.error('Update fail !');
            });
    };
    return (
        <div className='flex items-center justify-center flex-col pt-10 pb-20'>
            <h2 className='text-3xl font-semibold tracking-wide'>
                Update Account
            </h2>
            <form onSubmit={handleSubmit} className='mt-8 px-4 lg:w-1/5'>
                <div>
                    <p className='font-medium mb-2'>Name :</p>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='User name'
                        className='w-full h-10 px-3 border-2 border-gray-300 rounded-lg dark:text-black dark:bg-gray-900'
                    />
                </div>
                <div className='mt-4'>
                    <p className='font-medium mb-2'>Phone Number :</p>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type='text'
                        placeholder='Phone Number'
                        className='w-full h-10 px-3 border-2 border-gray-300 rounded-lg dark:text-black dark:bg-gray-900'
                    />
                </div>
                <div className='mt-4'>
                    <p className='font-medium mb-2'>Avatar :</p>
                    <label className='flex items-center justify-center w-full h-12 px-3 border-2 border-gray-300 rounded-lg '>
                        <input
                            type='file'
                            onChange={(e) => handleChange(e, setAvatar)}
                        />
                    </label>
                    {avatar && (
                        <div className='mt-4'>
                            <Image
                                loader={myLoader}
                                src={avatar}
                                alt={avatar}
                                width={400}
                                height={400}
                                className=' rounded-lg'
                                unoptimized={true}
                            />
                        </div>
                    )}

                    <button
                        className='bg-black text-white w-full h-10 mt-8 rounded-full hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors font-semibold text-base'
                        type='submit'
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyAccount;
