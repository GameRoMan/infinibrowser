import { z } from 'zod';

import { ItemDataSchema, RecipesDataSchema, UsesDataSchema, LineageDataSchema } from './types';
import type { ItemDataType, RecipesDataType, UsesDataType, LineageDataType } from './types';

export type Params = Record<string, string | number | boolean | null | undefined>;

export class Infinibrowser {
	// Base URL
	static readonly API_URL = 'https://infinibrowser.wiki/';

	private async _get<TSchema>(options: { path: string; params?: Params; schema: z.ZodType<TSchema> }) {
		const url = new URL(options.path, Infinibrowser.API_URL);

		if (options.params) {
			for (const [key, value] of Object.entries(options.params)) {
				if (value !== null && value !== undefined) {
					url.searchParams.append(key, String(value));
				}
			}
		}

		const res = await fetch(url.toString());

		if (!res.ok) {
			throw new Error(`HTTP ${res.status} - ${res.statusText}`);
		}

		const json = await res.json();

		return options.schema.parse(json);
	}

	async getItem(id: string) {
		const path = '/api/item';
		const params = { id };
		const data = await this._get({ path, params, schema: ItemDataSchema });
		return data as ItemDataType;
	}

	async getRecipes(id: string, offset = 0) {
		const path = '/api/recipes';
		const params = { id, offset };
		const data = await this._get({ path, params, schema: RecipesDataSchema });
		return data as RecipesDataType;
	}

	async getUses(id: string, offset = 0) {
		const path = '/api/uses';
		const params = { id, offset };
		const data = await this._get({ path, params, schema: UsesDataSchema });
		return data as UsesDataType;
	}

	async getLineage(id: string) {
		const path = '/api/recipe';
		const params = { id };
		const data = await this._get({ path, params, schema: LineageDataSchema });
		return data as LineageDataType;
	}
}
