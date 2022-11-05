import { db, storage } from './config';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { ProductType } from '../config/@type';

export const upLoadImage = async (e: any, setUrl: any) => {
    if (e.target.files) {
        const imageRef = ref(
            storage,
            `images/${v4()}${e.target.files[0].name}`
        );
        await uploadBytes(imageRef, e.target.files[0])
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        setUrl(url);
                    })
                    .catch((error) => toast.error(error.message));
            })
            .catch((error) => toast.error(error.message));
    }
};

export const upLoadImageColor = async (images: any, setListUrls: any) => {
    const files: any[] = Object.values(images);
    for (let file of files) {
        const imageRef = ref(storage, `images/${v4()}${file.name}`);
        await uploadBytes(imageRef, file)
            .then((snap: any) =>
                getDownloadURL(snap.ref)
                    .then((url) => {
                        setListUrls((prev: any) => [...prev, url]);
                    })
                    .catch((error) => toast.error(error.message))
            )
            .catch((e) => toast.error(e.message));
    }
};
export const upLoadAllImage = async (images: any, setListUrls: any) => {
    const files: any[] = Object.values(images);
    for (let file of files) {
        const imageRef = ref(storage, `images/${v4()}${file.name}`);
        await uploadBytes(imageRef, file)
            .then((snap: any) =>
                getDownloadURL(snap.ref)
                    .then((url) => {
                        setListUrls((prev: any) => [...prev, url]);
                    })
                    .catch((error) => toast.error(error.message))
            )
            .catch((e) => toast.error(e.message));
    }
};

export const addProduct = async (product: ProductType) => {
    try {
        const docRef = await addDoc(collection(db, 'man'), product);
        toast.success('Add Product Successful...!!');
    } catch (e) {
        toast.error('Add product failed!!');
    }
};

export const addOrder = async (order: any, setLoading: any) => {
    setLoading(true);
    try {
        const docRef = await addDoc(collection(db, 'orders'), order);
        setLoading(false);
        toast.success('Order Successful...!!');
    } catch (e) {
        setLoading(false);
        toast.error('Order failed!!');
    }
};

export const updateStatus = async (id: any, status: string) => {
    try {
        const docRef = doc(db, 'orders', id);
        await updateDoc(docRef, {
            status: status,
        });
        toast.success('Update Successful...!!');
    } catch {
        toast.error('Update failed!!');
    }
};
