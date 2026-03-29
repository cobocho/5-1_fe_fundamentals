async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(
      body?.message || `서버 오류가 발생했습니다. (${res.status})`,
    );
  }
  return res.json();
}

export const http = {
  get<T>(url: string): Promise<T> {
    return request<T>(url);
  },
};
