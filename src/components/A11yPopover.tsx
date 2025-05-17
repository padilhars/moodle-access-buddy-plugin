
import { useEffect, useRef } from "react";
import { useA11ySettings } from "../hooks/useA11ySettings";
import ColorAdjustments from "./a11y-categories/ColorAdjustments";
import VisualContent from "./a11y-categories/VisualContent";
import TextAppearance from "./a11y-categories/TextAppearance";
import NavigationOptions from "./a11y-categories/NavigationOptions";
import ReadingTools from "./a11y-categories/ReadingTools";
import { X } from "lucide-react";

type PopoverPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

interface A11yPopoverProps {
  position: PopoverPosition;
  onClose: () => void;
}

const getPopoverPosition = (position: PopoverPosition): string => {
  switch (position) {
    case "bottom-right":
      return "bottom-20 right-6";
    case "bottom-left":
      return "bottom-20 left-6";
    case "top-right":
      return "top-20 right-6";
    case "top-left":
      return "top-20 left-6";
  }
};

const A11yPopover = ({ position, onClose }: A11yPopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { settings } = useA11ySettings();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div 
      ref={popoverRef}
      className={`a11y-popover fixed ${getPopoverPosition(position)} w-80 md:w-96 z-50`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium">Acessibilidade</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Fechar painel de acessibilidade"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="max-h-[70vh] overflow-y-auto">
        {settings.categories.colorAdjustments && <ColorAdjustments />}
        {settings.categories.visualContent && <VisualContent />}
        {settings.categories.textAppearance && <TextAppearance />}
        {settings.categories.navigationOptions && <NavigationOptions />}
        {settings.categories.readingTools && <ReadingTools />}
      </div>
      
      <div className="p-3 text-xs text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        a11y4mdl - Plugin de Acessibilidade para Moodle
      </div>
    </div>
  );
};

export default A11yPopover;
