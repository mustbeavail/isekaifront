import { SITE_URL } from '../util/seo';

// /sitemap.xml 로 제공되는 사이트맵 (Next.js 메타데이터 라우트)
// 검색 노출 대상 공개 페이지만 넣는다. 관리자 통계 페이지(/component/stats)는 제외.
export default function sitemap() {
    const pages = [
        { path: '/', priority: 1.0, changeFrequency: 'weekly' },
        { path: '/component/reincarnation', priority: 0.9, changeFrequency: 'monthly' },
        { path: '/component/archive', priority: 0.7, changeFrequency: 'daily' },
        { path: '/component/about', priority: 0.5, changeFrequency: 'yearly' },
        { path: '/component/contact', priority: 0.3, changeFrequency: 'yearly' },
        { path: '/component/privacy', priority: 0.3, changeFrequency: 'yearly' },
    ];

    return pages.map(p => ({
        url: `${SITE_URL}${p.path === '/' ? '' : p.path}`,
        changeFrequency: p.changeFrequency,
        priority: p.priority,
    }));
}
