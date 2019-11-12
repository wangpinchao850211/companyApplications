/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 * 
 * 牛XXXXX！！！
 */
const typeCache: { [label: string]: boolean } = {};

export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }
  typeCache[<string>label] = true; // 每次把已存在的状态存储到typeCache里，如果这次传入的label有对应值，抛出错误
  return <T>label;
}

// example
// 用于创建字符串列表映射至 `K: V` 的函数
function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

// 创建 K: V
const Direction = strEnum(['North', 'South', 'East', 'West']);
console.log(Direction);

// 创建一个类型, 这个类型是：type Direction = "North" | "South" | "East" | "West"
type Direction = keyof typeof Direction;

// 简单的使用, 只有是这种类型的，才能校验通过
{
  let sample: Direction;
 
  sample = Direction.North; // Okay
  sample = 'North'; // Okay
  // sample = 'AnythingElse'; // ERROR!
}


