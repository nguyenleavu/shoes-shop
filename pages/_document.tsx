import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { MessengerChat } from 'react-messenger-chat-plugin';

const Document = () => {
    return (
        <Html>
            <Head>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
                    integrity='sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=='
                    crossOrigin='anonymous'
                    referrerPolicy='no-referrer'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=Quicksand:wght@300;400;500;600;700&display=swap'
                    rel='stylesheet'
                ></link>
                <link
                    href='https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=Quicksand:wght@300;400;500;600;700&display=swap'
                    rel='stylesheet'
                ></link>
            </Head>
            <body className='dark:bg-[#151515] dark:text-[#ddd]'>
                <Main />
                <NextScript />
            </body>
            <MessengerChat
                pageId='102521359343536'
                language='vi_VN'
                themeColor={'#000000'}
                bottomSpacing={300}
                loggedInGreeting='loggedInGreeting'
                loggedOutGreeting='loggedOutGreeting'
                greetingDialogDisplay={'show'}
                debugMode={true}
                onMessengerShow={() => {
                    console.log('onMessengerShow');
                }}
                onMessengerHide={() => {
                    console.log('onMessengerHide');
                }}
                onMessengerDialogShow={() => {
                    console.log('onMessengerDialogShow');
                }}
                onMessengerDialogHide={() => {
                    console.log('onMessengerDialogHide');
                }}
                onMessengerMounted={() => {
                    console.log('onMessengerMounted');
                }}
                onMessengerLoad={() => {
                    console.log('onMessengerLoad');
                }}
            />
            ,
        </Html>
    );
};

export default Document;
