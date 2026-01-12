'use client'
import Link from 'next/link';
import styles from './personalArchiveModal.module.css';
import axios from "axios";
import { useState, useEffect } from "react";

export default function PersonalArchiveModal ({visible, onClose, guestId}) {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [align, setAlign] = useState('dateDesc');
    const [personalArchive, setPersonalArchive] = useState([]);
    const [initDone, setInitDone] = useState(false);

    // 게스트아이디로 이전 시뮬레이션 결과 가져오기
    const getPersonalArchive = async(guestId, page, align) => {
        try{
            const {data} = await axios.get(
                `${API_URL}/personalArchive`,
                {params: {guestId: guestId, page: page, align: align}}
            );
            setPersonalArchive(data.personalArchive);
            setTotalPage(data.totalPage);
        }catch(err){
            alert('이전 시뮬레이션 결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
            onClose();
        };
    };

    useEffect(()=>{
        if(!page || !align || !guestId || !visible) return;

        const dataSeq = async () => {
            await new Promise(resolve => {getPersonalArchive(guestId, page, align), resolve()});
            setInitDone(true);
        };

        dataSeq();
        
    },[page, align, visible]);

    if (!visible) return null;

    return (
        <div className={styles.overlay} onClick={()=>{onClose(); setPage(1); setAlign('dateDesc');}}>
            <div
                className={styles.modal}
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modalTitle"
            >
                <button className={styles.closeBtn} onClick={()=>{onClose(); setPage(1); setAlign('dateDesc');}} aria-label="Close modal">
                    &times;
                </button>

                <h2 id="modalTitle" className={styles.title}>전생 기록</h2>

                <div className={styles.filterContainer}>
                    <select 
                        className={styles.selectBox} 
                        onChange={(e) => {setAlign(e.target.value); setPage(1)}}
                        value={align}
                    >
                        <option value="dateDesc" className={styles.option}>최신순</option>
                        <option value="dateAsc" className={styles.option}>오래된순</option>
                    </select>
                </div>

                <div className={styles.archiveList}>
                    <div className={styles.listHeader}>
                        <span>번호</span>
                        <span>장르</span>
                        <span>서브 장르</span>
                        <span>전생날짜</span>
                        <span>이동</span>
                    </div>
                    {!initDone ? null :
                        <>
                            {personalArchive.length == 0 ?
                                <>
                                    <div className={styles.listItemEmpty}>아직 전생 기록이 없습니다.</div>
                                </> :
                                <>
                                    {personalArchive.map((item) => (
                                        <div key={item.sim_idx} className={styles.listItem}>
                                            <span className={styles.item}>{item.sim_idx}번 이세계</span>
                                            <span className={styles.item}>{item.genre}</span>
                                            <span className={styles.item}>{item.sub_genre}</span>
                                            <span className={styles.item}>{item.sim_date.split(' ')[0]}</span>
                                            <div className={styles.linkBtn} onClick={()=>{location.href=`/component/reincarnation?simIdx=${item.sim_idx}`}}>
                                                →
                                            </div>
                                        </div>
                                    ))}
                                </>
                            }
                        </>
                    }
                </div>

                <div className={styles.pagination}>
                    {!initDone ? null :
                        <>
                            {page > 1 && (
                                <button 
                                    className={styles.pageBtn} 
                                    onClick={() => setPage(1)}
                                    aria-label="First page"
                                >
                                    &laquo;
                                </button>
                            )}
                            {Array.from({ length: totalPage }, (_, i) => i + 1)
                                    .filter((pageNum) => {
                                        if (page <= 3) return pageNum <= 5;
                                        if (page > totalPage - 2) return pageNum > totalPage - 5;
                                        return pageNum >= page - 2 && pageNum <= page + 2;
                                    })
                                    .map((pageNum) => (
                                        <button
                                            key={pageNum}
                                            className={`${styles.pageBtn} ${page === pageNum ? styles.activePage : ''}`}
                                            onClick={() => setPage(pageNum)}
                                        >
                                            {pageNum}
                                        </button>
                                    ))}
                                {totalPage > 5 && page < totalPage - 2 && (
                                    <>
                                        <span className={styles.ellipsis}>...</span>
                                        <button
                                            className={styles.pageBtn}
                                            onClick={() => setPage(totalPage)}
                                        >
                                            {totalPage}
                                        </button>
                                    </>
                                )}
                        </>
                    }
                </div>

                <div className={styles.footer}>
                    <button className={styles.backBtn} onClick={()=>{onClose(); setPage(1); setAlign('dateDesc');}}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};