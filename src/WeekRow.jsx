import React from "react";
import Input from "./components/ui/Input";
import Checkbox from "./components/ui/Checkbox";
import Badge from "./components/ui/Badge";
import Progress from "./components/ui/Progress";
import Button from "./components/ui/Button";
import {clamp} from "./utils";

export default function WeekRow({data, idx, onChange, score}) {
  const variant = score >= 80 ? "ok" : score >= 50 ? "warn" : "bad";
  const isEven = idx % 2 === 0;

  return (
    <tr
      className={`transition-colors hover:bg-shadcn-secondary/30 ${
        isEven ? "bg-shadcn-secondary/10" : ""
      }`}
    >
      <td className="px-4 py-5">
        <div className="flex items-center whitespace-nowrap">
          <div className="w-10 h-10 rounded-full bg-shadcn-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-sm font-semibold text-shadcn-primary">
              {data.week}
            </span>
          </div>
          <span className="text-base font-medium text-shadcn-foreground">
            第 {data.week} 週
          </span>
        </div>
      </td>

      <td className="px-4 py-5">
        <div className="flex items-center gap-3 bg-shadcn-secondary/50 rounded-lg p-3 max-w-[220px]">
          <Button
            size="md"
            variant="ghost"
            className="h-9 w-9 p-0 hover:bg-shadcn-primary/20 text-lg"
            onClick={() => onChange({workout: clamp(data.workout - 1, 0, 3)})}
          >
            -
          </Button>
          <div className="px-4 py-1 bg-white/80 rounded text-center font-semibold text-shadcn-foreground min-w-[40px] text-lg">
            {data.workout}
          </div>
          <Button
            size="md"
            variant="ghost"
            className="h-9 w-9 p-0 hover:bg-shadcn-primary/20 text-lg"
            onClick={() => onChange({workout: clamp(data.workout + 1, 0, 3)})}
          >
            +
          </Button>
        </div>
      </td>

      <td className="px-4 py-5 text-center">
        <div className="flex justify-center">
          <Checkbox
            checked={data.photo}
            onChange={(e) => onChange({photo: e.target.checked})}
            className="scale-110"
          />
        </div>
      </td>

      <td className="px-4 py-5 text-center">
        <div className="flex justify-center">
          <Checkbox
            checked={!!data.reading}
            onChange={(e) => onChange({reading: e.target.checked})}
            className="scale-110"
          />
        </div>
      </td>

      <td className="px-4 py-5 text-center">
        <div className="flex justify-center">
          <Checkbox
            checked={!!data.resume}
            onChange={(e) => onChange({resume: e.target.checked})}
            className="scale-110"
          />
        </div>
      </td>

      <td className="px-4 py-5">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <Badge variant={variant} className="font-semibold shadow-sm">
              {score}%
            </Badge>
          </div>
          <div className="flex-1 max-w-[160px]">
            <Progress value={score} className="h-2.5" />
          </div>
        </div>
      </td>
    </tr>
  );
}
