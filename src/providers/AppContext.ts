import { createContext } from "react";
import { signal, computed, effect } from "@preact/signals-react";
import { Firebase } from "../../src-migrate/utils/firebase";

import packageJson from "../../package.json";
import configJson from "../config.json";

// global app state
const store = {
  loading: signal(true),
  theme: signal(configJson.theme),
  language: signal(configJson.language),
  count: signal(1),
  data: signal({}),
  // double: computed(() => count.value * 2);
};
const firebaseConfig: string = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG_JSON as string,
);
const firebaseCredentials = {
  email: process.env.NEXT_PUBLIC_FIREBASE_EMAIL,
  password: process.env.NEXT_PUBLIC_FIREBASE_PASSWORD,
};
const production: boolean = process.env.NODE_ENV === "production";

export class App {
  public name: string = configJson.appName;
  public version: string = packageJson.version;
  public production: boolean = production;
  public config: any = configJson;
  public state = store;
  public firebase: Firebase;
  public apikeyOpenAi: string = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  constructor() {
    this.firebase = new Firebase();
    if (process.env.NEXT_PUBLIC_NODE_ENV === "production")
      this.production = true;
    this.init();
  }

  async init() {
    await this.initFirebase();
    // todo: load remote intial data
    Object.keys(configJson.remoteData).forEach((key, i) => {
      const value = configJson.remoteData[key];
      console.log(key, value);
    });
    this.state.loading.value = false;
    console.log("init");
    console.log(this);
  }

  debug(value: any = undefined): void {
    console.log("debug");
    if (this.production) return;
    if (value) {
      console.log(value);
      return;
    }
    console.log(this);
  }

  async initFirebase() {
    await this.firebase.init(firebaseConfig);
    if (this.config.autoLogin) {
      await this.firebase.login(
        firebaseCredentials.email,
        firebaseCredentials.password,
      );
    }
  }
}

export const appInstance = new App();

export const AppContext = createContext(null);
