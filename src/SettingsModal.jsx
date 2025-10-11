import React, {useState} from "react";
import {Dialog} from "./components/ui/Dialog";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

export default function SettingsModal({
  open,
  onClose,
  seasonGoals,
  setSeasonGoals,
}) {
  const [goals, setGoals] = useState(() =>
    seasonGoals ? [...seasonGoals] : [""]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
      trigger={null}
    >
      <div className="p-6 max-w-lg mx-auto">
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-shadcn-primary/20 to-shadcn-secondary/30 flex items-center justify-center mr-3">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-2xl font-semibold text-shadcn-foreground">
              設定目標
            </h3>
          </div>
          <p className="text-base text-shadcn-muted ml-13">
            在下方新增、編輯或刪除本季目標（支援多項）
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {goals.map((g, i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="flex-1">
                <Input
                  type="text"
                  value={g}
                  placeholder={`目標 ${i + 1}`}
                  onChange={(e) =>
                    setGoals((prev) =>
                      prev.map((p, idx) => (idx === i ? e.target.value : p))
                    )
                  }
                  className="w-full text-base"
                />
              </div>
              <Button
                variant="outline"
                size="md"
                className="px-3 text-shadcn-destructive hover:bg-shadcn-destructive/10"
                onClick={() =>
                  setGoals((prev) => prev.filter((_, idx) => idx !== i))
                }
              >
                🗑️
              </Button>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <Button
            variant="outline"
            size="md"
            className="w-full border-dashed border-2 hover:bg-shadcn-primary/5 text-base"
            onClick={() => setGoals((prev) => [...prev, ""])}
          >
            <span className="mr-2">➕</span>
            新增目標
          </Button>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-shadcn-border">
          <Button variant="outline" size="md" onClick={onClose}>
            取消
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="bg-gradient-to-r from-shadcn-primary to-shadcn-primary/80 hover:from-shadcn-primary/90 hover:to-shadcn-primary/70"
            onClick={() => {
              // save
              setSeasonGoals(goals.filter((g) => g && g.trim().length > 0));
              onClose();
            }}
          >
            <span className="mr-2">💾</span>
            儲存
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
