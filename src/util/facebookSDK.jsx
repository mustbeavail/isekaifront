import { useEffect } from 'react';

function useFacebook() {

    const FACEBOOK_KEY = process.env.NEXT_PUBLIC_FACEBOOK_KEY;

    window.fbAsyncInit = () => {
        window.FB.init({
            appId : FACEBOOK_KEY,
            xfbml : true,
            version : 'v24.0'
        });
    }

    useEffect(() => {
        if (window.FB) {
            return;
        } else {
            const script = document.createElement('script');
            script.src = '"https://connect.facebook.net/en_US/sdk.js"';
            script.onload = () => {
                window.fbAsyncInit();
                console.log('Facebook SDK initialized:', window.FB.isInitialized());
            };
            script.crossorigin='anonymous';
            document.head.appendChild(script);
        }
    }, []);
}

export default useFacebook;