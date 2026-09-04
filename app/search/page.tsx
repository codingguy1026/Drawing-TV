"use client";

import { useMemo, useState } from "react";

const data=[
 {type:"영상",icon:"⚾",title:"한화는 대체 왜 이러는가",channel:"드가이 스포츠",meta:"12만회 · 3시간 전"},
 {type:"LIVE",icon:"●",title:"오늘 경기 같이 보기",channel:"드가이 스포츠",meta:"1.2K명 시청 중"},
 {type:"클립",icon:"👁",title:"3초 뒤에 분위기 바뀜",channel:"404 플레이룸",meta:"41K 반응"},
 {type:"채널",icon:"⌨",title:"Pixel Lab",channel:"@pixellab",meta:"구독자 8.4만"},
 {type:"영상",icon:"♫",title:"10분 동안 아무 생각 없이 듣는 밤 라디오",channel:"새벽 주파수",meta:"19만회 · 2일 전"},
];
export default function SearchPage(){
 const [query,setQuery]=useState(""); const [type,setType]=useState("전체"); const [sort,setSort]=useState("관련도"); const [hidden,setHidden]=useState<string[]>([]);
 const results=useMemo(()=>data.filter(x=>(type==="전체"||x.type===type)&&!hidden.includes(x.channel)&&(!query||`${x.title} ${x.channel}`.toLowerCase().includes(query.toLowerCase()))),[query,type,hidden]);
 return <main className="pf-shell"><div className="pf-wrap"><header className="pf-head"><div><span className="pf-kicker">DTV DISCOVERY</span><h1 className="pf-title">검색</h1><p className="pf-sub">영상, 채널, LIVE, 클립을 한 번에 찾고 결과 유형과 정렬 기준을 바로 조정합니다.</p></div><a className="pf-btn" href="/trending">인기 급상승 ↗</a></header>
 <section className="pf-card"><input className="pf-search" autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="영상, 채널, LIVE, 클립 검색"/><div className="pf-between" style={{marginTop:12,alignItems:"flex-start"}}><div className="pf-row" style={{flexWrap:"wrap"}}>{["전체","영상","채널","LIVE","클립"].map(x=><button key={x} className={`pf-chip ${type===x?"active":""}`} onClick={()=>setType(x)}>{x}</button>)}</div><select className="pf-btn" value={sort} onChange={e=>setSort(e.target.value)}><option>관련도</option><option>최신순</option><option>조회수</option><option>길이 짧은순</option></select></div><div className="pf-row" style={{marginTop:10,flexWrap:"wrap"}}><span className="pf-badge">업로드 날짜</span><span className="pf-badge">길이</span><span className="pf-badge">자막 있음</span><span className="pf-badge">HD 이상</span><span className="pf-badge">실시간</span></div></section>
 <section className="pf-card" style={{marginTop:14}}><div className="pf-between"><h2>{query?`“${query}” 검색 결과`:"추천 검색 결과"}</h2><span className="pf-badge">{sort} · {results.length}개</span></div>{results.map((x,i)=><article className="pf-result" key={x.title}><div className="pf-result-art">{x.icon}</div><div><span className="pf-kicker">{x.type}</span><h3>{x.title}</h3><p>{x.channel} · {x.meta}</p></div><div className="pf-stack"><a className="pf-btn primary" href={x.type==="채널"?"/channel/pixellab":x.type==="클립"?"/clips":`/watch/${i+1}`}>열기</a><button className="pf-btn" onClick={()=>setHidden(v=>[...v,x.channel])}>이 채널 추천 안 함</button><button className="pf-btn" onClick={()=>setHidden(v=>[...v,x.channel])}>관심 없음</button></div></article>)}{!results.length&&<div className="pf-empty">NO SIGNAL · 조건에 맞는 결과가 없습니다.</div>}</section>
 </div></main>
}
