'use client'
import styles from './snsShareModal.module.css';
import Image from "next/image";
import useKakao from '../../../util/kakaoSDK';
import { toast } from "react-hot-toast";

export default function SnsShareModal({visible, onClose}){

    const url = window.location.href;

    useKakao();

    // 카톡 공유
    const kakaoShare = () => {
        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
              title: '이세계 전생 시뮬레이션',
              description: '당신이 이세계에 전생한다면?',
              imageUrl:
                'https://isekaireincarnation.com/thumbnail.webp',
              imageWidth: 400,
              imageHeight: 300,
              link: {
                webUrl: url,
                mobileWebUrl: url
              },
            },
            buttons: [
              {
                title: '웹으로 이동',
                link: {
                  webUrl: url,
                  mobileWebUrl: url
                },
              },
            ],
        });
    };

    // 페북 공유
    const facebookShare = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          window.open(shareUrl, "_blank", "width=600,height=500");
    };

    // X 공유
    const xShare = () => {
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('🚍이세계 전생 시뮬레이션 결과 👉')}`;
    
        window.open(shareUrl, "_blank", "width=600,height=500");
    };

    // 라인 공유
    const lineShare = () => {
        const shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
        window.open(shareUrl, "_blank", "width=600,height=500");
    };

    // url 클립보드에 복사
    const copyUrl = () => {
        navigator.clipboard.writeText(url);
        toast.success('클립보드에 복사되었습니다.', {style:{width: 370, height: 70}})
    };

    if(!visible) return null;

    return (
        <>
            <div className={styles.shareOverlay}>
                <div className={styles.shareModal}>
                    <h2 className={styles.title}>공유하기</h2>
                    <div className={styles.shareList}>
                        <button className={styles.shareItem} onClick={kakaoShare}>
                            <Image
                                src='/kakaotalk.svg'
                                alt='카톡아이콘'
                                width={22} 
                                height={22} 
                                className={styles.icon}/> 
                            카카오톡 공유
                        </button>
                        <button className={styles.shareItem} onClick={facebookShare}>
                            <Image
                                src='/facebook.svg'
                                alt='페북아이콘'
                                width={22} 
                                height={22} 
                                className={styles.icon}/> 
                            페이스북 공유
                        </button>
                        <button className={styles.shareItem} onClick={xShare}>
                            <Image
                                src='/x.svg'
                                alt='X아이콘'
                                width={22} 
                                height={22} 
                                className={styles.icon}/> 
                            X 공유
                        </button>
                        <button className={styles.shareItem} onClick={lineShare}>
                            <Image
                                src='/line.svg'
                                alt='라인아이콘'
                                width={22} 
                                height={22} 
                                className={styles.icon}/> 
                            라인 공유
                        </button>
                        <button className={styles.shareItem} onClick={copyUrl}>
                            <span className={styles.icon}>📋</span>
                            URL 복사
                        </button>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>닫기</button>
                </div>
            </div>
        </>
    )
}