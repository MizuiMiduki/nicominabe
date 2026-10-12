export const DEFAULT_CEMETERY_VIDEO_ID = "sm38213757";

export const RANDOM_CEMETERY_VIDEO_IDS = [
  "sm19139061",
  "sm27404927",
  DEFAULT_CEMETERY_VIDEO_ID,
  "sm21764448",
  "sm21764440",
  "sm21764424",
  "sm19668914",
  "sm19668700",
  "sm19668547",
  "sm19557682",
  "sm19140178",
  "sm27404936",
  "sm27404931",
  "sm19139071",
  "sm19139067",
];

export function getCemeteryUrl(videoId: string): string {
  return `https://nico.ms/${videoId}?from=0`;
}
