export type Category = {
  id: string;
  label: string;
};

export type VideoItem = {
  id: string;
  title: string;
  creator: string;
  creatorHandle: string;
  views: string;
  published: string;
  duration: string;
  category: string;
  accent: string;
  avatar: string;
  avatarColor: string;
  badge?: "LIVE" | "PREMIERE" | "NEW";
  progress?: number;
  isWatched?: boolean;
};

export type ShortsItem = {
  id: string;
  title: string;
  creator: string;
  creatorHandle: string;
  views: string;
  accent: string;
};

export type Creator = {
  id: string;
  name: string;
  handle: string;
  subscribers: string;
  accent: string;
};

export const categories: Category[] = [
  { id: "all", label: "전체" },
  { id: "game", label: "게임" },
  { id: "music", label: "음악" },
  { id: "sports", label: "스포츠" },
  { id: "live", label: "라이브" },
  { id: "anime", label: "애니" },
  { id: "meme", label: "밈" },
  { id: "tech", label: "테크" },
  { id: "news", label: "뉴스" },
  { id: "daily", label: "일상" },
  { id: "study", label: "공부" },
  { id: "cooking", label: "요리" },
];

export const featuredVideos: VideoItem[] = [
  {
    id: "v1",
    title: "학생이 주말에 게임 하나 만들어봤습니다",
    creator: "스튜디오 루미",
    creatorHandle: "@lumi-studio",
    views: "42만",
    published: "3일 전",
    duration: "12:48",
    category: "게임",
    accent: "linear-gradient(135deg, #f59e0b 0%, #ef4444 52%, #7c3aed 100%)",
    avatar: "L",
    avatarColor: "from-amber-400 to-orange-500",
    badge: "NEW",
  },
  {
    id: "v2",
    title: "9회말 2아웃에서 진짜 이게 된다고?",
    creator: "야구감성",
    creatorHandle: "@baseballvibe",
    views: "18만",
    published: "5시간 전",
    duration: "08:31",
    category: "스포츠",
    accent: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 48%, #38bdf8 100%)",
    avatar: "Y",
    avatarColor: "from-sky-400 to-blue-600",
    badge: "LIVE",
  },
  {
    id: "v3",
    title: "요즘 다들 이 노래 듣는 이유",
    creator: "비트버킷",
    creatorHandle: "@beatbucket",
    views: "76만",
    published: "1일 전",
    duration: "06:12",
    category: "음악",
    accent: "linear-gradient(135deg, #7c3aed 0%, #ec4899 52%, #f97316 100%)",
    avatar: "B",
    avatarColor: "from-violet-400 to-fuchsia-500",
  },
  {
    id: "v4",
    title: "100만원짜리 키보드는 진짜 다를까?",
    creator: "키보드 로그",
    creatorHandle: "@keylog",
    views: "29만",
    published: "2주 전",
    duration: "15:02",
    category: "테크",
    accent: "linear-gradient(135deg, #111827 0%, #0f766e 50%, #34d399 100%)",
    avatar: "K",
    avatarColor: "from-teal-400 to-emerald-500",
  },
  {
    id: "v5",
    title: "오늘의 밈은 이거다, 진짜 웃긴 영상 드립",
    creator: "모션미친",
    creatorHandle: "@motionmad",
    views: "51만",
    published: "6시간 전",
    duration: "04:48",
    category: "밈",
    accent: "linear-gradient(135deg, #f97316 0%, #fb7185 50%, #a855f7 100%)",
    avatar: "M",
    avatarColor: "from-orange-400 to-pink-500",
  },
  {
    id: "v6",
    title: "코딩 초보자들이 자주 하는 실수 7가지",
    creator: "코드플로우",
    creatorHandle: "@codeflow",
    views: "13만",
    published: "1주 전",
    duration: "11:24",
    category: "공부",
    accent: "linear-gradient(135deg, #0f172a 0%, #2563eb 40%, #67e8f9 100%)",
    avatar: "C",
    avatarColor: "from-cyan-400 to-blue-600",
  },
];

export const continueWatching: VideoItem[] = [
  {
    id: "cw1",
    title: "하루 1시간으로 포트폴리오 준비하는 법",
    creator: "디자인 입문",
    creatorHandle: "@designintro",
    views: "11만",
    published: "12분 전",
    duration: "18:10",
    category: "공부",
    accent: "linear-gradient(135deg, #0f172a 0%, #111827 38%, #475569 100%)",
    avatar: "D",
    avatarColor: "from-slate-400 to-slate-600",
    progress: 64,
    isWatched: true,
  },
  {
    id: "cw2",
    title: "내가 직접 만든 게임 전투씬 공개",
    creator: "플래닛스튜디오",
    creatorHandle: "@planetstudio",
    views: "9만",
    published: "2일 전",
    duration: "09:44",
    category: "게임",
    accent: "linear-gradient(135deg, #b91c1c 0%, #f97316 30%, #fde68a 100%)",
    avatar: "P",
    avatarColor: "from-rose-400 to-orange-500",
    progress: 41,
    isWatched: true,
  },
];

