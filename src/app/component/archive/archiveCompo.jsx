'use client'
import styles from './archive.module.css';
import {useState} from 'react';
import { useRouter } from "next/navigation";

export default function ArchiveCompo ({ranSimResult}) {

    const [simSel1, setSimSel1] = useState(false);
    const [simSel2, setSimSel2] = useState(false);
    const [simSel3, setSimSel3] = useState(false);
    const [simSel4, setSimSel4] = useState(false);
    const [simSel5, setSimSel5] = useState(false);

    const simResult1 = ranSimResult[0];
    const simResult2 = ranSimResult[1];
    const simResult3 = ranSimResult[2];
    const simResult4 = ranSimResult[3];
    const simResult5 = ranSimResult[4];

    const router = useRouter();

    // 날짜 가공 함수
    const getPrettyDate = (date) => {
        return date.split(' ')[0];
    };

    // 결과 페이지로 이동 함수
    const goResult = (idx) => {
        router.push(`/component/reincarnation?simIdx=${idx}`);
    };

    return(
        <>
            <div className={styles.emptyHeader}></div>
            <div className={styles.archiveContentWrapper}>
                <div className={styles.archiveBoard}>
                    <div 
                        className={styles.boardContentWrapper1}
                        onMouseEnter={()=>{setSimSel1(true)}}
                        onMouseLeave={()=>{setSimSel1(false)}}
                    >
                        <span className={styles.boardContentHead}>{simResult1.sim_idx}번째 이세계</span>
                        <span className={styles.boardContentHead}>
                            전생날짜: <span className={styles.boardContent}>{getPrettyDate(simResult1.sim_date)}</span>
                        </span>
                        <span className={styles.boardContentHead}>
                            세계관: <span className={styles.boardContent}>{simResult1.genre} - {simResult1.sub_genre}</span>
                        </span>
                        <div className={styles.boardContentBtn} onClick={()=>goResult(simResult1.sim_idx)}>보러가기👀</div>
                    </div>
                    <div
                        className={styles.boardContentWrapper2}
                        onMouseEnter={()=>{setSimSel2(true)}}
                        onMouseLeave={()=>{setSimSel2(false)}}
                    >
                        <span className={styles.boardContentHead}>{simResult2.sim_idx}번째 이세계</span>
                        <span className={styles.boardContentHead}>
                            전생날짜: <span className={styles.boardContent}>{getPrettyDate(simResult2.sim_date)}</span>
                        </span>
                        <span className={styles.boardContentHead}>
                            세계관: <span className={styles.boardContent}>{simResult2.genre} - {simResult2.sub_genre}</span>
                        </span>
                        <div className={styles.boardContentBtn} onClick={()=>goResult(simResult2.sim_idx)}>보러가기👀</div>
                    </div>
                    <div
                        className={styles.boardContentWrapper3}
                        onMouseEnter={()=>{setSimSel3(true)}}
                        onMouseLeave={()=>{setSimSel3(false)}}    
                    >
                        <span className={styles.boardContentHead}>{simResult3.sim_idx}번째 이세계</span>
                        <span className={styles.boardContentHead}>
                            전생날짜: <span className={styles.boardContent}>{getPrettyDate(simResult3.sim_date)}</span>
                        </span>
                        <span className={styles.boardContentHead}>
                            세계관: <span className={styles.boardContent}>{simResult3.genre} - {simResult3.sub_genre}</span>
                        </span>
                        <div className={styles.boardContentBtn} onClick={()=>goResult(simResult3.sim_idx)}>보러가기👀</div>
                    </div>
                    <div
                        className={styles.boardContentWrapper4}
                        onMouseEnter={()=>{setSimSel4(true)}}
                        onMouseLeave={()=>{setSimSel4(false)}}    
                    >
                        <span className={styles.boardContentHead}>{simResult4.sim_idx}번째 이세계</span>
                        <span className={styles.boardContentHead}>
                            전생날짜: <span className={styles.boardContent}>{getPrettyDate(simResult4.sim_date)}</span>
                        </span>
                        <span className={styles.boardContentHead}>
                            세계관: <span className={styles.boardContent}>{simResult4.genre} - {simResult4.sub_genre}</span>
                        </span>
                        <div className={styles.boardContentBtn} onClick={()=>goResult(simResult4.sim_idx)}>보러가기👀</div>
                    </div>
                    <div
                        className={styles.boardContentWrapper5}
                        onMouseEnter={()=>{setSimSel5(true)}}
                        onMouseLeave={()=>{setSimSel5(false)}}    
                    >
                        <span className={styles.boardContentHead}>{simResult5.sim_idx}번째 이세계</span>
                        <span className={styles.boardContentHead}>
                            전생날짜: <span className={styles.boardContent}>{getPrettyDate(simResult5.sim_date)}</span>
                        </span>
                        <span className={styles.boardContentHead}>
                            세계관: <span className={styles.boardContent}>{simResult5.genre} - {simResult5.sub_genre}</span>
                        </span>
                        <div className={styles.boardContentBtn} onClick={()=>goResult(simResult5.sim_idx)}>보러가기👀</div>
                    </div>
                </div>
                <div className={styles.archiveClipboard}>
                    <div
                        className={
                            simSel1 || simSel2 ||  simSel3 ||  simSel4 ||  simSel5 ?
                            styles.clipboardDefaultWrapper :
                            `${styles.clipboardDefaultWrapper} ${styles.visible}`
                        }>
                        <span>궁금한 이세계에<br/>마우스를 올려주세요 🖱️</span>
                    </div>
                    <div className={!simSel1 ? styles.clipboardContentWrapper : `${styles.clipboardContentWrapper} ${styles.visible}`}>
                        <div className={styles.synopWrapper}>
                            <span className={styles.clipboardHead}>시놉시스</span>
                            <span className={styles.clipboardBody}>{simResult1.synopsis}</span>
                        </div>
                        <div className={styles.profileWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ새로운 몸</span>
                            <span className={styles.clipboardSubBody}>{simResult1.profile}</span>
                        </div>
                        <div className={styles.giftWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ여신의 선물</span>
                            <span className={styles.clipboardSubBody}>{simResult1.isekai_gift}</span>
                        </div>
                        <div className={styles.abilWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ고유능력</span>
                            <span className={styles.clipboardSubBody}>{simResult1.isekai_abil}</span>
                        </div>
                    </div>
                    <div className={!simSel2 ? styles.clipboardContentWrapper : `${styles.clipboardContentWrapper} ${styles.visible}`}>
                        <div className={styles.synopWrapper}>
                            <span className={styles.clipboardHead}>시놉시스</span>
                            <span className={styles.clipboardBody}>{simResult2.synopsis}</span>
                        </div>
                        <div className={styles.profileWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ새로운 몸</span>
                            <span className={styles.clipboardSubBody}>{simResult2.profile}</span>
                        </div>
                        <div className={styles.giftWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ여신의 선물</span>
                            <span className={styles.clipboardSubBody}>{simResult2.isekai_gift}</span>
                        </div>
                        <div className={styles.abilWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ고유능력</span>
                            <span className={styles.clipboardSubBody}>{simResult2.isekai_abil}</span>
                        </div>
                    </div>
                    <div className={!simSel3 ? styles.clipboardContentWrapper : `${styles.clipboardContentWrapper} ${styles.visible}`}>
                        <div className={styles.synopWrapper}>
                            <span className={styles.clipboardHead}>시놉시스</span>
                            <span className={styles.clipboardBody}>{simResult3.synopsis}</span>
                        </div>
                        <div className={styles.profileWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ새로운 몸</span>
                            <span className={styles.clipboardSubBody}>{simResult3.profile}</span>
                        </div>
                        <div className={styles.giftWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ여신의 선물</span>
                            <span className={styles.clipboardSubBody}>{simResult3.isekai_gift}</span>
                        </div>
                        <div className={styles.abilWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ고유능력</span>
                            <span className={styles.clipboardSubBody}>{simResult3.isekai_abil}</span>
                        </div>
                    </div>
                    <div className={!simSel4 ? styles.clipboardContentWrapper : `${styles.clipboardContentWrapper} ${styles.visible}`}>
                        <div className={styles.synopWrapper}>
                            <span className={styles.clipboardHead}>시놉시스</span>
                            <span className={styles.clipboardBody}>{simResult4.synopsis}</span>
                        </div>
                        <div className={styles.profileWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ새로운 몸</span>
                            <span className={styles.clipboardSubBody}>{simResult4.profile}</span>
                        </div>
                        <div className={styles.giftWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ여신의 선물</span>
                            <span className={styles.clipboardSubBody}>{simResult4.isekai_gift}</span>
                        </div>
                        <div className={styles.abilWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ고유능력</span>
                            <span className={styles.clipboardSubBody}>{simResult4.isekai_abil}</span>
                        </div>
                    </div>
                    <div className={!simSel5 ? styles.clipboardContentWrapper : `${styles.clipboardContentWrapper} ${styles.visible}`}>
                        <div className={styles.synopWrapper}>
                            <span className={styles.clipboardHead}>시놉시스</span>
                            <span className={styles.clipboardBody}>{simResult5.synopsis}</span>
                        </div>
                        <div className={styles.profileWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ새로운 몸</span>
                            <span className={styles.clipboardSubBody}>{simResult5.profile}</span>
                        </div>
                        <div className={styles.giftWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ여신의 선물</span>
                            <span className={styles.clipboardSubBody}>{simResult5.isekai_gift}</span>
                        </div>
                        <div className={styles.abilWrapper}>
                            <span className={styles.clipboardSubHead}>ㆍ고유능력</span>
                            <span className={styles.clipboardSubBody}>{simResult5.isekai_abil}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};