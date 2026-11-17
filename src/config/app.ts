import { env, isDev, isPreview } from "./env";

const BASE_DOMAIN = "omkarnath.vercel.app";
const SITE_DOMAIN = isDev ? `localhost:${env.PORT}` : isPreview ? env.VERCEL_URL! : BASE_DOMAIN;
const SITE_URL = isDev ? `http://${SITE_DOMAIN}/` : `https://${SITE_DOMAIN}/`;

export const SITE = {
  NAME: "Omkarnath Mission",
  TITLE: "Omkarnath Mission | Spirituality, Devotion & Selfless Service",
  DESCRIPTION: `Dedicated to spreading the divine teachings of Sri Sri Thakur Sitaramdas Omkarnath through his timeless wisdom, spirituality, devotion, and humanitarian service`,
  DOMAIN: SITE_DOMAIN,
  URL: SITE_URL,
};
