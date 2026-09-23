import type { ClassGroupDef, ConfigExtension } from "cn/config";
import { validators as v } from "cn/config";

const isArbitrary = [v.isArbitraryValue, v.isArbitraryVariable];

export const classGroups: Record<string, ReadonlyArray<ClassGroupDef>> = {
  drag: [{ drag: ["none", "element", "auto"] }],
  stroke: [{ stroke: [v.isInteger, ...isArbitrary] }],
  strokeDasharray: [{ "stroke-dasharray": isArbitrary }],
  strokeDashoffset: [{ "stroke-dashoffset": isArbitrary }],
  strokeLinecap: [{ "stroke-linecap": ["round", "butt", "square"] }],
  strokeLinejoin: [{ "stroke-linejoin": ["round", "bevel", "miter"] }],
  strokeMiter: [{ "stroke-miter": [v.isInteger, ...isArbitrary] }],
};

export const cnConfigExtension: ConfigExtension = {
  extend: { classGroups },
};
