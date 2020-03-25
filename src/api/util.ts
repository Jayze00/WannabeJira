export async function fetchWithToken(input: string, init: any = {headers: {}}): Promise<Response> {
  init.headers['Authorization'] = localStorage.getItem('authorization');
  return await fetch(input, init);
}
