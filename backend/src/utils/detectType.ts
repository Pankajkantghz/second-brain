export function detectType(url: string) {
  try {
    const hostname = new URL(url).hostname.toLowerCase();

    if (
      hostname === "youtu.be" ||
      hostname === "youtube.com" ||
      hostname.endsWith(".youtube.com")
    ) {
      return "Youtube";
    }

    if (
      hostname === "twitter.com" ||
      hostname.endsWith(".twitter.com") ||
      hostname === "x.com" ||
      hostname.endsWith(".x.com")
    ) {
      return "Twitter";
    }
  } catch {
    // URL validation is handled before this function is called.
  }

  return "Website";
}
