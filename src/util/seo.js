// 검색엔진 노출용 공통 값과 페이지별 메타데이터 생성 함수

export const SITE_URL = 'https://isekaireincarnation.com';
export const SITE_NAME = '이세계 전생 시뮬레이터';
export const OG_IMAGE = {
    url: `${SITE_URL}/thumbnail.webp`,
    width: 1200,
    height: 630,
};

// 사이트 전체를 가리키는 JSON-LD 식별자 (페이지끼리 서로 참조할 때 쓴다)
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const WEBAPP_ID = `${SITE_URL}/#webapp`;

// 페이지별 메타데이터
// Next.js 는 자식 페이지의 openGraph 가 부모 것을 통째로 덮어쓰므로, 이미지·사이트명을 매번 함께 넣는다.
export function buildMetadata({ title, absoluteTitle, description, path, noindex = false }) {
    const url = `${SITE_URL}${path}`;
    const ogTitle = absoluteTitle ?? `${title} | ${SITE_NAME}`;

    return {
        title: absoluteTitle ? { absolute: absoluteTitle } : title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title: ogTitle,
            description,
            url,
            siteName: SITE_NAME,
            images: [OG_IMAGE],
            locale: 'ko_KR',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: ogTitle,
            description,
            images: [OG_IMAGE.url],
        },
        ...(noindex ? { robots: { index: false, follow: false } } : {}),
    };
}

// 하위 페이지 공통 WebPage 스키마
export function buildWebPageLd({ type = 'WebPage', name, description, path, extra = {} }) {
    return {
        '@context': 'https://schema.org',
        '@type': type,
        '@id': `${SITE_URL}${path}#webpage`,
        name,
        description,
        url: `${SITE_URL}${path}`,
        inLanguage: 'ko-KR',
        isPartOf: { '@id': WEBSITE_ID },
        ...extra,
    };
}
