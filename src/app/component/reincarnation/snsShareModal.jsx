'use client'
import styles from './snsShareModal.module.css';
import Image from "next/image";

export default function SnsShareModal({visible, onClose}){

    if(!visible) return null;

    return (
        <>
            <div className={styles.shareOverlay}>
                <div className={styles.shareModal}>
                    <h2 className={styles.title}>공유하기</h2>
                    <div className={styles.shareList}>
                        <button className={styles.shareItem}>
                            <Image
                                src='/kakaotalk.svg'
                                alt='카톡아이콘'
                                width={22} 
                                height={22} 
                                className={styles.icon}/> 
                            카카오톡 공유
                        </button>
                        <button className={styles.shareItem}>
                            <Image
                                src='/facebook.svg'
                                alt='페북아이콘'
                                width={22} 
                                height={22} 
                                className={styles.icon}/> 
                            페이스북 공유
                        </button>
                        <button className={styles.shareItem}>
                            <Image
                                src='/x.svg'
                                alt='X아이콘'
                                width={22} 
                                height={22} 
                                className={styles.icon}/> 
                            X 공유
                        </button>
                        <button className={styles.shareItem}>
                            <Image
                                src='/line.svg'
                                alt='라인아이콘'
                                width={22} 
                                height={22} 
                                className={styles.icon}/> 
                            라인 공유
                        </button>
                        <button className={styles.shareItem}>
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