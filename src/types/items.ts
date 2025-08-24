export type ElementType = {
  readonly id: string;
  readonly emoji: string;
};

export type RecipeType = readonly [ElementType, ElementType];

export type UseType = {
  readonly pair: ElementType;
  readonly result: ElementType;
};

export type StepType = {
  readonly a: ElementType;
  readonly b: ElementType;
  readonly result: ElementType;
};

export type LineageType = readonly StepType[];

export type ShareStepType = readonly [ElementType, ElementType, ElementType];

export type ShareLineageType = readonly ShareStepType[];
