
import { Keyboard, Link, MousePointer, Settings } from "lucide-react";
import CyclicOption from "../a11y-options/CyclicOption";
import SwitchOption from "../a11y-options/SwitchOption";
import { useA11ySettings } from "../../hooks/useA11ySettings";

const NavigationOptions = () => {
  const { settings, updateCyclicOption, updateToggleOption } = useA11ySettings();
  
  const handleCursorChange = () => {
    const currentCursor = settings.options.cursor;
    const cursorOptions: Array<typeof currentCursor> = ["default", "large-black", "large-white"];
    const currentIndex = cursorOptions.indexOf(currentCursor);
    const nextIndex = (currentIndex + 1) % cursorOptions.length;
    updateCyclicOption("cursor", cursorOptions[nextIndex]);
  };

  const getCursorLabel = () => {
    switch (settings.options.cursor) {
      case "large-black": return "Grande preto";
      case "large-white": return "Grande branco";
      default: return "Padrão";
    }
  };
  
  return (
    <div className="a11y-option-group">
      <h4 className="a11y-option-title">Navegação</h4>
      
      <div className="a11y-option-items mb-3">
        <CyclicOption
          icon={<MousePointer />}
          title="Cursor"
          currentState={getCursorLabel()}
          active={settings.options.cursor !== "default"}
          totalStates={3}
          activeState={settings.options.cursor === "default" ? 0 : ["large-black", "large-white"].indexOf(settings.options.cursor) + 1}
          onClick={handleCursorChange}
        />
      </div>
      
      <div className="flex flex-col gap-2 mt-4">
        <SwitchOption
          icon={<Link />}
          label="Destacar Links"
          checked={settings.options.highlightLinks}
          onChange={(checked) => updateToggleOption("highlightLinks", checked)}
        />
        <SwitchOption
          icon={<Settings />}
          label="Destacar Botões"
          checked={settings.options.highlightButtons}
          onChange={(checked) => updateToggleOption("highlightButtons", checked)}
        />
        <SwitchOption
          icon={<Keyboard />}
          label="Navegação por Teclado"
          checked={settings.options.keyboardNavigation}
          onChange={(checked) => updateToggleOption("keyboardNavigation", checked)}
        />
      </div>
    </div>
  );
};

export default NavigationOptions;
