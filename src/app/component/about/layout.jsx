import JsonLd from '../../jsonLd';
import { buildMetadata, buildWebPageLd, WEBSITE_ID } from '../../../util/seo';

// 서비스 소개 페이지 메타데이터·구조화 데이터
const TITLE = '서비스 소개';
const DESC = '이세계 전생 시뮬레이터는 몇 가지 질문에 답하면 AI가 나만의 이세계 전생 이야기를 써 주는 웹서비스예요. 주요 기능과 이용 안내를 소개해요.';
const PATH = '/component/about';

export const metadata = buildMetadata({ title: TITLE, description: DESC, path: PATH });

const jsonLd = buildWebPageLd({
    type: 'AboutPage',
    name: TITLE,
    description: DESC,
    path: PATH,
    extra: { about: { '@id': WEBSITE_ID } },
});

export default function AboutLayout({ children }) {
    return (
        <>
            <JsonLd data={jsonLd}/>
            {children}
        </>
    );
}
