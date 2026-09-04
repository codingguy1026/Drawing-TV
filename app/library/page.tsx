"use client";

import { useState } from "react";

const recent=[
  ["⚾","한화는 대체 왜 이러는가","드가이 스포츠","37%"],
  ["⌨","웹사이트 디자인 하나만 바꿔도 달라집니다","Pixel Lab","68%"],
  ["♫","10분 동안 아무 생각 없이 듣는 밤 라디오","새벽 주파수","12%"],
];
const saved=[
  ["👁","새벽 2시에 시작한 공포게임이 이상하다","404 플레이룸"],
  ["✎","이 장면 하나 그리는데 6시간 걸렸습니다","모노 드로잉"],
  ["D","오늘 꼭 알아야 할 테크 소식 7가지","D Tech"],
];
export default function LibraryPage(){
 const [tab,setTab]=useState("이어보기"); const [watchLater,setWatchLater]=useState(saved);
 return <main className="pf-shell"><div className="pf-wrap"><header className="pf-head"><div><span className="pf-kicker">MY SIGNAL ARCHIVE</span><h1 className="pf-title">내 보관함</h1><p className="pf-sub">수신 기록, 이어보기, 나중에 보기, 재생목록을 한 곳에 모았습니다.</p></div><div className="pf-actions"><a className="pf-btn" href="/account">내 계정</a><a className="pf-btn" href="/">홈</a></div></header>
 <div className="pf-tabs">{["이어보기","수신 기록","나중에 보기","재생목록"].map(x=><button className={`pf-tab ${tab===x?"active":""}`} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div>
 {tab==="이어보기"&&<div className="pf-grid">{recent.map((x,i)=><article className="pf-card pf-span4" key={x[1]}><div className="pf-thumb" style={{height:140,fontSize:46}}>{x[0]}</div><h3 style={{marginTop:12}}>{x[1]}</h3><p>{x[2]}</p><div className="pf-progress"><span style={{width:x[3]}}/></div><div className="pf-between" style={{marginTop:10}}><small>{x[3]} 시청</small><a className="pf-btn" href={`/watch/${i+1}`}>계속 보기</a></div></article>)}</div>}
 {tab==="수신 기록"&&<section className="pf-card"><div className="pf-between"><h2>최근 수신 기록</h2><button className="pf-btn danger">기록 전체 삭제</button></div><div className="pf-list" style={{marginTop:12}}>{[...recent,...saved].map((x,i)=><div className="pf-item" key={i}><div className="pf-thumb">{x[0]}</div><div><b>{x[1]}</b><small>{x[2]} · {i+1}시간 전</small></div><button className="pf-btn">기록 삭제</button></div>)}</div></section>}
 {tab==="나중에 보기"&&<section className="pf-card"><div className="pf-between"><div><h2>신호 보관함</h2><p>나중에 볼 영상 {watchLater.length}개</p></div><button className="pf-btn primary">전체 재생</button></div><div className="pf-list">{watchLater.map((x,i)=><div className="pf-item" key={x[1]}><div className="pf-thumb">{x[0]}</div><div><b>{x[1]}</b><small>{x[2]}</small></div><button className="pf-btn" onClick={()=>setWatchLater(v=>v.filter((_,n)=>n!==i))}>빼기</button></div>)}</div></section>}
 {tab==="재생목록"&&<div className="pf-grid">{[["야구 폭발 모음","12개","⚾"],["코딩 저장소","27개","⌨"],["새벽 감성","18개","♫"]].map(x=><article className="pf-card pf-span4" key={x[0]}><div className="pf-thumb" style={{height:130,fontSize:42}}>{x[2]}</div><h2 style={{marginTop:12}}>{x[0]}</h2><p>{x[1]} 영상 · 비공개</p><button className="pf-btn">재생목록 열기</button></article>)}</div>}
 </div></main>
}
