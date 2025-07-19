import type { RecipeType, UseType, LineageType } from "./items";

export type ItemDataType = {
  id: number;
  text: string;
  emoji: string;
  use_count: number;
  recipe_count: number;
  depth: number;
};

export type RecipesDataType = {
  total: number;
  recipes: RecipeType[];
};

export type UsesDataType = {
  total: number;
  uses: UseType[];
};

export type LineageDataType = {
  steps: LineageType;
  missing: Record<string, string | "loop">;
};

export type CustomLineageDataType = LineageDataType;
