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
        await new Promise(resolve => setTimeout(resolve, 2500));
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
        const idx = searchParams.get('idx');
        if(idx){
            setAnimeEnd(true);
        }else {
            if(!animeEnd) {
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
                animeSeq();
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
                            <img ref={mainRef} className={styles.mainMirror} src='/mainMirror.webp' alt='메인거울'/>
                        </div>
                        <div ref={aRef} className={styles.aWrapper}>
                            <div className={styles.subMirrorWrapperA1}>
                                <img className={styles.subMirrorA1} src='/subMirror1.webp' alt='서브거울'/>
                            </div>
                            <div className={styles.subMirrorWrapperA2}>
                                <img className={styles.subMirrorA2} src='/subMirror2.webp' alt='서브거울'/>
                            </div>
                            <div className={styles.subMirrorWrapperA3}>
                                <img className={styles.subMirrorA3} src='/subMirror3.webp' alt='서브거울'/>
                            </div>
                            <div className={styles.subMirrorWrapperA4}>
                                <img className={styles.subMirrorA4} src='/subMirror4.webp' alt='서브거울'/>
                            </div>
                            <div ref={bRef} className={styles.bWrapper}>
                                <div className={styles.subMirrorWrapperB1}>
                                    <img className={styles.subMirrorB1} src='/subMirror7.webp' alt='서브거울'/>
                                </div>
                                <div className={styles.subMirrorWrapperB2}>
                                    <img className={styles.subMirrorB2} src='/subMirror6.webp' alt='서브거울'/>
                                </div>
                                <div className={styles.subMirrorWrapperB3}>
                                    <img className={styles.subMirrorB3} src='/subMirror11.webp' alt='서브거울'/>
                                </div>
                                <div ref={cRef} className={styles.cWrapper}>
                                    <div className={styles.subMirrorWrapperC1}>
                                        <img className={styles.subMirrorC1} src='/subMirror5.webp' alt='서브거울'/>
                                    </div>
                                    <div className={styles.subMirrorWrapperC2}>
                                        <img className={styles.subMirrorC2} src='/subMirror8.webp' alt='서브거울'/>
                                    </div>
                                    <div className={styles.subMirrorWrapperC3}>
                                        <img className={styles.subMirrorC3} src='/subMirror9.webp' alt='서브거울'/>
                                    </div>
                                    <div className={styles.subMirrorWrapperC4}>
                                        <img className={styles.subMirrorC4} src='/subMirror10.webp' alt='서브거울'/>
                                    </div>
                                    <div className={styles.subMirrorWrapperC5}>
                                        <img className={styles.subMirrorC5} src='/subMirror11.webp' alt='서브거울'/>
                                    </div>
                                    <div className={styles.subMirrorWrapperC6}>
                                        <img className={styles.subMirrorC6} src='/subMirror10.webp' alt='서브거울'/>
                                    </div>
                                    <div className={styles.subMirrorWrapperC7}>
                                        <img className={styles.subMirrorC7} src='/subMirror9.webp' alt='서브거울'/>
                                    </div>
                                    <div className={styles.subMirrorWrapperC8}>
                                        <img className={styles.subMirrorC8} src='/subMirror11.webp' alt='서브거울'/>
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