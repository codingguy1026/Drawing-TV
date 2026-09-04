"use client";

import { useMemo, useState } from "react";

export default function UploadPage(){
  const [file,setFile]=useState<string|null>(null);
  const [title,setTitle]=useState("");
  const [visibility,setVisibility]=useState("전체 공개");
  const [rating,setRating]=useState("전체 이용가");
  const [progress,setProgress]=useState(0);
  const [published,setPublished]=useState(false);
  const status=useMemo(()=>progress===0?"업로드 대기":progress<45?"업로드 중":progress<85?"인코딩 중":progress<100?"HD 처리 중":"게시 준비 완료",[progress]);
  const start=()=>{setProgress(18);window.setTimeout(()=>setProgress(52),250);window.setTimeout(()=>setProgress(86),500);window.setTimeout(()=>setProgress(100),750)};
  return <main className="pf-shell"><div className="pf-wrap">
    <header className="pf-head"><div><span className="pf-kicker">DTV CREATOR · UPLOAD</span><h1 className="pf-title">새 방송 올리기</h1><p className="pf-sub">영상 파일부터 썸네일, 설명, 태그, 공개 범위, 연령 등급, 인코딩 상태까지 한 번에 관리합니다.</p></div><div className="pf-actions"><a className="pf-btn" href="/studio">스튜디오</a><a className="pf-btn" href="/">홈</a></div></header>
    <div className="pf-grid">
      <section className="pf-card pf-span7"><div className="pf-drop"><div><b>{file?"🎬 "+file:"영상 파일을 선택하세요"}</b><p>MP4 · MOV · WebM · 최대 4K 데모</p><button className="pf-btn primary" onClick={()=>setFile("dtv-signal-final.mp4")}>{file?"파일 바꾸기":"파일 선택"}</button></div></div><div className="pf-divider"/>
        <div className="pf-formgrid"><div className="pf-field"><label>제목</label><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="시청자가 바로 이해할 제목"/></div><div className="pf-field"><label>태그</label><input placeholder="#야구 #게임 #DTV"/></div></div>
        <div className="pf-field" style={{marginTop:12}}><label>설명</label><textarea placeholder="영상 설명, 챕터, 링크 등을 적으세요."/></div>
        <div className="pf-formgrid" style={{marginTop:12}}><div className="pf-field"><label>공개 범위</label><select value={visibility} onChange={e=>setVisibility(e.target.value)}><option>전체 공개</option><option>링크 공개</option><option>비공개</option><option>예약 공개</option></select></div><div className="pf-field"><label>콘텐츠 등급</label><select value={rating} onChange={e=>setRating(e.target.value)}><option>전체 이용가</option><option>12세 이상</option><option>15세 이상</option><option>성인 전용</option></select></div></div>
        <div className="pf-divider"/><div className="pf-between"><div><h3>썸네일</h3><p>자동 생성 3장 중 선택하거나 직접 업로드</p></div><div className="pf-row"><span className="pf-badge">AUTO 01</span><span className="pf-badge">AUTO 02</span><button className="pf-btn">직접 업로드</button></div></div>
      </section>
      <aside className="pf-card pf-span5"><div className="pf-between"><div><span className="pf-kicker">PROCESSING</span><h2>{status}</h2></div><span className={`pf-status ${progress===100?"good":"wait"}`}>{progress}%</span></div><p>{file?file:"아직 파일이 없습니다."}</p><div className="pf-progress"><span style={{width:`${progress}%`}}/></div><div className="pf-stack" style={{marginTop:16}}><div className="pf-between"><span>원본 업로드</span><b>{progress>=45?"완료":"대기"}</b></div><div className="pf-between"><span>1080p 인코딩</span><b>{progress>=85?"완료":progress>=45?"진행 중":"대기"}</b></div><div className="pf-between"><span>4K / HD 처리</span><b>{progress===100?"완료":progress>=85?"진행 중":"대기"}</b></div><div className="pf-between"><span>자동 자막 분석</span><b>{progress===100?"초안 생성":"대기"}</b></div></div><div className="pf-divider"/><p className="pf-note">연령 등급: <b>{rating}</b><br/>공개 상태: <b>{visibility}</b></p><button className="pf-btn primary" style={{width:"100%",marginTop:12}} disabled={!file} onClick={start}>업로드 · 인코딩 시작</button><button className="pf-btn red" style={{width:"100%",marginTop:8}} disabled={progress<100} onClick={()=>setPublished(true)}>{published?"게시 완료 ✓":"게시하기"}</button></aside>
    </div>
  </div></main>
}
