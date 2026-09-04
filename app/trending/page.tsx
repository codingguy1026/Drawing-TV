"use client";

import { useState } from "react";

const trends=[
 ["01","⚾","한화 경기 반응 폭발","드가이 스포츠","+284%"],
 ["02","⌨","새 UI 디자인 챌린지","Pixel Lab","+171%"],
 ["03","♫","새벽 감성 라디오","새벽 주파수","+142%"],
 ["04","👁","공포게임 3초 클립","404 플레이룸","+119%"],
 ["05","✎","그림 한 선 챌린지","모노 드로잉","+96%"],
];
export default function TrendingPage(){
 const [hidden,setHidden]=useState<string[]>([]); const [category,setCategory]=useState("전체");
 return <main className="pf-shell"><div className="pf-wrap"><header className="pf-head"><div><span className="pf-kicker">DTV TRENDING</span><h1 className="pf-title">인기 급상승</h1><p className="pf-sub">지금 빠르게 올라오는 영상과 채널을 보고, 관심 없음/추천 제외로 내 추천을 직접 조정합니다.</p></div><a className="pf-btn" href="/search">검색</a></header>
 <div className="pf-tabs">{["전체","스포츠","게임","IT","음악","그림"].map(x=><button key={x} className={`pf-tab ${category===x?"active":""}`} onClick={()=>setCategory(x)}>{x}</button>)}</div>
 <section className="pf-card"><div className="pf-between"><h2>{category} 급상승 신호</h2><span className="pf-badge">REAL-TIME DEMO</span></div>{trends.filter(x=>!hidden.includes(x[3])).map((x,i)=><article className="pf-result" key={x[0]}><div className="pf-result-art"><strong style={{position:"absolute",margin:"-58px 0 0 -85px",fontSize:10}}>{x[0]}</strong>{x[1]}</div><div><span className="pf-kicker">TRENDING · {x[4]}</span><h3>{x[2]}</h3><p>{x[3]} · 지난 6시간 기준 상승 중</p></div><div className="pf-stack"><a className="pf-btn primary" href={`/watch/${i+1}`}>재생</a><button className="pf-btn" onClick={()=>setHidden(v=>[...v,x[3]])}>관심 없음</button><button className="pf-btn" onClick={()=>setHidden(v=>[...v,x[3]])}>이 채널 추천 안 함</button></div></article>)}</section>
 </div></main>
}
