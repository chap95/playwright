import { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  use: {
    channel: "chrome",
    headless: false,
    viewport: {
      width: 1280,
      height: 720,
    },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
  },
};

export default config;
