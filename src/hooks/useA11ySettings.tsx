
import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Settings types
export interface A11ySettings {
  // Plugin settings
  pluginEnabled: boolean;
  savePreferences: "database" | "localStorage" | "both";
  buttonPosition: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  inactivityTimeout: number; // in days
  
  // Category visibility
  categories: {
    colorAdjustments: boolean;
    visualContent: boolean;
    textAppearance: boolean;
    navigationOptions: boolean;
    readingTools: boolean;
  };
  
  // Accessibility options
  options: {
    // Cyclic options with multiple states
    contrast: "normal" | "high" | "low" | "dark" | "sepia";
    saturation: "normal" | "low" | "high" | "none";
    textAlign: "default" | "left" | "center" | "right" | "justify";
    font: "default" | "readable" | "dyslexic";
    cursor: "default" | "large-black" | "large-white";
    
    // Range options with sliders
    fontSize: number; // Scale factor: 1.0-1.4
    letterSpacing: number; // 0-3 representing spacing levels
    lineHeight: number; // 0-3 representing spacing levels
    
    // Toggle options with switches
    hideImages: boolean;
    pauseAnimations: boolean;
    highlightTitles: boolean;
    highlightLinks: boolean;
    highlightButtons: boolean;
    tooltips: boolean;
    ariaTooltips: boolean;
    keyboardNavigation: boolean;
    screenReader: boolean;
    readingGuide: boolean;
    readingMask: boolean;
  };
}

// Default settings
const defaultSettings: A11ySettings = {
  pluginEnabled: true,
  savePreferences: "localStorage",
  buttonPosition: "bottom-right",
  inactivityTimeout: 30,
  
  categories: {
    colorAdjustments: true,
    visualContent: true,
    textAppearance: true,
    navigationOptions: true,
    readingTools: true,
  },
  
  options: {
    contrast: "normal",
    saturation: "normal",
    textAlign: "default",
    font: "default",
    cursor: "default",
    
    fontSize: 0,
    letterSpacing: 0,
    lineHeight: 0,
    
    hideImages: false,
    pauseAnimations: false,
    highlightTitles: false,
    highlightLinks: false,
    highlightButtons: false,
    tooltips: false,
    ariaTooltips: false,
    keyboardNavigation: false,
    screenReader: false,
    readingGuide: false,
    readingMask: false,
  }
};

interface A11ySettingsContextType {
  settings: A11ySettings;
  updateSettings: (settings: Partial<A11ySettings>) => void;
  updateCyclicOption: (option: keyof A11ySettings["options"], value: any) => void;
  updateToggleOption: (option: keyof A11ySettings["options"], value: boolean) => void;
  updateRangeOption: (option: keyof A11ySettings["options"], value: number) => void;
  resetSettings: () => void;
}

const A11ySettingsContext = createContext<A11ySettingsContextType | undefined>(undefined);

