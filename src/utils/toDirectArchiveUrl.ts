export function toDirectArchiveUrl(url: string): string {
  return url.replace("/details/", "/download/");
}
