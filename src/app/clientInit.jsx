'use client';
import { useEffect } from "react";
import { store } from "../redux/store";
import { v4 } from "uuid";
import { formatInTimeZone } from "date-fns-tz";
import axios from "axios";

export default function ClientInit() {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

    // 게스트아이디 체크
    useEffect(()=>{
        const now = formatInTimeZone(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
        let storedId = localStorage.getItem('guestId');
        if(!storedId){
            storedId = v4();
            store.dispatch({type:'guest/setId', payload: {storedId}});
            saveGuest(storedId, now);
        }else{
            store.dispatch({type:'guest/setId', payload: {storedId}});
            store.dispatch({type:'guest/isFirst'});
            revisitingGuest(storedId, now);
        }

    },[]);

    return null;
}