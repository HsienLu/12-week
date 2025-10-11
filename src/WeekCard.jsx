import React from "react";
import {clamp} from "./utils";
import Card from "./components/ui/Card";
import Badge from "./components/ui/Badge";
import Input from "./components/ui/Input";
import Checkbox from "./components/ui/Checkbox";
import Progress from "./components/ui/Progress";

const badgeState = (s) =>
  s >= 80
    ? ["On Track", "--ok"]
    : s >= 50
    ? ["At Risk", "--warn"]
    : ["Off Track", "--bad"];

export default function WeekCard({data, idx, onChange, score}) {
  const [label, cls] = badgeState(score);
  const variant = score >= 80 ? "ok" : score >= 50 ? "warn" : "bad";
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">第 {data.week} 週</h3>
        <Badge variant={variant}>
          {label} · {score}%
        </Badge>
      </div>

      <div>
        <label className="block text-sm">運動次數 (0-3)</label>
        <Input
          aria-label={`week-${data.week}-workout`}
          type="number"
          min="0"
          max="3"
          value={data.workout}
          onChange={(e) =>
            onChange({workout: clamp(parseInt(e.target.value) || 0, 0, 3)})
          }
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          攝影發文{" "}
          <Checkbox
            checked={data.photo}
            onChange={(e) => onChange({photo: e.target.checked})}
          />
        </label>
        <label className="flex items-center gap-2">
          閱讀（完成章節）{" "}
          <Checkbox
            checked={!!data.reading}
            onChange={(e) => onChange({reading: e.target.checked})}
          />
        </label>
        <label className="flex items-center gap-2">
          履歷（完成章節）{" "}
          <Checkbox
            checked={!!data.resume}
            onChange={(e) => onChange({resume: e.target.checked})}
          />
        </label>
      </div>

      <Progress value={score} />
    </Card>
  );
}