export const A11ySettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<A11ySettings>(defaultSettings);
  const { toast } = useToast();

  // Load settings from localStorage on component mount
  useEffect(() => {
    const storedSettings = localStorage.getItem("a11y4mdl-settings");
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings);
        setSettings(parsedSettings);
      } catch (error) {
        console.error("Failed to parse stored settings:", error);
        // Reset to default if parsing fails
        localStorage.setItem("a11y4mdl-settings", JSON.stringify(defaultSettings));
      }
    }
  }, []);

  // Apply accessibility settings to document
  useEffect(() => {
    const { options } = settings;
    const documentElement = document.documentElement;
    const bodyElement = document.body;
    
    // Reset all classes first
    documentElement.classList.remove(
      "a11y-high-contrast", 
      "a11y-low-contrast", 
      "a11y-dark-mode", 
      "a11y-sepia",
      "a11y-low-saturation", 
      "a11y-high-saturation", 
      "a11y-no-saturation",
      "a11y-font-readable", 
      "a11y-font-dyslexic",
      "a11y-cursor-large-black", 
      "a11y-cursor-large-white",
      "a11y-hide-images",
      "a11y-pause-animations",
      "a11y-highlight-titles",
      "a11y-highlight-links",
      "a11y-highlight-buttons"
    );
    
    // Apply contrast
    switch (options.contrast) {
      case "high": documentElement.classList.add("a11y-high-contrast"); break;
      case "low": documentElement.classList.add("a11y-low-contrast"); break;
      case "dark": documentElement.classList.add("a11y-dark-mode"); break;
      case "sepia": documentElement.classList.add("a11y-sepia"); break;
    }
    
    // Apply saturation
    switch (options.saturation) {
      case "low": documentElement.classList.add("a11y-low-saturation"); break;
      case "high": documentElement.classList.add("a11y-high-saturation"); break;
      case "none": documentElement.classList.add("a11y-no-saturation"); break;
    }
    
    // Apply text alignment
    if (options.textAlign !== "default") {
      bodyElement.style.textAlign = options.textAlign;
    } else {
      bodyElement.style.textAlign = "";
    }
    
    // Apply font
    switch (options.font) {
      case "readable": documentElement.classList.add("a11y-font-readable"); break;
      case "dyslexic": documentElement.classList.add("a11y-font-dyslexic"); break;
    }
    
    // Apply cursor
    switch (options.cursor) {
      case "large-black": documentElement.classList.add("a11y-cursor-large-black"); break;
      case "large-white": documentElement.classList.add("a11y-cursor-large-white"); break;
    }
    
    // Apply font size
    const fontSizes = [1.1, 1.2, 1.3, 1.4];
    if (options.fontSize > 0) {
      bodyElement.style.fontSize = `${fontSizes[options.fontSize - 1]}rem`;
    } else {
      bodyElement.style.fontSize = "";
    }
    
    // Apply letter & word spacing
    const spacings = [
      { letter: "0.12em", word: "0.16em" },
      { letter: "0.24em", word: "0.32em" },
      { letter: "0.36em", word: "0.48em" }
    ];
    if (options.letterSpacing > 0) {
      bodyElement.style.letterSpacing = spacings[options.letterSpacing - 1].letter;
      bodyElement.style.wordSpacing = spacings[options.letterSpacing - 1].word;
    } else {
      bodyElement.style.letterSpacing = "";
      bodyElement.style.wordSpacing = "";
    }
    
    // Apply line height
    const lineHeights = ["1.75rem", "2rem", "2.25rem"];
    if (options.lineHeight > 0) {
      bodyElement.style.lineHeight = lineHeights[options.lineHeight - 1];
    } else {
      bodyElement.style.lineHeight = "";
    }
    
    // Apply toggle options
    if (options.hideImages) documentElement.classList.add("a11y-hide-images");
    if (options.pauseAnimations) documentElement.classList.add("a11y-pause-animations");
    if (options.highlightTitles) documentElement.classList.add("a11y-highlight-titles");
    if (options.highlightLinks) documentElement.classList.add("a11y-highlight-links");
    if (options.highlightButtons) documentElement.classList.add("a11y-highlight-buttons");
    
    // Handle reading guide and mask in separate useEffect
  }, [settings]);

  // Handle reading guide and mask separately
  useEffect(() => {
    const { readingGuide, readingMask } = settings.options;
    
    // Clean up any existing guides/masks
    const existingGuide = document.getElementById("a11y-reading-guide");
    const existingMask = document.getElementById("a11y-reading-mask");
    
    if (existingGuide) existingGuide.remove();
    if (existingMask) existingMask.remove();
    
    // Create reading guide
    if (readingGuide) {
      const guide = document.createElement("div");
      guide.id = "a11y-reading-guide";
      guide.className = "a11y-reading-guide";
      document.body.appendChild(guide);
      
      const handleMouseMove = (e: MouseEvent) => {
        guide.style.top = `${e.clientY}px`;
      };
      
      document.addEventListener("mousemove", handleMouseMove);
      
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
    
    // Create reading mask
    if (readingMask) {
      const mask = document.createElement("div");
      mask.id = "a11y-reading-mask";
      mask.className = "a11y-reading-mask";
      
      const window = document.createElement("div");
      window.className = "a11y-reading-mask-window";
      mask.appendChild(window);
      
      document.body.appendChild(mask);
      
      const handleMouseMove = (e: MouseEvent) => {
        const windowHeight = 100;
        window.style.top = `${e.clientY - windowHeight / 2}px`;
      };
      
      document.addEventListener("mousemove", handleMouseMove);
      
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [settings.options.readingGuide, settings.options.readingMask]);

  // Update all settings
  const updateSettings = (newSettings: Partial<A11ySettings>) => {
    setSettings(prevSettings => {
      const updatedSettings = { ...prevSettings, ...newSettings };
      // Save to localStorage
      localStorage.setItem("a11y4mdl-settings", JSON.stringify(updatedSettings));
      return updatedSettings;
    });
    toast({
      title: "Configurações atualizadas",
      description: "As preferências de acessibilidade foram salvas."
    });
  };

  // Handle cyclic options specifically
  const updateCyclicOption = (option: keyof A11ySettings["options"], value: any) => {
    setSettings(prevSettings => {
      const updatedSettings = { 
        ...prevSettings, 
        options: { 
          ...prevSettings.options,
          [option]: value
        } 
      };
      localStorage.setItem("a11y4mdl-settings", JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  // Handle toggle options
  const updateToggleOption = (option: keyof A11ySettings["options"], value: boolean) => {
    setSettings(prevSettings => {
      const updatedSettings = {
        ...prevSettings,
        options: {
          ...prevSettings.options,
          [option]: value
        }
      };
      localStorage.setItem("a11y4mdl-settings", JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  // Handle range options
  const updateRangeOption = (option: keyof A11ySettings["options"], value: number) => {
    setSettings(prevSettings => {
      const updatedSettings = {
        ...prevSettings,
        options: {
          ...prevSettings.options,
          [option]: value
        }
      };
      localStorage.setItem("a11y4mdl-settings", JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  // Reset settings to default
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem("a11y4mdl-settings", JSON.stringify(defaultSettings));
    toast({
      title: "Configurações redefinidas",
      description: "As preferências de acessibilidade foram restauradas aos valores padrão."
    });
  };

  return (
    <A11ySettingsContext.Provider value={{ 
      settings, 
      updateSettings, 
      updateCyclicOption,
      updateToggleOption,
      updateRangeOption,
      resetSettings 
    }}>
      {children}
    </A11ySettingsContext.Provider>
  );
};

export const useA11ySettings = () => {
  const context = useContext(A11ySettingsContext);
  if (context === undefined) {
    throw new Error("useA11ySettings must be used within an A11ySettingsProvider");
  }
  return context;
};
