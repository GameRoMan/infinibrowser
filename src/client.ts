import type {
  ItemDataType,
  RecipesDataType,
  UsesDataType,
  LineageDataType,
  CustomLineageDataType,
  ShareLineageType,
} from "./types";

type Params = Record<string, string | number | boolean | null | undefined>;

const buildUrl = (path: string, params?: Params): URL => {
  const API_URL = "https://infinibrowser.wiki/";
  const url = new URL(path, API_URL);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    }
  }

  return url;
};

const get = async <T>(options: {
  path: string;
  params?: Params;
}): Promise<T> => {
  const url = buildUrl(options.path, options.params);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} - ${res.statusText}`);
  }

  return res.json() as Promise<T>;
};

const post = async <T>(options: {
  path: string;
  params?: Params;
  payload?: Record<string, unknown>;
}): Promise<T> => {
  const url = buildUrl(options.path, options.params);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options.payload ?? {}),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} - ${res.statusText}`);
  }

  return res.json() as Promise<T>;
};

export async function getItem(id: string) {
  const path = "/api/item";
  const params = { id };
  const data = await get<ItemDataType>({ path, params });
  return data;
}

export async function getRecipes(id: string, offset = 0) {
  const path = "/api/recipes";
  const params = { id, offset };
  const data = await get<RecipesDataType>({ path, params });
  return data;
}

export async function getUses(id: string, offset = 0) {
  const path = "/api/uses";
  const params = { id, offset };
  const data = await get<UsesDataType>({ path, params });
  return data;
}

export async function getLineage(id: string) {
  const path = "/api/recipe";
  const params = { id };
  const data = await get<LineageDataType>({ path, params });
  return data;
}

export async function getCustomLineage(id: string) {
  const path = "/api/recipe/custom";
  const params = { id };
  const data = await get<CustomLineageDataType>({ path, params });
  return data;
}

export async function optimizeLineage(id: string) {
  const path = "/api/optimize-lineage";
  const params = { id };
  const data = await post<{
    id: string;
    before: number;
    after: number;
  }>({ path, params });
  return data;
}

export async function shareLineage(steps: ShareLineageType) {
  const path = "/api/analytics/share";

  const lastStep = steps[steps.length - 1];
  if (!lastStep) throw new Error("Lineage must not be empty");

  const resultElement = lastStep[2];
  const payload: {
    id: string;
    emoji: string;
    steps: ShareLineageType;
  } = { id: resultElement.id, emoji: resultElement.emoji, steps };

  const data = await post<{ id: string }>({ path, payload });
  return data;
}

export async function shareMultitargetLineage() {
  throw new Error("Not implemented");
}
