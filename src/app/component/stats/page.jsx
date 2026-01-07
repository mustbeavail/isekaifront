'use client'
import axios from "axios";
import styles from './stats.module.css';
import { formatInTimeZone } from "date-fns-tz";
import {useEffect, useState} from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const AdminStats = () => {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;
    const today = formatInTimeZone(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss').split(' ')[0];
    const sixDaysAgo = formatInTimeZone(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss').split(' ')[0];
    const [userStats, setUserStats] = useState({});
    const [isekaiStats, setIsekaiStats] = useState({});
    const [visitStartDate, setVisitStartDate] = useState(sixDaysAgo);
    const [visitEndDate, setVisitEndDate] = useState(today);
    const [guestStartDate, setGuestStartDate] = useState(sixDaysAgo);
    const [guestEndDate, setGuestEndDate] = useState(today);
    const [surveyStartDate, setSurveyStartDate] = useState(sixDaysAgo);
    const [surveyEndDate, setSurveyEndDate] = useState(today);
    const [simStartDate, setSimStartDate] = useState(sixDaysAgo);
    const [simEndDate, setSimEndDate] = useState(today);
    const [periodVisit, setPeriodVisit] = useState({});
    const [periodGuest, setPeriodGuest] = useState({});
    const [periodSurvey, setPeriodSurvey] = useState({});
    const [periodSim, setPeriodSim] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getUserStats = async(today)=>{
        const {data} = await axios.get(`${API_URL}/userStats`, {params: {today}});
        setUserStats(data);
    };
    const getIsekaiStats = async(today)=>{
        const {data} = await axios.get(`${API_URL}/isekaiStats`, {params: {today}});
        setIsekaiStats(data);
    };
    const getPeriodVisit = async(startDate, endDate) => {
        const {data} = await axios.get(`${API_URL}/periodVisit`, {params: {startDate, endDate}});
        setPeriodVisit(data);
    };
    const getPeriodGuest = async(startDate, endDate) => {
        const {data} = await axios.get(`${API_URL}/periodGuest`, {params: {startDate, endDate}});
        setPeriodGuest(data);
    };
    const getPeriodSurvey = async(startDate, endDate) => {
        const {data} = await axios.get(`${API_URL}/periodSurvey`, {params: {startDate, endDate}});
        setPeriodSurvey(data);
    };
    const getPeriodSim = async(startDate, endDate) => {
        const {data} = await axios.get(`${API_URL}/periodSim`, {params: {startDate, endDate}});
        setPeriodSim(data);
    };

    const getDataSeq = async(today) => {
        await Promise.all([
            getUserStats(today),
            getIsekaiStats(today),
            getPeriodVisit(sixDaysAgo, today),
            getPeriodGuest(sixDaysAgo, today),
            getPeriodSurvey(sixDaysAgo, today),
            getPeriodSim(sixDaysAgo, today)
        ]);
        setIsLoading(false);
    };

    useEffect(()=>{
        getDataSeq(today);
    },[]);

    useEffect(()=>{
        if(!visitStartDate || !visitEndDate || isLoading) return;
        if(visitStartDate > visitEndDate) {
            alert('종료날짜가 시작날짜를 앞섭니다.');
            return;
        }
        getPeriodVisit(visitStartDate, visitEndDate);
    },[visitStartDate, visitEndDate]);
    useEffect(()=>{
        if(!guestStartDate || !guestEndDate || isLoading) return;
        if(guestStartDate > guestEndDate) {
            alert('종료날짜가 시작날짜를 앞섭니다.');
            return;
        }
        getPeriodGuest(guestStartDate, guestEndDate);
    },[guestStartDate, guestEndDate]);
    useEffect(()=>{
        if(!surveyStartDate || !surveyEndDate || isLoading) return;
        if(surveyStartDate > surveyEndDate) {
            alert('종료날짜가 시작날짜를 앞섭니다.');
            return;
        }
        getPeriodSurvey(surveyStartDate, surveyEndDate);
    },[surveyStartDate, surveyEndDate]);
    useEffect(()=>{
        if(!simStartDate || !simEndDate || isLoading) return;
        if(simStartDate > simEndDate) {
            alert('종료날짜가 시작날짜를 앞섭니다.');
            return;
        }
        getPeriodSim(simStartDate, simEndDate);
    },[simStartDate, simEndDate]);

    return (
        <>
            <div className='container'>
                {isLoading ? null :
                    <>
                        <div className={styles.twoInLineWrapper}>
                            <div className={styles.plainStatsWrapper}>
                                <div className={styles.head}>방문자 통계</div>
                                <span className={styles.userStatsContent}>총 방문 횟수 : {userStats.total_visit}</span>
                                <span className={styles.userStatsContent}>오늘의 방문 횟수 : {userStats.today_visit}</span>
                                <span className={styles.userStatsContent}>총 게스트 수 : {userStats.total_guest}</span>
                                <span className={styles.userStatsContent}>오늘의 신규 게스트 수 : {userStats.today_guest}</span>
                            </div>
                            <div className={styles.plainStatsWrapper}>
                            <div className={styles.head}>이용 통계</div>
                                <span className={styles.userStatsContent}>총 설문 횟수 : {isekaiStats.totalResult.total_survey_cnt}</span>
                                <span className={styles.userStatsContent}>총 시뮬레이션 횟수 : {isekaiStats.totalResult.total_isekai_cnt}</span>
                                <span className={styles.userStatsContent}>오늘의 설문 횟수 : {isekaiStats.totalResult.today_survey_cnt}</span>
                                <span className={styles.userStatsContent}>오늘의 시뮬레이션 횟수 : {isekaiStats.totalResult.today_isekai_cnt}</span>
                            </div>
                        </div>
                        <div className={styles.twoInLineWrapper}>
                            <div className={styles.head}>장르와 서브장르 통계</div>
                            <div className={styles.chartWrapper}>
                                <span className={styles.chartHead}>장르</span>
                                <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={isekaiStats.genreResult}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="genre" />
                                    <YAxis dataKey="cnt"/>
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                    type="monotone"
                                    dataKey="cnt"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    />
                                </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className={styles.chartWrapper}>
                                <span className={styles.chartHead}>서브장르</span>
                                <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={isekaiStats.subGenreResult}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="sub_genre" />
                                    <YAxis dataKey="cnt"/>
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                    type="monotone"
                                    dataKey="cnt"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    />
                                </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className={styles.twoInLineWrapper}>
                            <div className={styles.head}>전생 희망사항 통계</div>
                            <div className={styles.chartWrapper}>
                                <span className={styles.chartHead}>여신의 선물</span>
                                <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={isekaiStats.giftResult}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="wished_gift" />
                                    <YAxis dataKey="cnt"/>
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                    type="monotone"
                                    dataKey="cnt"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    />
                                </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className={styles.chartWrapper}>
                                <span className={styles.chartHead}>전생특전</span>
                                <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={isekaiStats.abilResult}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="wished_abil" />
                                    <YAxis dataKey="cnt"/>
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                    type="monotone"
                                    dataKey="cnt"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    />
                                </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className={styles.twoInLineWrapper}>
                            <div className={styles.head}>기간별 방문자 수 / 기간별 회원 수</div>
                            <div className={styles.chartWrapper}>
                                <span className={styles.chartHead}>방문자 수</span>
                                <div className={styles.dateWrapper}>
                                    <span>시작</span>
                                    <input
                                        type='date'
                                        max={today}
                                        onChange={(e)=>{setVisitStartDate(e.target.value)}}
                                        value={visitStartDate}
                                    />
                                    <span>끝</span>
                                    <input
                                        type='date'
                                        max={today}
                                        onChange={(e)=>{setVisitEndDate(e.target.value)}}
                                        value={visitEndDate}
                                    />
                                </div>
                                <ResponsiveContainer width="100%" height={400}>
                                <AreaChart data={periodVisit}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="stats_date" />
                                    <YAxis dataKey="cnt"/>
                                    <Tooltip />
                                    <Legend />
                                    <Area
                                    type="monotone"
                                    dataKey="cnt"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    />
                                </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className={styles.chartWrapper}>
                                <span className={styles.chartHead}>회원 수</span>
                                <div className={styles.dateWrapper}>
                                    <span>시작</span>
                                    <input
                                        type='date'
                                        max={today}
                                        onChange={(e)=>{setGuestStartDate(e.target.value)}}
                                        value={guestStartDate}
                                    />
                                    <span>끝</span>
                                    <input
                                        type='date'
                                        max={today}
                                        onChange={(e)=>{setGuestEndDate(e.target.value)}}
                                        value={guestEndDate}
                                    />
                                </div>
                                <ResponsiveContainer width="100%" height={400}>
                                <AreaChart data={periodGuest}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="stats_date" />
                                    <YAxis dataKey="cnt"/>
                                    <Tooltip />
                                    <Legend />
                                    <Area
                                    type="monotone"
                                    dataKey="cnt"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    />
                                </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className={styles.twoInLineWrapper}>
                            <div className={styles.head}>기간별 시뮬레이션 수 / 기간별 설문 수</div>
                            <div className={styles.chartWrapper}>
                                <span className={styles.chartHead}>시뮬레이션 수</span>
                                <div className={styles.dateWrapper}>
                                    <span>시작</span>
                                    <input
                                        type='date'
                                        max={today}
                                        onChange={(e)=>{setSimStartDate(e.target.value)}}
                                        value={simStartDate}
                                    />
                                    <span>끝</span>
                                    <input
                                        type='date'
                                        max={today}
                                        onChange={(e)=>{setSimEndDate(e.target.value)}}
                                        value={simEndDate}
                                    />
                                </div>
                                <ResponsiveContainer width="100%" height={400}>
                                <AreaChart data={periodSim}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="stats_date" />
                                    <YAxis dataKey="cnt"/>
                                    <Tooltip />
                                    <Legend />
                                    <Area
                                    type="monotone"
                                    dataKey="cnt"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    />
                                </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className={styles.chartWrapper}>
                                <span className={styles.chartHead}>설문 수</span>
                                <div className={styles.dateWrapper}>
                                    <span>시작</span>
                                    <input
                                        type='date'
                                        max={today}
                                        onChange={(e)=>{setSurveyStartDate(e.target.value)}}
                                        value={surveyStartDate}
                                    />
                                    <span>끝</span>
                                    <input
                                        type='date'
                                        max={today}
                                        onChange={(e)=>{setSurveyEndDate(e.target.value)}}
                                        value={surveyEndDate}
                                    />
                                </div>
                                <ResponsiveContainer width="100%" height={400}>
                                <AreaChart data={periodSurvey}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="stats_date" />
                                    <YAxis dataKey="cnt"/>
                                    <Tooltip />
                                    <Legend />
                                    <Area
                                    type="monotone"
                                    dataKey="cnt"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    />
                                </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default AdminStats;