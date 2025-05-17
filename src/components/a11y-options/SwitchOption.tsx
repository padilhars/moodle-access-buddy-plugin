
import React from "react";
import { Switch } from "@/components/ui/switch";

interface SwitchOptionProps {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SwitchOption = ({ icon, label, checked, onChange }: SwitchOptionProps) => {
  return (
    <div className="a11y-switch-container">
      <div className="a11y-switch-label">
        <span className="a11y-option-icon">{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
};

export default SwitchOption;
