
import { Contrast, Palette } from "lucide-react";
import CyclicOption from "../a11y-options/CyclicOption";
import { useA11ySettings } from "../../hooks/useA11ySettings";

const ColorAdjustments = () => {
  const { settings, updateCyclicOption } = useA11ySettings();
  
  const handleContrastChange = () => {
    const currentContrast = settings.options.contrast;
    const contrastOptions: Array<typeof currentContrast> = ["normal", "high", "low", "dark", "sepia"];
    const currentIndex = contrastOptions.indexOf(currentContrast);
    const nextIndex = (currentIndex + 1) % contrastOptions.length;
    updateCyclicOption("contrast", contrastOptions[nextIndex]);
  };

  const handleSaturationChange = () => {
    const currentSaturation = settings.options.saturation;
    const saturationOptions: Array<typeof currentSaturation> = ["normal", "low", "high", "none"];
    const currentIndex = saturationOptions.indexOf(currentSaturation);
    const nextIndex = (currentIndex + 1) % saturationOptions.length;
    updateCyclicOption("saturation", saturationOptions[nextIndex]);
  };

  const getContrastLabel = () => {
    switch (settings.options.contrast) {
      case "high": return "Alto contraste";
      case "low": return "Baixo contraste";
      case "dark": return "Modo escuro";
      case "sepia": return "Sépia";
      default: return "Normal";
    }
  };

  const getSaturationLabel = () => {
    switch (settings.options.saturation) {
      case "low": return "Baixa saturação";
      case "high": return "Alta saturação";
      case "none": return "Sem saturação";
      default: return "Normal";
    }
  };

  return (
    <div className="a11y-option-group">
      <h4 className="a11y-option-title">Ajustes de Cores</h4>
      <div className="a11y-option-items">
        <CyclicOption
          icon={<Contrast />}
          title="Contraste"
          currentState={getContrastLabel()}
          active={settings.options.contrast !== "normal"}
          totalStates={5}
          activeState={settings.options.contrast === "normal" ? 0 : ["high", "low", "dark", "sepia"].indexOf(settings.options.contrast) + 1}
          onClick={handleContrastChange}
        />
        <CyclicOption
          icon={<Palette />}
          title="Saturação"
          currentState={getSaturationLabel()}
          active={settings.options.saturation !== "normal"}
          totalStates={4}
          activeState={settings.options.saturation === "normal" ? 0 : ["low", "high", "none"].indexOf(settings.options.saturation) + 1}
          onClick={handleSaturationChange}
        />
      </div>
    </div>
  );
};

export default ColorAdjustments;
