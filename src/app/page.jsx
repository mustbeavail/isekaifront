'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "@/app/entrancePage.module.css";

export default function Entrance() {

  const [isLoading, setIsLoading] = useState(true);
  const [animeEnd, setAnimeEnd] = useState(false);
  const [phraseEnd, setPhraseEnd] = useState(false);
  const [animeEnd2, setAnimeEnd2] = useState(false);
  const [smallPhraseEnd, setSmallPhraseEnd] = useState(false);
  let guestId = useSelector(state => state.guest.guestId);
  let isFirst = useSelector(state => state.guest.isFirst);
  const truckRef = useRef(null);
  const movingHumanRef = useRef(null);
  const spinningHumanRef = useRef(null);
  const phraseRef = useRef(null);
  const smallPhraseRef = useRef(null);

  // 애니메이션 스킵
  const waitForRef = (ref, callback) => {
    if (ref.current) callback(ref.current);
    else requestAnimationFrame(() => waitForRef(ref, callback));
  };
  
  const skip = () => {
    waitForRef(truckRef, (truck) => {
      truck.style.animationDelay = '0s';
      truck.style.animationDuration = '0.0001s';
      waitForRef(movingHumanRef, (movingHuman) => {
        movingHuman.style.animationDuration = '0.0001s';
          waitForRef(phraseRef, (phrase) => {
            phrase.style.animationDuration = '0.0001s';
            waitForRef(smallPhraseRef, (smallPhrase) => {
              smallPhrase.style.animationDuration = '0.0001s';
            });
          });
      });
    });
  };

  // 오버플로우 끄기
  useEffect(() => {

    if(!guestId) return;
    document.body.style.overflow = 'hidden';

    setIsLoading(false);

    return () => {
      document.body.style.overflow = '';
    }
  }, [guestId]);

  // 애니메이션
  useEffect(() => {
    const truck = truckRef.current;
    const movingHuman = movingHumanRef.current;
    const spinningHuman = spinningHumanRef.current;

    const handleTruckEnd = () => {
      movingHuman.classList.add(styles.humanFly);
      spinningHuman.classList.add(styles.humanSpinner);
    };

    if(!isLoading){
      truck.addEventListener('animationend', handleTruckEnd);
      movingHuman.addEventListener('animationend', () => setAnimeEnd(true));
    }else{
      return;
    };

    return () => {
      truck.removeEventListener('animationend', handleTruckEnd);
      movingHuman.removeEventListener('animationend', () => setAnimeEnd(true));
    };
  }, [isLoading]);

  useEffect(()=>{
    const phrase = phraseRef.current;
    if(animeEnd){
      phrase.addEventListener('animationend', () => setPhraseEnd(true));
      phrase.addEventListener('animationend', () => setAnimeEnd2(true));
    }else{
      return;
    }
    return () => {
      phrase.removeEventListener('animationend', () => setPhraseEnd(true));
      phrase.removeEventListener('animationend', () => setAnimeEnd2(true));
    };
  },[animeEnd]);

  useEffect(()=>{
    const smallPhrase = smallPhraseRef.current;
    if(animeEnd2){
      smallPhrase.addEventListener('animationend', () => setSmallPhraseEnd(true));
      document.body.style.overflow = '';
    }else{
      return;
    }
    return () => {
      smallPhrase.removeEventListener('animationend', () => setSmallPhraseEnd(true));
    };
  },[animeEnd2])

  return (
    <>
      {isLoading ? null :
            <div className="container">
              <div className={styles.animeWrapper}>
                <div  ref={movingHumanRef} className={styles.movingHuman}>
                  <img ref={spinningHumanRef} className={styles.spinningHuman} src="/human.png" alt="사람"/>
                </div>
                <img ref={truckRef} className={styles.truck} src="/truck.png" alt="트럭"/>
                <div className={styles.skipWrapper}>
                  <div className={`${styles.skip} ${smallPhraseEnd ? styles.fadeOut : ''}`} onClick={skip}>건너뛰기⏭️</div>
                </div>
                {!animeEnd ? null :
                  <img className={`${styles.dead} ${styles.fadeIn}`} src="/dead.png" alt="기억할게"/>}
              </div>
            {!animeEnd ? null :
              <div className={styles.mainWrapper}>
                <div ref={phraseRef} className={`${styles.phrase} ${styles.fadeIn}`}>
                  <span>저런! 당신은 소환마법(물리) 에 당하고 말았어요!<br/>여행준비는 되셨나요?</span>
                </div>
                {!phraseEnd ? null :
                  <div ref={smallPhraseRef} className={`${styles.smallPhrase} ${styles.fadeIn}`}>
                    <span className={styles.buttonDescription}>이세계 전문 여행사</span>
                    <Link href="/component/reincarnation" className={styles.button}>
                      <span className={styles.gem}>GemExpress</span> 방문하기
                    </Link>
                  </div>
                }
              </div>     
            }
            </div>
      }
    </>
  )
}
