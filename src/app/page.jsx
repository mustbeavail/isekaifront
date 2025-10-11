'use client';
import Link from 'next/link';
import {useEffect} from "react";
import {store} from "../redux/store";
import { v4 } from "uuid";
import {useSelector} from "react-redux";

export default function Home() {

  useEffect(()=>{

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
