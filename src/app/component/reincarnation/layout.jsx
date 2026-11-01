import { Suspense } from 'react';
import JsonLd from '../../jsonLd';
import { buildMetadata, buildWebPageLd, WEBAPP_ID } from '../../../util/seo';

// 전생 신청서(설문) 페이지 메타데이터·구조화 데이터
const TITLE = '전생 신청서 작성';
const DESC = '이름, 생일, 성별, 특기와 치트 능력, 여신의 선물, 희망 이세계를 골라 AI 환생 시뮬레이션을 시작하는 이세계 전생 테스트 신청서.';
const PATH = '/component/reincarnation';

export const metadata = buildMetadata({ title: TITLE, description: DESC, path: PATH });

const jsonLd = buildWebPageLd({
    name: TITLE,
    description: DESC,
    path: PATH,
    extra: { mainEntity: { '@id': WEBAPP_ID } },
});

export default function ReincarnationLayout({ children }) {
    return (
        <>
            <JsonLd data={jsonLd}/>
            {/* 설문 페이지는 useSearchParams 때문에 클라이언트 렌더링으로 빠진다. 경계를 여기 둬서 JSON-LD 는 서버 HTML 에 남긴다 */}
            <Suspense>{children}</Suspense>
        </>
    );
}
