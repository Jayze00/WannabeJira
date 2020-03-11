export async function fetchWithToken(input: string, init: any = {headers: {}}): Promise<Response> {
  init.headers['Authorization'] = localStorage.getItem('Authorization');
  return await fetch(input, init);
}
