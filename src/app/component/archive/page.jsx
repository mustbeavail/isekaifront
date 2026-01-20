import axios from "axios";
import { cookies } from 'next/headers';
import ArchiveCompo from './archiveCompo';
import Footer from '../../footer';

const Archive = async () => {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const cookieStore = cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map(c => `${c.name}=${c.value}`)
        .join('; ');

    const ranSimResult = await axios.get(`http://backend:8080/todayIsekai`, {headers: {cookie: cookieHeader ?? ''}});

    return (
        <>
            <div className='container'>
                <title>이세계 전생 시뮬레이션 아카이브</title>
                <h1 className='sr-only'>다양한 이세계 세계관 전생 시뮬레이션 아카이브</h1>
                <ArchiveCompo ranSimResult = {ranSimResult.data}/>
            </div>
            <Footer visible={true}/>
        </>
    )
}

export default Archive;