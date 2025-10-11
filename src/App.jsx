import React, {useEffect, useState} from "react";
import WeekCard from "./WeekCard";
import WeekRow from "./WeekRow";
import {makeDefault, clamp, score, overallAverage, bestStreak} from "./utils";
import SettingsModal from "./SettingsModal";
import Toast from "./Toast";
import Card from "./components/ui/Card";
import Button from "./components/ui/Button";
import UITost from "./components/ui/Toast";

const STORAGE_KEY = "twelve_week_tracker_v1";
const SETTINGS_KEY = "twelve_week_tracker_settings_v1";

export default function App() {
  const savedSettings = (() => {
    try {
      const r = localStorage.getItem(SETTINGS_KEY);
      return r ? JSON.parse(r) : null;
    } catch (e) {
      return null;
    }
  })();
  const [seasonGoals, setSeasonGoals] = useState(
    savedSettings?.seasonGoals || ["本季目標：提升專案交付穩定度"]
  );
  const [showSettings, setShowSettings] = useState(false);
  const [toast, setToast] = useState({show: false, msg: ""});
  const [weeks, setWeeks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return makeDefault();
      const data = JSON.parse(raw);
      if (!Array.isArray(data) || data.length !== 12) return makeDefault();
      return data.map((w, i) => ({
        week: i + 1,
        workout: clamp(parseInt(w.workout) || 0, 0, 3),
        photo: !!w.photo,
        reading: !!w.reading,
        resume: !!w.resume,
      }));
    } catch (e) {
      return makeDefault();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weeks));
  }, [weeks]);

  useEffect(() => {
    if (toast.show) {
      const t = setTimeout(() => setToast({show: false, msg: ""}), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({seasonGoals}));
    } catch (e) {}
  }, [seasonGoals]);

  const updateWeek = (idx, patch) => {
    setWeeks((prev) => {
      const next = prev.map((w, i) => (i === idx ? {...w, ...patch} : w));
      return next;
    });
  };

  // import/export features removed per request

  const resetAll = () => {
    if (window.confirm("確定要清空全部資料嗎？此動作無法復原")) {
      localStorage.removeItem(STORAGE_KEY);
      setWeeks(makeDefault());
      setToast({show: true, msg: "已清空資料"});
    }
  };

  const overall = overallAverage(weeks);
  const best = bestStreak(weeks);

  return (
    <div className="min-h-screen bg-gradient-to-br from-shadcn-bg to-shadcn-secondary/30">
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Enhanced Header */}
        <header className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-shadcn-foreground tracking-tight">
                12 週計畫追蹤器
              </h1>
              <div className="space-y-1">
                {seasonGoals && seasonGoals.length > 0 ? (
                  seasonGoals.map((g, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1 h-4 bg-shadcn-primary rounded-full"></div>
                      <p className="text-shadcn-muted font-medium">{g}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-shadcn-muted italic">尚未設定本季目標</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setShowSettings(true)}
                className="shadow-sm"
              >
                <span className="mr-2">⚙️</span>
                設定目標
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={resetAll}
                className="shadow-sm hover:bg-shadcn-destructive/10 hover:border-shadcn-destructive hover:text-shadcn-destructive"
              >
                <span className="mr-2">🗑️</span>
                清空全部
              </Button>
            </div>
          </div>
        </header>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 shadow-lg border-0 bg-gradient-to-r from-shadcn-card to-shadcn-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-shadcn-muted uppercase tracking-wide">
                  本期平均
                </p>
                <p className="text-4xl font-bold text-shadcn-foreground mt-1">
                  {overall}%
                </p>
              </div>
              <div className="w-12 h-12 bg-shadcn-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-lg border-0 bg-gradient-to-r from-shadcn-card to-shadcn-success/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-shadcn-muted uppercase tracking-wide">
                  最長連續達標
                </p>
                <p className="text-4xl font-bold text-shadcn-foreground mt-1">
                  {best} 週
                </p>
              </div>
              <div className="w-12 h-12 bg-shadcn-success/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Table */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-shadcn-primary/5 to-shadcn-secondary/20 border-b">
            <h2 className="text-xl font-semibold text-shadcn-foreground">
              週進度追蹤
            </h2>
            <p className="text-sm text-shadcn-muted mt-1">
              追蹤你的 12 週計畫執行狀況
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed">
              <colgroup>
                <col style={{width: "160px"}} />
                <col style={{width: "180px"}} />
                <col style={{width: "80px"}} />
                <col style={{width: "80px"}} />
                <col style={{width: "80px"}} />
                <col />
              </colgroup>
              <thead className="bg-shadcn-secondary/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-shadcn-muted uppercase tracking-wider">
                    週次
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-shadcn-muted uppercase tracking-wider">
                    運動
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-shadcn-muted uppercase tracking-wider">
                    攝影
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-shadcn-muted uppercase tracking-wider">
                    閱讀
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-shadcn-muted uppercase tracking-wider">
                    履歷
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-shadcn-muted uppercase tracking-wider">
                    進度
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-shadcn-border">
                {weeks.map((w, idx) => (
                  <WeekRow
                    key={w.week}
                    data={w}
                    idx={idx}
                    onChange={(patch) => updateWeek(idx, patch)}
                    score={score(w)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <SettingsModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
        seasonGoals={seasonGoals}
        setSeasonGoals={setSeasonGoals}
      />
      <UITost show={toast.show} msg={toast.msg} />
    </div>
  );
}
