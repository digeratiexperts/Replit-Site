export async function portalFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("portalToken");
  
  const headers: HeadersInit = {
    ...options.headers,
  };
  
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  
  if (options.body && typeof options.body === "string") {
    (headers as Record<string, string>)["Content-Type"] = "application/json";
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
  
  return response;
}

export async function portalGet<T>(url: string): Promise<T> {
  const response = await portalFetch(url);
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status}: ${text}`);
  }
  
  return response.json();
}

export async function portalPost<T>(url: string, data: unknown): Promise<T> {
  const response = await portalFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const text = await response.text();
    let message = text;
    try {
      const json = JSON.parse(text);
      if (json.message) message = json.message;
    } catch {}
    throw new Error(message);
  }
  
  return response.json();
}
