import { useContext } from "react";
// import { useTheme } from 'styled-components';
import { AppContext, App } from "@/providers";
import { useEffectOnce } from "./index";

export const useAppContext = () => {
  const app: App = useContext(AppContext);
  // const scTheme = useTheme();

  return {
    app,
    signals: app.signals,
    fb: app.firebase,
    // scTheme,
    useEffectOnce,
  };
};
