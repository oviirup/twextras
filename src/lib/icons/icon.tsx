import { toPascalCase } from "@oviirup/utils/string";
import { createElement } from "react";

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
        {nodes.map(([TAG, props], i) => {
          return createElement(TAG, { key: `${name}:${TAG}:${i}`, ...props });
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
