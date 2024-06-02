export async function fetchUrls(urls: string[]): Promise<Response[]> {
  const promises = urls.map((url) => fetch(url));
  const responses = await Promise.all(promises);
  return responses;
}
