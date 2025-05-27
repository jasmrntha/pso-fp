export type RecipeTypes = {
  id: number;
  name: string;
  description: string;
  category: string;
  vegan: boolean;
  cookTime: number;
  thumbnail: string;
  origin: string;
  ingredients: string[];
  measures: string[];
  steps: string[];
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export enum EnumCategory {
  Beef,
  Chicken,
  Seafood,
  Vegetarian,
  Pork,
  Lamb,
  Turkey,
  Pasta,
  Rice,
  Soup,
  Sandwiches,
  Salads,
  Pizza,
  Desserts,
}

export enum EnumOrigin {
  Asian,
  MiddleEastern,
  Indian,
  African,
  LatinAmerican,
  Mediterranean,
  Western,
  SoutheastAsian,
  EasternEuropean,
  Scandinavian,
}

export type RecipeCreateTypes = {
  name: string;
  description: string;
  category: EnumCategory | string;
  vegan: boolean;
  cookTime: number;
  thumbnail: string;
  origin: EnumOrigin | string;
  ingredient1: string;
  ingredient2?: string;
  ingredient3?: string;
  ingredient4?: string;
  ingredient5?: string;
  ingredient6?: string;
  ingredient7?: string;
  ingredient8?: string;
  ingredient9?: string;
  ingredient10?: string;
  ingredient11?: string;
  ingredient12?: string;
  ingredient13?: string;
  ingredient14?: string;
  ingredient15?: string;
  ingredient16?: string;
  ingredient17?: string;
  ingredient18?: string;
  ingredient19?: string;
  ingredient20?: string;
  measure1: string;
  measure2?: string;
  measure3?: string;
  measure4?: string;
  measure5?: string;
  measure6?: string;
  measure7?: string;
  measure8?: string;
  measure9?: string;
  measure10?: string;
  measure11?: string;
  measure12?: string;
  measure13?: string;
  measure14?: string;
  measure15?: string;
  measure16?: string;
  measure17?: string;
  measure18?: string;
  measure19?: string;
  measure20?: string;
  step1: string;
  step2?: string;
  step3?: string;
  step4?: string;
  step5?: string;
  step6?: string;
  step7?: string;
  step8?: string;
  step9?: string;
  step10?: string;
  step11?: string;
  step12?: string;
  step13?: string;
  step14?: string;
  step15?: string;
  step16?: string;
  step17?: string;
  step18?: string;
  step19?: string;
  step20?: string;
};
