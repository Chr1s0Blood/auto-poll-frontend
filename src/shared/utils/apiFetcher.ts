const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function apiFetcher<ReturnData>(
  input: string,
  init?: RequestInit,
  returnData: boolean = false
) {
  const response = fetch(BACKEND_URL + input, init);

  if (returnData)
    return response.then(async (res) => {
      const json = res.json();

      return json as ReturnData;
    });

  return;
}
