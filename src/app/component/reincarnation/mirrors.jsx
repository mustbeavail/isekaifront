'use client'
import styles from './mirrors.module.css';
import { useState, useEffect, useRef } from "react";
import SimResult from './simResult';
import { useSearchParams } from 'next/navigation';

export default function Mirrors({waitForRef, simResult, setResultMount, guestId}) {
      
    let mainRef = useRef(null);
    let mainWrapperRef = useRef(null);
    let centerRef = useRef(null);
    let aRef = useRef(null);
    let bRef = useRef(null);
    let cRef = useRef(null);
    const [animeEnd, setAnimeEnd] = useState(false);
    const searchParams = useSearchParams();

    const addFadeIn = (ref) => {
        ref.classList.add(styles.fadeIn);
    }

    const animeSeq = async () => {
        await new Promise(resolve => waitForRef(aRef, addFadeIn, resolve));
        aRef.current.addEventListener('animationend', ()=>addFadeIn(bRef.current));
        bRef.current.addEventListener('animationend', ()=>addFadeIn(cRef.current));
        cRef.current.addEventListener('animationend',
            ()=>setTimeout(
                ()=>{
                    mainWrapperRef.current.classList.add(styles.gettingBigger);
                    centerRef.current.classList.add(styles.gettingBiggerCenter);
                    mainWrapperRef.current.addEventListener('animationend', ()=>{setAnimeEnd(true);});
                }, 800));
    };

    // 세션스토리지 초기화
    useEffect(()=>{
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('birth');
        sessionStorage.removeItem('gender');
        sessionStorage.removeItem('specialty');
        sessionStorage.removeItem('wishedAbil');
        sessionStorage.removeItem('wishedGift');
        sessionStorage.removeItem('preferredIsekai');
    },[]);

    // 애니메이션, url 쿼리 검사
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        const idx = searchParams.get('simIdx');
        if(idx){
            setAnimeEnd(true);
        }else {
            if(!animeEnd) {
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
                setTimeout(animeSeq, 2500);
            }
        }
        if(animeEnd) {document.body.style.overflow = ''; document.documentElement.style.overflow = '';}
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
          }
    },[animeEnd]);

    return (
        <>
            {!animeEnd ?
                <div className={styles.mirrorContainer}>
                        <div ref={centerRef} className={styles.center}>
                        <div ref={mainWrapperRef} className={styles.mainMirrorWrapper}>
                            <img ref={mainRef} className={styles.mainMirror} src='/mainmirror.webp' alt='메인거울'/>
                        </div>
                        <div ref={aRef} className={styles.aWrapper}>
                            <div className={styles.subMirrorWrapperA1}>
                                <img className={styles.subMirrorA1} src='/submirror1.webp' alt='기계풍거울'/>
                            </div>
                            <div className={styles.subMirrorWrapperA2}>
                                <img className={styles.subMirrorA2} src='/submirror2.webp' alt='중세풍거울'/>
                            </div>
                            <div className={styles.subMirrorWrapperA3}>
                                <img className={styles.subMirrorA3} src='/submirror3.webp' alt='수묵화풍거울'/>
                            </div>
                            <div className={styles.subMirrorWrapperA4}>
                                <img className={styles.subMirrorA4} src='/submirror4.webp' alt='판타지중세풍거울'/>
                            </div>
                            <div ref={bRef} className={styles.bWrapper}>
                                <div className={styles.subMirrorWrapperB1}>
                                    <img className={styles.subMirrorB1} src='/submirror7.webp' alt='사이버펑크풍거울'/>
                                </div>
                                <div className={styles.subMirrorWrapperB2}>
                                    <img className={styles.subMirrorB2} src='/submirror6.webp' alt='고급동양풍거울'/>
                                </div>
                                <div className={styles.subMirrorWrapperB3}>
                                    <img className={styles.subMirrorB3} src='/submirror11.webp' alt='원형거울'/>
                                </div>
                                <div ref={cRef} className={styles.cWrapper}>
                                    <div className={styles.subMirrorWrapperC1}>
                                        <img className={styles.subMirrorC1} src='/submirror5.webp' alt='동양풍거울'/>
                                    </div>
                                    <div className={styles.subMirrorWrapperC2}>
                                        <img className={styles.subMirrorC2} src='/submirror8.webp' alt='화려한동양풍거울'/>
                                    </div>
                                    <div className={styles.subMirrorWrapperC3}>
                                        <img className={styles.subMirrorC3} src='/submirror9.webp' alt='무지개픽셀거울'/>
                                    </div>
                                    <div className={styles.subMirrorWrapperC4}>
                                        <img className={styles.subMirrorC4} src='/submirror10.webp' alt='픽셀거울'/>
                                    </div>
                                    <div className={styles.subMirrorWrapperC5}>
                                        <img className={styles.subMirrorC5} src='/submirror11.webp' alt='원형거울'/>
                                    </div>
                                    <div className={styles.subMirrorWrapperC6}>
                                        <img className={styles.subMirrorC6} src='/submirror10.webp' alt='픽셀거울'/>
                                    </div>
                                    <div className={styles.subMirrorWrapperC7}>
                                        <img className={styles.subMirrorC7} src='/submirror9.webp' alt='무지개색픽셀거울'/>
                                    </div>
                                    <div className={styles.subMirrorWrapperC8}>
                                        <img className={styles.subMirrorC8} src='/submirror11.webp' alt='원형거울'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            :   <>
                    <SimResult
                        simResult={simResult}
                        waitForRef={waitForRef}
                        setResultMount={setResultMount}
                        guestId={guestId}
                    />
                </>
            }
        </>
    )
}