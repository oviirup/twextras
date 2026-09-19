import { validators as v } from "cn/config";

const isArbitrary = [v.isArbitraryValue, v.isArbitraryVariable];

/** @type {Record<string,ReadonlyArray<import('cn/config').ClassGroupDef>>} */
export const classGroups = {
  drag: [{ drag: ["none", "element", "auto"] }],
  stroke: [{ stroke: [v.isInteger, ...isArbitrary] }],
  strokeDasharray: [{ "stroke-dasharray": isArbitrary }],
  strokeDashoffset: [{ "stroke-dashoffset": isArbitrary }],
  strokeLinecap: [{ "stroke-linecap": ["round", "butt", "square"] }],
  strokeLinejoin: [{ "stroke-linejoin": ["round", "bevel", "miter"] }],
  strokeMiter: [{ "stroke-miter": [v.isInteger, ...isArbitrary] }],
};

/** @type {import('cn/config').ConfigExtension} */
export const cnConfigExtension = {
  extend: { classGroups },
};
