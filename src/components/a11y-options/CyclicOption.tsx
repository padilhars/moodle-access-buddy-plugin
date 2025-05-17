
import React from "react";

interface CyclicOptionProps {
  icon: React.ReactNode;
  title: string;
  currentState: string;
  active: boolean;
  totalStates: number;
  activeState: number;
  onClick: () => void;
}

const CyclicOption = ({
  icon,
  title,
  currentState,
  active,
  totalStates,
  activeState,
  onClick,
}: CyclicOptionProps) => {
  // Create an array of indicators
  const indicators = Array.from({ length: totalStates - 1 }, (_, i) => i + 1);

  return (
    <button
      className={`a11y-option-item ${active ? "active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <div className="a11y-option-icon">{icon}</div>
      <div className="a11y-option-label">{title}</div>
      <div className="a11y-option-state">{currentState}</div>
      
      <div className="a11y-indicators">
        {indicators.map((i) => (
          <span 
            key={i}
            className={`a11y-indicator ${activeState >= i ? "active" : ""}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </button>
  );
};

export default CyclicOption;
