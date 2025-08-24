import type { RecipeType, UseType, LineageType } from "./items";

export type ItemDataType = {
  readonly id: number;
  readonly text: string;
  readonly emoji: string;
  readonly use_count: number;
  readonly recipe_count: number;
  readonly depth: number;
};

export type RecipesDataType = {
  readonly total: number;
  readonly recipes: RecipeType[];
};

export type UsesDataType = {
  readonly total: number;
  readonly uses: UseType[];
};

export type LineageDataType = {
  readonly steps: LineageType;
  readonly missing: Record<string, "loop" | (string & {})>;
};

export type CustomLineageDataType = LineageDataType;
