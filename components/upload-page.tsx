import { CheckCircle2, CloudUpload, ImageIcon, Tag, Video, Wand2 } from "lucide-react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import MobileNavigation from "@/components/mobile-navigation";

const steps = [
  "영상 선택",
  "업로드",
  "세부 정보",
  "썸네일",
  "공개 범위",
  "게시",
];

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <div className="mx-auto flex max-w-[1600px] gap-6 px-3 pb-24 pt-4 sm:px-4 lg:px-6">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-6">
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                <CloudUpload className="h-4 w-4" />
              </div>
              <h1 className="text-xl font-bold text-[var(--foreground)]">업로드</h1>
            </div>
          </div>

          <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <h2 className="text-lg font-bold text-[var(--foreground)]">업로드 단계</h2>
              </div>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] p-3">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${index === 0 ? "bg-[var(--accent)] text-white" : "bg-[var(--hover)] text-[var(--muted)]"}`}>
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-[var(--foreground)]">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
              <div className="rounded-[24px] border border-dashed border-[var(--border)] bg-[var(--panel-strong)] p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Video className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-lg font-bold text-[var(--foreground)]">영상 파일 선택</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">MP4, MOV, WEBM 형식을 업로드할 수 있어요.</p>
                <button className="mt-4 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">
                  파일 선택
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">제목</label>
                  <input className="w-full rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30" defaultValue="학생이 만든 게임 프로젝트 공개" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">설명</label>
                  <textarea rows={4} className="w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30" defaultValue="주말에 만든 게임을 공개합니다. 개발 과정, 문제 해결, 그리고 완성까지의 이야기입니다." />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">카테고리</label>
                    <select className="w-full rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30">
                      <option>게임</option>
                      <option>테크</option>
                      <option>음악</option>
                      <option>일상</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">공개 범위</label>
                    <select className="w-full rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-2.5 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30">
                      <option>공개</option>
                      <option>비공개</option>
                      <option>미리보기</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['#게임', '#학생개발자', '#프로젝트', '#코딩'].map((tag) => (
                    <button key={tag} className="rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1.5 text-xs font-medium text-[var(--muted)]">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white">
                  게시하기
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
