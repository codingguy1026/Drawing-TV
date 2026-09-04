"use client";

import { useState } from "react";

const videos=[
 {title:"한화는 대체 왜 이러는가",state:"공개",views:"128K",watch:"8.4K시간",processing:"완료"},
 {title:"DTV UI 만드는 과정",state:"예약",views:"-",watch:"-",processing:"HD 처리 중"},
 {title:"새벽 라디오 테스트",state:"비공개",views:"2.1K",watch:"310시간",processing:"완료"},
];
export default function StudioPage(){
 const [section,setSection]=useState("대시보드");
 return <main className="pf-shell"><div className="pf-wrap"><header className="pf-head"><div><span className="pf-kicker">DTV CREATOR STUDIO</span><h1 className="pf-title">크리에이터 스튜디오</h1><p className="pf-sub">조회수, 시청시간, 구독자 변화, 업로드 처리 상태, 댓글 모더레이션을 한 화면에서 관리합니다.</p></div><div className="pf-actions"><a className="pf-btn primary" href="/upload">＋ 새 영상</a><a className="pf-btn" href="/">홈</a></div></header>
 <div className="pf-tabs">{["대시보드","콘텐츠","분석","댓글 관리"].map(x=><button key={x} className={`pf-tab ${section===x?"active":""}`} onClick={()=>setSection(x)}>{x}</button>)}</div>
 {section==="대시보드"&&<><div className="pf-grid"><div className="pf-card pf-span3 pf-stat"><span>지난 28일 조회수</span><strong>384K</strong><small className="pf-up">▲ 18.4%</small></div><div className="pf-card pf-span3 pf-stat"><span>시청 시간</span><strong>21.7K</strong><small className="pf-up">▲ 9.1%</small></div><div className="pf-card pf-span3 pf-stat"><span>구독자</span><strong>+1,284</strong><small className="pf-up">▲ 23.2%</small></div><div className="pf-card pf-span3 pf-stat"><span>평균 시청 유지율</span><strong>47.8%</strong><small>안정적</small></div><section className="pf-card pf-span8"><div className="pf-between"><h2>채널 성장</h2><span className="pf-badge">28 DAYS</span></div><div className="pf-chart">{[30,42,38,55,49,72,66,82,76,94,88,100].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div></section><aside className="pf-card pf-span4"><h2>빠른 상태</h2><div className="pf-stack" style={{marginTop:14}}><div className="pf-between"><span>처리 중 영상</span><b>1</b></div><div className="pf-between"><span>검토할 댓글</span><b>7</b></div><div className="pf-between"><span>저작권 확인</span><b>0</b></div><div className="pf-between"><span>예약 방송</span><b>1</b></div></div></aside></div></>}
 {section==="콘텐츠"&&<section className="pf-card table-card"><div className="pf-between"><h2>콘텐츠</h2><a className="pf-btn primary" href="/upload">업로드</a></div><table className="pf-table"><thead><tr><th>영상</th><th>상태</th><th>처리</th><th>조회수</th><th>시청 시간</th><th>관리</th></tr></thead><tbody>{videos.map(v=><tr key={v.title}><td>{v.title}</td><td>{v.state}</td><td><span className={`pf-status ${v.processing==="완료"?"good":"wait"}`}>{v.processing}</span></td><td>{v.views}</td><td>{v.watch}</td><td><button className="pf-btn">수정</button></td></tr>)}</tbody></table></section>}
 {section==="분석"&&<div className="pf-grid"><section className="pf-card pf-span7"><h2>유입 경로</h2><div className="pf-stack" style={{marginTop:14}}>{[["DTV 추천",61],["검색",18],["채널 페이지",12],["외부 공유",9]].map(x=><div key={x[0] as string}><div className="pf-between"><span>{x[0]}</span><b>{x[1]}%</b></div><div className="pf-progress"><span style={{width:`${x[1]}%`}}/></div></div>)}</div></section><aside className="pf-card pf-span5"><h2>시청자</h2><p>신규 42% · 재방문 58%</p><p className="pf-note">추천: 첫 30초 이탈률이 낮은 영상에서 후속편을 만들어보세요.</p></aside></div>}
 {section==="댓글 관리"&&<section className="pf-card"><div className="pf-between"><h2>검토 대기</h2><span className="pf-badge">7 COMMENTS</span></div><div className="pf-list">{["링크 도배 감지","신고 3회 누적 댓글","필터 단어 포함 댓글"].map((x,i)=><div className="pf-item" key={x}><div className="pf-avatar">{i+1}</div><div><b>{x}</b><small>@viewer{i+12} · 3분 전</small></div><div className="pf-row"><button className="pf-btn">승인</button><button className="pf-btn danger">숨김</button></div></div>)}</div></section>}
 </div></main>
}
