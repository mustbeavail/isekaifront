'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from "react";
import { store } from "../redux/store";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import axios from "axios";
import { formatInTimeZone } from "date-fns-tz";
import styles from "@/app/mainPage.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const [animeEnd, setAnimeEnd] = useState(false);
  let guestId = useSelector(state => state.guest.guestId);
  let isFirst = useSelector(state => state.guest.isFirst);
  const truckRef = useRef(null);
  const movingHumanRef = useRef(null);
  const spinningHumanRef = useRef(null);


  // 첫 방문 게스트아이디, 방문기록 저장
  const saveGuest = async (guestId, issuedDate) => {
    try {
      const { data } = await axios.post(`${API_URL}/saveGuest`, { guestId, issuedDate });
      if (data.success) {
        localStorage.setItem('guestId', guestId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 재방문 게스트 방문기록 저장
  const revisitingGuest = async (guestId, now) => {
    try {
      const { data } = await axios.post(`${API_URL}/revisitingGuest`, { guestId, "visitDate": now });
    } catch (err) {
      console.log(err);
    }
  };

  // 게스트아이디, 첫 방문여부 체크
  useEffect(() => {
    // 오버플로우 끄기
    document.body.style.overflow = 'hidden';

    const now = formatInTimeZone(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
    if (!guestId) {
      const newId = v4();
      store.dispatch({ type: 'guest/getId', payload: { newId } });
      saveGuest(newId, now);
    } else {
      store.dispatch({ type: 'guest/isFirst' });
      revisitingGuest(guestId, now);
    }
    setIsLoading(false);

    return () => {
      document.body.style.overflow = '';
    }
  }, []);

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
    };
  }, [isLoading]);

  return (
    <>
      {isLoading ? <div>로딩중</div> :
            <div className="container">
              <div className={styles.animeWrapper}>
                <div  ref={movingHumanRef} className={styles.movingHuman}>
                  <img ref={spinningHumanRef} className={styles.spinningHuman} src="/human.png" alt="사람"/>
                </div>
                <img ref={truckRef} className={styles.truck} src="/truck.png" alt="트럭"/>
              </div>
            {!animeEnd ? null :
              <div className={styles.mainWrapper}>
                <div className={`${styles.itemPhrase} ${styles.item}`}>
                  <span>저런! 당신은 소환마법(물리) 에 당하고 말았어요!<br/>여행준비는 되셨나요?</span>
                </div>
                <div className={`${styles.itemSmallPhrase} ${styles.item}`}>
                  <span className={styles.buttonDescription}>이세계 전문 여행사</span>
                  <Link href="/component/reincarnation" className={styles.button}>
                    <span className={styles.gem}>GemExpress</span> 방문하기
                  </Link>
                </div>
              </div>     
            }

            </div>
      }
    </>
  )
}
