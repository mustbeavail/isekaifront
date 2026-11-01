// JSON-LD 구조화 데이터 출력용 컴포넌트 (서버에서 HTML 에 바로 박힌다)
// '<' 를 유니코드로 바꿔 문자열 안의 태그가 스크립트를 깨지 못하게 한다 (Next.js 공식 권장 방식)
export default function JsonLd({ data }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    );
}
