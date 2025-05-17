
import { useState } from "react";
import { Accessibility } from "lucide-react";
import A11yPopover from "./A11yPopover";
import { useA11ySettings } from "../hooks/useA11ySettings";

type ButtonPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

interface A11yButtonProps {
  position?: ButtonPosition;
}

const positionClasses: Record<ButtonPosition, string> = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
};

const A11yButton = ({ position = "bottom-right" }: A11yButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = useA11ySettings();

  if (!settings.pluginEnabled) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Acessibilidade"
        className={`a11y-btn ${positionClasses[position]}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Accessibility className="w-6 h-6" />
      </button>
      {isOpen && (
        <A11yPopover position={position} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default A11yButton;
