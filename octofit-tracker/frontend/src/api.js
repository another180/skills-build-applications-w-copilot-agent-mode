const codespaceName = import.meta.env?.VITE_CODESPACE_NAME;

export const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export async function readCollection(response) {
  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }

  const payload = await response.json();
  return normalizeCollection(payload);
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  for (const key of ['results', 'data', 'items', 'records']) {
    const value = payload[key];
    if (Array.isArray(value)) return value;
    if (value && typeof value === 'object') {
      const nested = normalizeCollection(value);
      if (nested.length > 0) return nested;
    }
  }

  return [];
}
