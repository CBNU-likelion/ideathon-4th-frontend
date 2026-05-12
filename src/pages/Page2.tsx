import { useEffect, useRef, useState } from "react";

const stats = [
  { type: "target", title: "지난주 학습 현황", score: "6.8/10", desc: "지난주 보다 하락했어요", percent: "12.8%", trend: "down", color: "blue" },
  { type: "users", title: "경쟁자 분석", score: "6.3/10", desc: "지난주 보다 상승했어요", percent: "7.9%", trend: "up", color: "orange" },
  { type: "award", title: "성공 평점", score: "7.8/10", desc: "AI를 통한 객관적인 총점이에요", percent: "", trend: "", color: "green" },
];

const rows = [
  ["다년간의 경험", "3.5/10", "6.2/10", "8.2/10", "down", "19.7%", "많은 관심이\n필요해요"],
  ["교육수준", "7/10", "7.1/10", "8.8/10", "up", "7.9%", "좋아요"],
  ["대외활동", "8.5/10", "5.8/10", "7.8/10", "down", "14.7%", "많은 관심이\n필요해요"],
  ["커뮤니케이션", "6.5/10", "7.4/10", "2.8/10", "down", "20.7%", "많은 관심이\n필요해요"],
  ["도메인 지식", "7.5/10", "4.9/10", "5.8/10", "down", "9.7%", "조금\n신경써주세요"],
];

type StatItem = (typeof stats)[number];

