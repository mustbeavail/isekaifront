import JsonLd from '../../jsonLd';
import { buildMetadata, buildWebPageLd } from '../../../util/seo';

// 문의 페이지 메타데이터·구조화 데이터
const TITLE = '문의하기';
const DESC = '이세계 전생 시뮬레이터 이용 중 불편한 점, 오류 제보, 새로운 장르나 기능 제안은 이메일로 보내 주세요.';
const PATH = '/component/contact';

export const metadata = buildMetadata({ title: TITLE, description: DESC, path: PATH });

const jsonLd = buildWebPageLd({ type: 'ContactPage', name: TITLE, description: DESC, path: PATH });

export default function ContactLayout({ children }) {
    return (
        <>
            <JsonLd data={jsonLd}/>
            {children}
        </>
    );
}
