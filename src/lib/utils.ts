import { clsx, cn } from "cn";
import { cva as baseCva, type VariantProps } from "cva";

export { clsx, cn };

export const cva: typeof baseCva = baseCva;
export namespace cva {
  export type Props<T extends (...args: any[]) => any> = VariantProps<T>;
}
