'use client';
import Link from 'next/link';
import {useEffect} from "react";
import {store} from "../redux/store";
import { v4 } from "uuid";
import {useSelector} from "react-redux";
import axios from "axios";
import {formatInTimeZone} from "date-fns-tz";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {

  let guestId = useSelector(state => state.guest.guestId);
  let isFirst = useSelector(state => state.guest.isFirst);

  // 첫 방문 게스트아이디, 방문기록 저장
  const saveGuest = async (guestId, issuedDate) => {
    try{
      const {data} = await axios.post(`${API_URL}/saveGuest`, {guestId, issuedDate});
      if(data.success){
        localStorage.setItem('guestId',guestId);
      }
    }catch(err){
      console.log(err);
    }
  };

  // 재방문 게스트 방문기록 저장
  const revisitingGuest = async (guestId, now) => {
    try{
      const {data} = await axios.post(`${API_URL}/revisitingGuest`, {guestId, "visitDate":now});
    }catch(err){
      console.log(err);
    }
  };

  // 게스트아이디, 첫 방문여부 체크
  useEffect(()=>{
    const now = formatInTimeZone(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
    if(!guestId){
      const newId = v4();
      store.dispatch({type:'guest/getId', payload:{newId}});
      saveGuest(newId, now);
    }else{
      store.dispatch({type:'guest/isFirst'});
      revisitingGuest(guestId, now);
    }
  },[]);

  return (
    <>
      <div>메인페이지 해윙</div><br/>
      <div><Link href = "/component/reincarnation">시뮬페이지로 이동</Link></div>
      <div><Link href = "/component/archive">아카이브로 이동</Link></div>
      <div><Link href = "/component/stats">통계페이지로 이동</Link></div>
    </>
  )
}
