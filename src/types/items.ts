import { z } from 'zod';

export const ElementSchema = z.object({
	id: z.string(),
	emoji: z.string()
});
export type ElementType = z.infer<typeof ElementSchema>;

export const ItemDataSchema = z.object({
	id: z.number(),
	text: z.string(),
	emoji: z.string(),
	use_count: z.number(),
	recipe_count: z.number(),
	depth: z.number()
});
export type ItemDataType = z.infer<typeof ItemDataSchema>;

export const RecipeSchema = z.tuple([ElementSchema, ElementSchema]);
export type RecipeType = z.infer<typeof RecipeSchema>;

export const RecipesDataSchema = z.object({
	total: z.number(),
	recipes: z.array(RecipeSchema)
});
export type RecipesDataType = z.infer<typeof RecipesDataSchema>;

export const UseSchema = z.object({
	pair: ElementSchema,
	result: ElementSchema
});
export type UseType = z.infer<typeof UseSchema>;

export const UsesDataSchema = z.object({
	total: z.number(),
	recipes: z.array(RecipeSchema)
});
export type UsesDataType = z.infer<typeof UsesDataSchema>;

export const StepSchema = z.object({
	a: ElementSchema,
	b: ElementSchema,
	result: ElementSchema
});
export type StepType = z.infer<typeof StepSchema>;

export const LineageSchema = z.array(StepSchema);
export type LineageType = z.infer<typeof LineageSchema>;

export const LineageDataSchema = z.object({
	steps: LineageSchema,
	missing: z.record(z.union([z.string(), z.literal('loop')]))
});
export type LineageDataType = z.infer<typeof LineageDataSchema>;
