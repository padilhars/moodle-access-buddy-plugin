
import { AlignLeft, Text, TextCursor } from "lucide-react";
import CyclicOption from "../a11y-options/CyclicOption";
import SliderOption from "../a11y-options/SliderOption";
import { useA11ySettings } from "../../hooks/useA11ySettings";

const TextAppearance = () => {
  const { settings, updateCyclicOption, updateRangeOption } = useA11ySettings();
  
  const handleTextAlignChange = () => {
    const currentAlign = settings.options.textAlign;
    const alignOptions: Array<typeof currentAlign> = ["default", "left", "center", "right", "justify"];
    const currentIndex = alignOptions.indexOf(currentAlign);
    const nextIndex = (currentIndex + 1) % alignOptions.length;
    updateCyclicOption("textAlign", alignOptions[nextIndex]);
  };

  const handleFontChange = () => {
    const currentFont = settings.options.font;
    const fontOptions: Array<typeof currentFont> = ["default", "readable", "dyslexic"];
    const currentIndex = fontOptions.indexOf(currentFont);
    const nextIndex = (currentIndex + 1) % fontOptions.length;
    updateCyclicOption("font", fontOptions[nextIndex]);
  };

  const getAlignmentLabel = () => {
    switch (settings.options.textAlign) {
      case "left": return "Esquerda";
      case "center": return "Centro";
      case "right": return "Direita";
      case "justify": return "Justificado";
      default: return "Padrão";
    }
  };

  const getFontLabel = () => {
    switch (settings.options.font) {
      case "readable": return "Legível";
      case "dyslexic": return "OpenDyslexic";
      default: return "Padrão";
    }
  };
  
  return (
    <div className="a11y-option-group">
      <h4 className="a11y-option-title">Aparência do Texto</h4>
      
      <div className="a11y-option-items mb-3">
        <CyclicOption
          icon={<AlignLeft />}
          title="Alinhamento"
          currentState={getAlignmentLabel()}
          active={settings.options.textAlign !== "default"}
          totalStates={5}
          activeState={settings.options.textAlign === "default" ? 0 : ["left", "center", "right", "justify"].indexOf(settings.options.textAlign) + 1}
          onClick={handleTextAlignChange}
        />
        <CyclicOption
          icon={<Text />}
          title="Fonte"
          currentState={getFontLabel()}
          active={settings.options.font !== "default"}
          totalStates={3}
          activeState={settings.options.font === "default" ? 0 : ["readable", "dyslexic"].indexOf(settings.options.font) + 1}
          onClick={handleFontChange}
        />
      </div>
      
      <div className="space-y-4 mt-4">
        <SliderOption
          label="Tamanho da fonte"
          value={settings.options.fontSize}
          min={0}
          max={4}
          step={1}
          valueLabel={settings.options.fontSize === 0 ? "Padrão" : `${(settings.options.fontSize * 0.1 + 1).toFixed(1)}rem`}
          onChange={(value) => updateRangeOption("fontSize", value)}
        />
        <SliderOption
          label="Espaçamento entre letras"
          value={settings.options.letterSpacing}
          min={0}
          max={3}
          step={1}
          valueLabel={settings.options.letterSpacing === 0 ? "Padrão" : `Nível ${settings.options.letterSpacing}`}
          onChange={(value) => updateRangeOption("letterSpacing", value)}
        />
        <SliderOption
          label="Espaçamento entre linhas"
          value={settings.options.lineHeight}
          min={0}
          max={3}
          step={1}
          valueLabel={settings.options.lineHeight === 0 ? "Padrão" : `Nível ${settings.options.lineHeight}`}
          onChange={(value) => updateRangeOption("lineHeight", value)}
        />
      </div>
    </div>
  );
};

export default TextAppearance;
