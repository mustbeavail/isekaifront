import JsonLd from '../../jsonLd';
import { buildMetadata, buildWebPageLd } from '../../../util/seo';

// 이세계 아카이브(다른 사람들의 전생 결과) 페이지 메타데이터·구조화 데이터
const TITLE = '이세계 아카이브';
const DESC = '다른 사람들이 전생한 이세계를 구경해 보세요. 판타지, 다크 판타지, SF, 사이버펑크 등 오늘의 이세계 전생 결과 모음.';
const PATH = '/component/archive';

export const metadata = buildMetadata({ title: TITLE, description: DESC, path: PATH });

const jsonLd = buildWebPageLd({ type: 'CollectionPage', name: TITLE, description: DESC, path: PATH });

export default function ArchiveLayout({ children }) {
    return (
        <>
            <JsonLd data={jsonLd}/>
            {children}
        </>
    );
}
