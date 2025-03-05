import type { PostLoginAction, Tokens } from './schemas';

export class Storage {
	static set<K extends StorageKey>(key: K, value: StorageValue[K]) {
		const stringValue = typeof value === 'object' ? JSON.stringify(value) : value.toString();
		sessionStorage.setItem(key, stringValue);
	}

	static get<K extends StorageKey>(key: K): StorageValue[K] | null {
		const value = sessionStorage.getItem(key);
		if (!value) return null;
		try {
			return JSON.parse(value) as StorageValue[K];
		} catch {
			return value as unknown as StorageValue[K];
		}
	}

	static remove(key: StorageKey) {
		sessionStorage.removeItem(key);
	}

	static clear() {
		sessionStorage.clear();
	}
}

export type StorageKey = 'tokens' | 'code_verifier' | 'post_login_action';
export type StorageValue = {
	tokens: Tokens;
	code_verifier: string;
	post_login_action: PostLoginAction;
};
