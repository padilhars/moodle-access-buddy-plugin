
import { ImageOff, Pause } from "lucide-react";
import SwitchOption from "../a11y-options/SwitchOption";
import { useA11ySettings } from "../../hooks/useA11ySettings";

const VisualContent = () => {
  const { settings, updateToggleOption } = useA11ySettings();
  
  return (
    <div className="a11y-option-group">
      <h4 className="a11y-option-title">Conteúdo Visual</h4>
      <div className="flex flex-col gap-2">
        <SwitchOption
          icon={<ImageOff />}
          label="Ocultar Imagens"
          checked={settings.options.hideImages}
          onChange={(checked) => updateToggleOption("hideImages", checked)}
        />
        <SwitchOption
          icon={<Pause />}
          label="Pausar Animações"
          checked={settings.options.pauseAnimations}
          onChange={(checked) => updateToggleOption("pauseAnimations", checked)}
        />
      </div>
    </div>
  );
};

export default VisualContent;
