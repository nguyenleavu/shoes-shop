import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

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
            <div id='fb-customer-chat' className='fb-customerchat'></div>
            <Script strategy='lazyOnload' id='facebook-chat'>
                {`
                    var chatbox = document.getElementById('fb-customer-chat');
                    chatbox.setAttribute("page_id", "102521359343536");
                    chatbox.setAttribute("attribution", "biz_inbox");
  
                    window.fbAsyncInit = function() {
                    FB.init({
                     xfbml            : true,
                    version          : 'v12.0'
                     });
                    };
  
                    (function(d, s, id) {
                     var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                    fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));
                `}
            </Script>
        </Html>
    );
};

export default Document;
