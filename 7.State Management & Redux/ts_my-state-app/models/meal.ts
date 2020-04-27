class Meal {
  id: string;
  categoryIds: Array<string>;
  title: string;
  affordability: string;
  complexity: string;
  imageUrl: string;
  duration: number;
  ingredients: Array<string>;
  steps: Array<string>;
  isGlutenFree: boolean; //无麸质 (严格戒断含有麦麸的食物，如意大利面、披萨、啤酒、燕麦、吐司、三明治等，甚至酱料、蛋糕、面包、饼干与蛋糕等精致食物，而改以马铃薯、玉米、蔬菜、肉类、豆类、坚果、乳蛋、海鲜、米类等为主)
  isVegan: boolean; //严格的素食主义者的(不吃肉、奶、蛋等，有的不用动物产品)
  isVegetarian: boolean; //素食的 (不吃肉类, 但可能吃鸡蛋,牛奶和蜂蜜 (还是会涉及动物))
  isLactoseFree: boolean; //无乳糖的

  constructor(
      
    id: string,
    categoryIds: Array<string>,
    title: string,
    affordability: string,
    complexity: string,
    imageUrl: string,
    duration: number,
    ingredients: Array<string>,
    steps: Array<string>,
    isGlutenFree: boolean, 
    isVegan: boolean, 
    isVegetarian: boolean,
    isLactoseFree: boolean,

  ) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.title = title;
    this.affordability = affordability;
    this.complexity = complexity;
    this.imageUrl = imageUrl;
    this.duration = duration;
    this.ingredients = ingredients;
    this.steps = steps;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegetarian = isVegetarian;
    this.isLactoseFree = isLactoseFree;
  }
}

export default Meal;
