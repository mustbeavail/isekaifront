import JsonLd from '../../jsonLd';
import { buildMetadata, buildWebPageLd } from '../../../util/seo';

// 개인정보 처리방침 페이지 메타데이터·구조화 데이터
const TITLE = '개인정보 처리방침';
const DESC = '이세계 전생 시뮬레이터의 개인정보 처리방침과 Google AdSense 쿠키 사용 안내.';
const PATH = '/component/privacy';

export const metadata = buildMetadata({ title: TITLE, description: DESC, path: PATH });

const jsonLd = buildWebPageLd({ name: TITLE, description: DESC, path: PATH });

export default function PrivacyLayout({ children }) {
    return (
        <>
            <JsonLd data={jsonLd}/>
            {children}
        </>
    );
}
