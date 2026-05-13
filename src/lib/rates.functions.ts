export interface RatesResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

// Free, no-key API: open.er-api.com — fetched directly from the browser (static SPA).
export async function getRates(opts: { data: { base: string } }): Promise<RatesResponse> {
  const base = (opts.data.base || "USD").toUpperCase().slice(0, 6);
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${base}`, {
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as {
      result: string;
      base_code: string;
      time_last_update_utc: string;
      rates: Record<string, number>;
    };
    if (json.result !== "success") throw new Error("rates fetch failed");
    return { base: json.base_code, date: json.time_last_update_utc, rates: json.rates };
  } catch (e) {
    console.error("getRates error:", e);
    return { base, date: new Date().toISOString(), rates: {} };
  }
}
