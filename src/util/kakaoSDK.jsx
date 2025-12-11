import { useEffect } from 'react';

function useKakao() {

    const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_KEY;

    useEffect(() => {
        if (window.Kakao) {

            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(KAKAO_KEY);
            }
        } else {
            const script = document.createElement('script');
            script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
            script.onload = () => {
                window.Kakao.init(KAKAO_KEY);
                console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
            };
            document.head.appendChild(script);
        }
    }, []);
}

export default useKakao;