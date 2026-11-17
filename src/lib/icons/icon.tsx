import { toPascalCase } from "@oviirup/utils/string";
import { createElement } from "react";

const INHERITED_PROPS = new Set(["stroke", "strokeWidth", "strokeLinecap", "strokeLinejoin"]);

export function removeSvgProps(props: IconNode[1]) {
  return Object.fromEntries(Object.entries(props).filter(([key]) => !INHERITED_PROPS.has(key)));
}

export function createIconNode({ name, nodes, props }: IconNodeOptions) {
  // biome-ignore lint/correctness/noComponentHookFactories: false positive
  const Icon = ({ size, ...iconProps }: IconProps) => {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        {...props}
        {...iconProps}
        role="presentation"
        aria-hidden="true"
        data-icon={name}>
        {nodes.map(([TAG, nodeProps], i) => {
          return createElement(TAG, {
            key: `${name}:${TAG}:${i}`,
            ...removeSvgProps(nodeProps),
          });
        })}
      </svg>
    );
  };
  Icon.displayName = toPascalCase(name);
  return Icon;
}

// type definitions --->

export type IconProps = React.ComponentProps<"svg"> & {
  size?: number;
};

export type IconNode = readonly [string, { readonly [key: string]: string | number }];
export type IconNodes = readonly IconNode[];

export type IconNodeOptions = {
  name: string;
  nodes: IconNodes;
  props?: React.ComponentProps<"svg">;
};
