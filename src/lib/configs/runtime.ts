let runtimeConfig: Record<string, any> | null = null;

export async function loadRuntimeConfig() {
	if (runtimeConfig) return runtimeConfig;
	const res = await fetch("/config.json");
	runtimeConfig = await res.json();
	return runtimeConfig;
}