function TrendArrow({ trend, size = 18 }: { trend: string; size?: number }) {
  const color = trend === "up" ? "#05B547" : "#FF2A2A";

  if (trend === "up") {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <path d="M2 14L7 9L10 12L17 5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5H17V10" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M2 6L7 11L10 8L17 15" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15H17V10" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatIcon({ type, color }: { type: string; color: string }) {
  const iconColor = color === "blue" ? "#2563ff" : color === "orange" ? "#ff5b16" : "#05ad4f";

  if (type === "target") {
    return (
      <svg width="26" height="26" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="14" stroke={iconColor} strokeWidth="3" />
        <circle cx="17" cy="17" r="8" stroke={iconColor} strokeWidth="3" />
        <circle cx="17" cy="17" r="2.5" fill={iconColor} />
      </svg>
    );
  }

  if (type === "users") {
    return (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <circle cx="16" cy="11" r="5" stroke={iconColor} strokeWidth="2.8" />
        <path d="M7 28V25C7 20.8 10.4 18 16 18C21.6 18 25 20.8 25 25V28" stroke={iconColor} strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="25" cy="13" r="4" stroke={iconColor} strokeWidth="2.8" />
        <path d="M27 20C30.2 20.7 32 23 32 26V28" stroke={iconColor} strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width="27" height="27" viewBox="0 0 34 34" fill="none">
      <circle cx="17" cy="11" r="8" stroke={iconColor} strokeWidth="2.8" />
      <path d="M12 18L10 31L17 27L24 31L22 18" stroke={iconColor} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatCard({ item }: { item: StatItem }) {
  const bg =
    item.color === "blue"
      ? "bg-blue-100"
      : item.color === "orange"
        ? "bg-orange-100"
        : "bg-green-100";

  return (
    <div className="mx-auto w-[340px] rounded-[10px] border border-gray-200 bg-white px-[26px] py-[22px] shadow-[0_2px_6px_rgba(0,0,0,0.16)]">
      <div className="flex items-start gap-[16px]">
        <div className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full ${bg}`}>
          <StatIcon type={item.type} color={item.color} />
        </div>

        <div className="flex flex-col items-start text-left">
          <p className="text-[15px] font-medium leading-none text-[#4b5563]">{item.title}</p>
          <p className="mt-[8px] text-[17px] font-extrabold leading-none text-black">{item.score}</p>
        </div>
      </div>

      <div className="flex items-end gap-17">
        <p className="text-[15px] font-medium text-[#4b5563]">{item.desc}</p>

        {item.percent && (
          <div className={`flex items-center gap-[1px] ${item.trend === "up" ? "text-[#05B547]" : "text-[#FF2A2A]"}`}>
            <TrendArrow trend={item.trend} />
            <span className="text-[13px] font-bold">{item.percent}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function RadarChart() {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [showYellow, setShowYellow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowYellow(true);
        }
      },
      { threshold: 0.45 }
    );

    if (chartRef.current) observer.observe(chartRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={chartRef} className="mt-4">
      <div className="mb-2 flex items-center gap-2 pl-0 text-[11px] font-medium text-black">
        <span className="h-[14px] w-[14px] rounded-full bg-[#edf08f]" />
        합격자 분포도
      </div>

      <svg viewBox="0 0 390 315" className="mx-auto block h-[315px] w-full">
        <g transform="translate(195 160)">
          <polygon points="0,-104 90,-52 90,52 0,104 -90,52 -90,-52" fill="none" stroke="#d6d6d6" strokeWidth="1.5" />
          <polygon points="0,-69 60,-34.5 60,34.5 0,69 -60,34.5 -60,-34.5" fill="none" stroke="#d6d6d6" strokeWidth="1.2" />
          <polygon points="0,-34.5 30,-17.2 30,17.2 0,34.5 -30,17.2 -30,-17.2" fill="none" stroke="#d6d6d6" strokeWidth="1.2" />

          <line x1="0" y1="0" x2="0" y2="-104" stroke="#d6d6d6" strokeWidth="1.2" />
          <line x1="0" y1="0" x2="90" y2="-52" stroke="#d6d6d6" strokeWidth="1.2" />
          <line x1="0" y1="0" x2="90" y2="52" stroke="#d6d6d6" strokeWidth="1.2" />
          <line x1="0" y1="0" x2="0" y2="104" stroke="#d6d6d6" strokeWidth="1.2" />
          <line x1="0" y1="0" x2="-90" y2="52" stroke="#d6d6d6" strokeWidth="1.2" />
          <line x1="0" y1="0" x2="-90" y2="-52" stroke="#d6d6d6" strokeWidth="1.2" />

          <text x="6" y="-98" fontSize="11" fill="#c6c6c6">10</text>
          <text x="6" y="-63" fontSize="11" fill="#c6c6c6">6</text>
          <text x="6" y="-28" fontSize="11" fill="#c6c6c6">3</text>
          <text x="6" y="5" fontSize="11" fill="#c6c6c6">0</text>

          <polygon
            points="0,-35 75,-43 76,44 0,35 -75,44 -75,-43"
            fill="#d9f8e680"
            stroke="#22c55e"
            strokeWidth="1.2"
          />

          <polygon
            points="0,-52 76,-44 59,34 0,72 -60,-34 -28,-17"
            fill="#f2ef9daa"
            stroke="#2f2f2f"
            strokeWidth="1"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              transform: showYellow ? "scale(1)" : "scale(0)",
              opacity: showYellow ? 1 : 0,
             transition: "transform 1800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1200ms ease",
            }}
          />

          <text x="0" y="-126" textAnchor="middle" fontSize="14" fill="#8f96a3">다년간의 경험</text>
          <text x="133" y="-50" textAnchor="middle" fontSize="14" fill="#8f96a3">교육 수준</text>
          <text x="137" y="59" textAnchor="middle" fontSize="14" fill="#8f96a3">대외활동</text>
          <text x="0" y="132" textAnchor="middle" fontSize="14" fill="#8f96a3">리더십</text>
          <text x="-137" y="59" textAnchor="middle" fontSize="14" fill="#8f96a3">커뮤니케이션</text>
          <text x="-137" y="-50" textAnchor="middle" fontSize="14" fill="#8f96a3">도메인 지식</text>
        </g>
      </svg>
    </div>
  );
}

function EvaluationBadge({ text, good }: { text: string; good: boolean }) {
  return (
    <span
      className={`inline-flex min-h-[1px] w-[61px] items-center justify-center whitespace-pre-line rounded-full px-2 py-1 text-center text-[7.5px] font-bold leading-[1.2] ${
        good ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {text}
    </span>
  );
}

function RoadmapIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <circle cx="13" cy="10" r="5.5" stroke="#1B1B1F" strokeWidth="3.8" />

      <circle cx="34" cy="35" r="5.5" stroke="#1B1B1F" strokeWidth="3.8" />

      <path
        d="M12 15.5C9 21.5 7.5 27 11 30.5C15.5 35 23.5 20 30.5 15"
        stroke="#1B1B1F"
        strokeWidth="4.2"
        strokeLinecap="round"
      />

      <path
        d="M28.5 15.5C32.5 11.5 38 11.5 39.5 15C41 18.5 37.8 22.2 33.5 25.5"
        stroke="#1B1B1F"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      {/* 말풍선 - 기존보다 살짝 더 크게 */}
      <path
        d="M7 6H39V31H18L7 40V6Z"
        stroke="#1B1B1F"
        strokeWidth="4"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 사람 머리 - 그대로 */}
      <circle cx="23" cy="17" r="5" fill="#1B1B1F" />

      {/* 사람 몸 - 그대로 */}
      <path
        d="M14 27C16.2 23.5 19.4 22 23 22C26.6 22 29.8 23.5 32 27H14Z"
        fill="#1B1B1F"
      />
    </svg>
  );
}

function RobotIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <rect
        x="12"
        y="12"
        width="24"
        height="26"
        rx="3"
        stroke="#1B1B1F"
        strokeWidth="4"
      />

      <rect x="7" y="19" width="5.5" height="14" rx="3" fill="#1B1B1F" />

      <rect x="35.5" y="19" width="5.5" height="14" rx="3" fill="#1B1B1F" />

      <rect x="19" y="4" width="12" height="9" rx="4.5" fill="#1B1B1F" />

      <circle cx="19" cy="23" r="2.8" fill="#1B1B1F" />

      <circle cx="29" cy="23" r="2.8" fill="#1B1B1F" />

      <path
        d="M19 31H29"
        stroke="#1B1B1F"
        strokeWidth="3.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      {/* 얼굴 */}
      <rect
        x="9"
        y="8"
        width="28"
        height="14"
        rx="7"
        stroke="#1B1B1F"
        strokeWidth="4.2"
      />

      {/* 눈 */}
      <circle cx="18" cy="15" r="1.8" fill="#1B1B1F" />
      <circle cx="28" cy="15" r="1.8" fill="#1B1B1F" />

      {/* 몸통 */}
      <rect
        x="9"
        y="28"
        width="28"
        height="10"
        rx="1.5"
        stroke="#1B1B1F"
        strokeWidth="4.2"
        fill="none"
      />
    </svg>
  );
}

function BottomNav() {
  const menus = [
    { icon: <RoadmapIcon />, label: "로드맵" },
    { icon: <ChatIcon />, label: "커피챗" },
    { icon: <RobotIcon />, label: "AI-분석" },
    { icon: <ProfileIcon />, label: "프로필" },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-[74px] border-t border-gray-300 bg-white">
      <div className="grid h-[55px] grid-cols-4 items-center">
        {menus.map((menu) => (
          <div
            key={menu.label}
            className="flex flex-col items-center gap-[0px] text-black"
          >
            <div className="flex h-[34px] items-center justify-center [&>svg]:h-[34px] [&>svg]:w-[34px]">
              {menu.icon}
            </div>

            <div className="text-[13px] font-extrabold leading-none tracking-[-0.5px]">
              {menu.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-[2px] h-[4px] w-[100px] rounded-full bg-black" />
    </nav>
  );
}

function Page2() {
  return (
    <div className="flex min-h-screen justify-center bg-[#eef0fa]">
      <div className="relative h-screen w-full max-w-[430px] overflow-hidden bg-white">
        <main
          className="h-screen overflow-y-auto px-4 pb-[88px] pt-[70px]"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>
            {`
              main::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          <h1 className="mb-[36px] whitespace-nowrap text-center text-[22px] font-extrabold text-[#6b7280]">
            멋사님 취준을 위해서 더 보완해야해요.
          </h1>

          <section className="space-y-[25px]">
            {stats.map((item) => (
              <StatCard key={item.title} item={item} />
            ))}
          </section>

          <section className="mx-auto mt-[14px] w-full max-w-[400px] rounded-[24px] border border-gray-200 bg-white px-5 py-4 shadow-sm">
            <h2 className="text-center text-[18px] font-extrabold text-black">합격 스펙 비교</h2>
            <RadarChart />
          </section>

          <section className="mx-auto mt-[14px] w-full max-w-[400px] rounded-[24px] border border-gray-200 bg-white px-5 py-4 shadow-sm">
            <h2 className="px-3 py-3 text-[18px] font-extrabold text-black">합격자 분석 DB</h2>

            <div className="overflow-hidden border-t border-gray-100">
              <table className="w-full table-fixed text-center text-[10px]">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="w-[24%] py-3">카테고리</th>
                    <th className="w-[13%]">총<br />점수</th>
                    <th className="w-[17%]">평균<br />합격자 평점</th>
                    <th className="w-[15%]">대외활동<br />점수</th>
                    <th className="w-[18%]">지난주 대비<br />상승/하락률</th>
                    <th className="w-[17%]">평가</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row[0]} className="border-t border-gray-100">
                      <td className="py-3 pl-2 text-left font-bold text-gray-700">{row[0]}</td>
                      <td>
                        <span className="rounded-full bg-blue-100 px-1 py-1 text-blue-600">{row[1]}</span>
                      </td>
                      <td className="text-gray-600">{row[2]}</td>
                      <td className="text-gray-600">{row[3]}</td>
                      <td>
                        <div className={`flex items-center justify-center gap-[1px] ${row[4] === "up" ? "text-[#05B547]" : "text-[#FF2A2A]"}`}>
                          <TrendArrow trend={row[4]} size={13} />
                          <span className="text-[10px] font-bold">{row[5]}</span>
                        </div>
                      </td>
                      <td>
                        <EvaluationBadge text={row[6]} good={index === 1} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

<section className="mx-auto mt-8 w-full max-w-[400px] rounded-[24px] border border-blue-200 bg-blue-50 px-5 py-4">
  <h2 className="mb-3 text-[18px] font-semibold text-blue-800">
    Key Insights
  </h2>

  <div className="space-y-3 text-[13px] font-medium leading-relaxed text-blue-700">
    <p>· 평균 경쟁자보다 7.9% 낮은 성과를 거두고 있습니다</p>

    <p>· 성공 후보 벤치마크에서 12.8% 떨어져 있습니다</p>

    <p>· 가장 개선이 필요한 분야: 아키텍처에 집중하기</p>

    <p className="whitespace-nowrap text-[11px] leading-relaxed tracking-[-0.2px]">
      · 강점 분야: 다년간의 경험, 교육 수준, 기술력, 리더십, 커뮤니케이션, 도메인
    </p>
  </div>
</section>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}

export default Page2;