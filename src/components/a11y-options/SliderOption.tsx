
import React from "react";
import { Slider } from "@/components/ui/slider";

interface SliderOptionProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  valueLabel: string;
  onChange: (value: number) => void;
}

const SliderOption = ({
  label,
  min,
  max,
  step,
  value,
  valueLabel,
  onChange,
}: SliderOptionProps) => {
  return (
    <div className="a11y-slider-container">
      <div className="a11y-slider-header">
        <span className="text-sm">{label}</span>
        <span className="a11y-slider-value">{valueLabel}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        className="mt-2"
      />
    </div>
  );
};

export default SliderOption;
