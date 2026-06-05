// document.getElementById('searchForm').addEventListener('submit', function(e) {
//     e.preventDefault(); // 폼기본동작차단(새로고침)
//     const query = document.getElementById('searchInput').value.trim();
//     if (!query) return;
//     window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
// });

// ── 챔피언데이터──────────────────────────────────────────────
const CHAMPIONS = [
{ name: '아트록스', engName: 'Aatrox', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Aatrox.png', difficulty: '상', modalId: 'aatroxModal' },
{ name: '사일러스', engName: 'Sylas', role: '마법사', lane: '정글/미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Sylas.png', difficulty: '중', modalId: 'sylasModal' },
{ name: '애니비아', engName: 'Anivia', role: '마법사', lane: '미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Anivia.png', difficulty: '상', modalId: 'aniviaModal' },
{ name: '브라이어', engName: 'Briar', role: '전사', lane: '정글', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Briar.png', difficulty: '중', modalId: 'briarModal' },
{ name: '잭스', engName: 'Jax', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Jax.png', difficulty: '하', modalId: 'jaxModal' },
{ name: '징크스', engName: 'Jinx', role: '원거리딜러', lane: '원딜', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Jinx.png', difficulty: '중', modalId: 'jinxModal' },
{ name: '멜', engName: 'Mel', role: '마법사', lane: '미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Mel.png', difficulty: '중', modalId: 'melModal' },
{ name: '유나라', engName: 'Yunara', role: '원거리딜러', lane: '원딜', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Yunara.png', difficulty: '중', modalId: 'yunaraModal' },
{ name: '오로라', engName: 'Aurora', role: '마법사', lane: '미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Aurora.png', difficulty: '상', modalId: 'auroraModal' }
];

// ── 뉴스데이터──────────────────────────────────────────────
const NEWS = [
{ title: '새로운 챔피언 출시', desc: '2026 루나 레벨 이벤트! 신규 챔피언과 함께하는 특별한 시즌.', category: '게임 업데이트' },
{ title: '패치 노트 16.4', desc: '챔피언 밸런스 및 아이템 업데이트 내용을 확인하세요.', category: '패치노트' },
];

// ── 검색실행────────────────────────────────────────────────
function performSearch(query) {
    const q = query.trim().toLowerCase(); // 앞뒤공백제거, 소문자변환
    
    if (!q) {
        showMainScreen();
        return;
    }

    document.getElementById('searchKeywordDisplay').textContent= `"${query}"`; // 검색어인식

    // 챔피온데이터에서이름, 영문명, 역할군, 라인중 하나라도 검색어에 포함되면
    const champResults= CHAMPIONS.filter(c =>
        c.name.includes(q) ||
        c.engName.toLowerCase().includes(q) ||
        c.role.includes(q) ||
        c.lane.includes(q)
    );

    // 뉴스데이터에서제목, 설명, 카테고리중 하나라도 검색어에 포함되면
    const newsResults= NEWS.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.desc.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
    );

    // 검색결과 개수를 카운트영역에 표시
    document.getElementById('champCount').textContent= `(${champResults.length})`;
    document.getElementById('newsCount').textContent= `(${newsResults.length})`;

    // 검색결과없는경우, 있으면카드형태출력
    const champList= document.getElementById('championResultList');

    if (champResults.length=== 0) {

        champList.innerHTML=
        `<div class="no-result">
            <h4>검색 결과 없음</h4>
            <p>"${query}"에 해당하는 챔피언이 없습니다.</p>
        </div>`;

    } else {

        champList.innerHTML= champResults.map(c => `
            <div
                class="search-result-card d-flex align-items-center p-0 overflow-hidden"
                data-bs-toggle="modal"
                data-bs-target="#${c.modalId}"
                style="cursor:pointer;"
            >

                <img src="${c.img}" alt="${c.name}">

                <div class="p-3">

                    <div style="font-weight:700; font-size:1rem; color:#111;">
                        ${c.name}
                        <span style="color:#888; font-size:0.85rem;">
                            (${c.engName})
                        </span>
                    </div>

                    <div style="color:#555; font-size:0.9rem; margin-top:4px;">
                        역할: ${c.role}
                        &nbsp;|&nbsp;
                        라인: ${c.lane}
                        &nbsp;|&nbsp;
                        난이도: ${c.difficulty}
                    </div>

                </div>

            </div>
        `).join('');
    }

    // 검색결과없는경우, 있으면카드형태출력
    const newsList= document.getElementById('newsResultList');

    if (newsResults.length=== 0) {

        newsList.innerHTML=
        `<div class="no-result">
            <h4>검색 결과 없음</h4>
            <p>"${query}"에 해당하는 뉴스가 없습니다.</p>
        </div>`;

    } else {

        newsList.innerHTML= newsResults.map(n => `
            <div class="search-result-card p-3">

                <span style="
                    font-size:0.75rem;
                    background:#c8253a;
                    color:#fff;
                    padding:2px 8px;
                    border-radius:3px;">
                    ${n.category}
                </span>

                <div style="
                    font-weight:700;
                    font-size:1rem;
                    color:#111;
                    margin-top:8px;">
                    ${n.title}
                </div>

                <div style="
                    color:#555;
                    font-size:0.9rem;
                    margin-top:4px;">
                    ${n.desc}
                </div>

            </div>
        `).join('');
    }

    // 챔피온탭이먼저보임
    switchCategory(
        'champion',
        document.querySelector('.search-category-item')
    );

    // 히어로섹션숨김
    document.querySelector('.hero').classList.add('d-none');

    // 나머지섹션숨김
    document
        .querySelectorAll('section:not(#searchResults)')
        .forEach(s => s.classList.add('d-none'));

    // 결과섹션만출력
    document.getElementById('searchResults').classList.remove('d-none');
    document.getElementById('searchResults').style.display= 'block';

} // performSearch 끝

// ── 메인화면 복귀 ────────────────────────────────────────────
function showMainScreen() {

    // 검색결과 숨김
    document.getElementById('searchResults').style.display = 'none';

    // Hero 다시 표시
    document.querySelector('.hero').classList.remove('d-none');

    // 챔피언, 뉴스 섹션 다시 표시
    document
        .querySelectorAll('section:not(#searchResults)')
        .forEach(s => s.classList.remove('d-none'));
}

// ── 카테고리 전환 ────────────────────────────────────────────
function switchCategory(type, el) {

    document
        .querySelectorAll('.search-category-item')
        .forEach(i => i.classList.remove('active'));

    el.classList.add('active');

    document.getElementById('resultChampion').style.display =
        type === 'champion' ? 'block' : 'none';

    document.getElementById('resultNews').style.display =
        type === 'news' ? 'block' : 'none';
}

// ── 폼 이벤트 ────────────────────────────────────────────────
document.getElementById('searchForm').addEventListener('submit', function(e) {

    e.preventDefault(); // 폼기본동작차단(새로고침)

    const query =
        document.getElementById('searchInput').value;

    performSearch(query); // 검색실행
});

// ── 실시간 검색 ──────────────────────────────────────────────
document.getElementById('searchInput')
    .addEventListener('input', function() {

        const query = this.value;

        if (query.trim() === '') {
            showMainScreen();
        } else {
            performSearch(query);
        }
});