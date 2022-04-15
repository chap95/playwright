import { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  use: {
    baseURL: "https://www.nosearch.com",
    channel: "chrome",
    headless: false,
    viewport: {
      width: 1280,
      height: 720,
    },
    ignoreHTTPSErrors: true,
  },
};

export default config;
