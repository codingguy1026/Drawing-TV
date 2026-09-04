"use client";

import { useState } from "react";

const initial=[
 {id:1,type:"댓글",reason:"괴롭힘/모욕 신고",target:"@viewer91",age:"전체",status:"대기"},
 {id:2,type:"영상",reason:"연령 등급 재검토",target:"S-041",age:"12+",status:"대기"},
 {id:3,type:"LIVE",reason:"스팸 신고 12회",target:"CH-404",age:"15+",status:"대기"},
];
export default function AdminPage(){
 const [items,setItems]=useState(initial); const act=(id:number,status:string)=>setItems(v=>v.map(x=>x.id===id?{...x,status}:x));
 return <main className="pf-shell"><div className="pf-wrap"><header className="pf-head"><div><span className="pf-kicker">DTV TRUST & SAFETY</span><h1 className="pf-title">관리자 콘솔</h1><p className="pf-sub">신고, 차단, 숨김, 콘텐츠 등급, 채널 제재와 모더레이션 상태를 관리하는 운영 화면입니다.</p></div><a className="pf-btn" href="/">홈</a></header>
 <div className="pf-grid"><div className="pf-card pf-span3 pf-stat"><span>오늘 신고</span><strong>38</strong><small>전일 대비 -12%</small></div><div className="pf-card pf-span3 pf-stat"><span>검토 대기</span><strong>{items.filter(x=>x.status==="대기").length}</strong><small className="pf-down">우선 처리 필요</small></div><div className="pf-card pf-span3 pf-stat"><span>차단 계정</span><strong>14</strong><small>24시간 기준</small></div><div className="pf-card pf-span3 pf-stat"><span>자동 필터 적중</span><strong>96.2%</strong><small className="pf-up">정상</small></div>
 <section className="pf-card pf-span12 table-card"><div className="pf-between"><h2>신고 검토 큐</h2><span className="pf-badge">MODERATION</span></div><table className="pf-table"><thead><tr><th>유형</th><th>사유</th><th>대상</th><th>현재 등급</th><th>상태</th><th>조치</th></tr></thead><tbody>{items.map(x=><tr key={x.id}><td>{x.type}</td><td>{x.reason}</td><td>{x.target}</td><td><select className="pf-btn" defaultValue={x.age}><option>전체</option><option>12+</option><option>15+</option><option>18+</option></select></td><td><span className={`pf-status ${x.status==="대기"?"wait":x.status==="승인"?"good":"bad"}`}>{x.status}</span></td><td><div className="pf-row"><button className="pf-btn" onClick={()=>act(x.id,"승인")}>문제 없음</button><button className="pf-btn danger" onClick={()=>act(x.id,"숨김")}>숨김</button><button className="pf-btn danger" onClick={()=>act(x.id,"차단")}>차단</button></div></td></tr>)}</tbody></table></section>
 <section className="pf-card pf-span6"><h2>자동 모더레이션</h2><div className="pf-stack" style={{marginTop:12}}><label className="pf-between"><span>스팸 링크 자동 숨김</span><span className="pf-toggle"><input type="checkbox" defaultChecked/></span></label><label className="pf-between"><span>반복 댓글 제한</span><span className="pf-toggle"><input type="checkbox" defaultChecked/></span></label><label className="pf-between"><span>신고 누적 임시 숨김</span><span className="pf-toggle"><input type="checkbox" defaultChecked/></span></label></div></section><section className="pf-card pf-span6"><h2>운영 도구</h2><p>채널/사용자 검색 후 경고, 일시 제한, 차단, 추천 제외를 적용합니다.</p><div className="pf-row"><input className="pf-search" placeholder="채널 또는 @사용자"/><button className="pf-btn primary">조회</button></div></section>
 </div></div></main>
}
