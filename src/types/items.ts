export type ElementType = {
  id: string;
  emoji: string;
};

export type RecipeType = [ElementType, ElementType];

export type UseType = {
  pair: ElementType;
  result: ElementType;
};

export type StepType = {
  a: ElementType;
  b: ElementType;
  result: ElementType;
};

export type LineageType = StepType[];

export type ShareStepType = [ElementType, ElementType, ElementType];

export type ShareLineageType = ShareStepType[];