export const shorts: ShortsItem[] = [
  { id: "s1", title: "스쿼트 30초로 체지방 감량 루틴", creator: "핏플래닛", creatorHandle: "@fitplanet", views: "124만", accent: "linear-gradient(135deg, #16a34a 0%, #84cc16 40%, #facc15 100%)" },
  { id: "s2", title: "게임 중간에 이 장면 만들면 진짜 재밌다", creator: "레벨업에이전시", creatorHandle: "@levelupagency", views: "89만", accent: "linear-gradient(135deg, #7c3aed 0%, #2563eb 55%, #22d3ee 100%)" },
  { id: "s3", title: "멋있는 식당 리뷰 15초 컷", creator: "먹거리 탐정", creatorHandle: "@guiltyeats", views: "66만", accent: "linear-gradient(135deg, #f59e0b 0%, #ef4444 55%, #7f1d1d 100%)" },
  { id: "s4", title: "다음 시즌에 꼭 나와야 하는 애니 예고", creator: "애니월드", creatorHandle: "@aniworld", views: "310만", accent: "linear-gradient(135deg, #22c55e 0%, #14b8a6 40%, #3b82f6 100%)" },
];

export const trendingList = [
  "다른 사람은 왜 저걸 다들 좋아하나",
  "스포츠 하이라이트",
  "이번 주 인기 게임",
  "학생이 만든 랜덤 뽑기 앱",
  "최신 음악 추천",
  "게임 방송 밈 모음",
];

export const creators: Creator[] = [
  { id: "c1", name: "마리오 러브", handle: "@mario.love", subscribers: "21만", accent: "from-violet-500 to-indigo-500" },
  { id: "c2", name: "하이브리드 게임", handle: "@hybridgame", subscribers: "15만", accent: "from-cyan-500 to-blue-500" },
  { id: "c3", name: "서브웨이 스튜디오", handle: "@subwaystudio", subscribers: "8.2만", accent: "from-amber-500 to-orange-500" },
  { id: "c4", name: "소닉 아카데미", handle: "@sonicacademy", subscribers: "6.9만", accent: "from-pink-500 to-red-500" },
];

export const watchDetail = {
  id: "v1",
  title: "학생이 주말에 게임 하나 만들어봤습니다",
  creator: "스튜디오 루미",
  subscribers: "12.4만",
  duration: "12:48",
  accent: "linear-gradient(135deg, #f59e0b 0%, #ef4444 52%, #7c3aed 100%)",
  avatar: "L",
  avatarColor: "from-amber-400 to-orange-500",
};

export const recommendedVideos = [
  {
    id: "rv1",
    title: "게임 엔진 없이도 이런 퀄리티가 가능할까?",
    creator: "레벨업캠프",
    views: "26만",
    published: "1주 전",
    duration: "09:52",
    accent: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #67e8f9 100%)",
  },
  {
    id: "rv2",
    title: "새로 나온 키보드가 진짜 가성비로 괜찮은 이유",
    creator: "입출력 스튜디오",
    views: "15만",
    published: "2일 전",
    duration: "08:14",
    accent: "linear-gradient(135deg, #0f766e 0%, #22c55e 55%, #bbf7d0 100%)",
  },
  {
    id: "rv3",
    title: "학생이 만든 포트폴리오 사이트를 공개합니다",
    creator: "디자인 버스",
    views: "9만",
    published: "3시간 전",
    duration: "11:24",
    accent: "linear-gradient(135deg, #9d174d 0%, #ec4899 50%, #f9a8d4 100%)",
  },
  {
    id: "rv4",
    title: "요즘 다들 이 노래 듣는 이유, 앨범 리뷰",
    creator: "비트버킷",
    views: "67만",
    published: "4일 전",
    duration: "06:40",
    accent: "linear-gradient(135deg, #4c1d95 0%, #8b5cf6 50%, #f9a8d4 100%)",
  },
];

export const comments = [
  {
    id: "c-1",
    author: "민서",
    handle: "@minseo222",
    time: "2일 전",
    text: "스튜디오 루미가 만든 건 진짜 감각이 좋네요. 무지성 광고보다 만들고 싶다는 감정이 잘 전달돼요.",
    likes: 284,
    replies: [
      {
        id: "c-1-r1",
        author: "나래",
        handle: "@narae",
        time: "1일 전",
        text: "저도 주말에 비슷하게 뭔가 만들어보고 싶다는 생각이 들었어요.",
        likes: 22,
      },
    ],
  },
  {
    id: "c-2",
    author: "코더킴",
    handle: "@coder_kim",
    time: "1일 전",
    text: "이런 게 진짜 학생 개발자 포트폴리오의 힘이죠. 단순히 결과물만 보여주는 게 아니라 과정까지 보여주니까 더 와닿아요.",
    likes: 89,
  },
  {
    id: "c-3",
    author: "게임짱",
    handle: "@gameboss",
    time: "5시간 전",
    text: "첫 대사부터 잡는 방식이 너무 좋았어요. 시청하면서 직접 만들고 싶다는 마음이 생김.",
    likes: 132,
  },
];
