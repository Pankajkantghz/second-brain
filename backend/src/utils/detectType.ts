export function detectType(url: string) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "Youtube";
  }

  if (url.includes("twitter.com") || url.includes("x.com")) {
    return "Twitter";
  }

  return "Website";
}
