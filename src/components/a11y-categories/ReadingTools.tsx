
import { Eye, Help, Reading, Volume } from "lucide-react";
import SwitchOption from "../a11y-options/SwitchOption";
import { useA11ySettings } from "../../hooks/useA11ySettings";

const ReadingTools = () => {
  const { settings, updateToggleOption } = useA11ySettings();
  
  return (
    <div className="a11y-option-group">
      <h4 className="a11y-option-title">Ferramentas de Leitura</h4>
      
      <div className="flex flex-col gap-2">
        <SwitchOption
          icon={<Reading />}
          label="Guia de Leitura"
          checked={settings.options.readingGuide}
          onChange={(checked) => updateToggleOption("readingGuide", checked)}
        />
        <SwitchOption
          icon={<Eye />}
          label="Máscara de Leitura"
          checked={settings.options.readingMask}
          onChange={(checked) => updateToggleOption("readingMask", checked)}
        />
        <SwitchOption
          icon={<Volume />}
          label="Leitor de Tela"
          checked={settings.options.screenReader}
          onChange={(checked) => updateToggleOption("screenReader", checked)}
        />
        <SwitchOption
          icon={<Help />}
          label="Dicas de Ferramentas"
          checked={settings.options.tooltips}
          onChange={(checked) => updateToggleOption("tooltips", checked)}
        />
      </div>
    </div>
  );
};

export default ReadingTools;
