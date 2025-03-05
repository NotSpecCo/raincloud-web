export class Storage {
	static set(key: StorageKey, value: string | number | object) {
		const stringValue = typeof value === 'object' ? JSON.stringify(value) : value.toString();
		sessionStorage.setItem(key, stringValue);
	}

	static get<T = string>(key: StorageKey): T | null {
		const value = sessionStorage.getItem(key);
		if (!value) return null;
		try {
			return JSON.parse(value) as T;
		} catch {
			return value as unknown as T;
		}
	}

	static remove(key: StorageKey) {
		sessionStorage.removeItem(key);
	}

	static clear() {
		sessionStorage.clear();
	}
}

export type StorageKey = 'tokens' | 'code_verifier';
