import React from 'react';
import Script from 'next/script';

type Props = {};

function ChatBox() {
    var chatbox: any = document.getElementById('fb-customer-chat');
    chatbox.setAttribute('page_id', '102521359343536');
    chatbox.setAttribute('attribution', 'biz_inbox');

    

    (function (d: any, s: any, id: any) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    return (
        <div>
            <div id='fb-root'></div>

            <div id='fb-customer-chat' className='fb-customerchat'></div>

            <Script strategy='lazyOnload' id='fb-customer-chat'>
                {`
                     window.fbAsyncInit = function() {
                        FB.init({
                       xfbml            : true,
                       version          : 'v12.0'
                       });
                       };
                `}
            </Script>
        </div>
    );
}

export default ChatBox;
