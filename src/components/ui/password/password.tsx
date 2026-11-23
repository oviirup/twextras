"use client";

import { useRef, useState } from "react";
import { Glance } from "@/components/ui/glance";
import { InputGroup } from "@/components/ui/input";
import { createBaseContext } from "@/lib/context";
import { useComposeEvent, useComposeRefs } from "@/lib/hooks";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

// password context --->

type PasswordRule = {
  label: string;
  rule: (value: string) => boolean;
};

type PasswordContextValue = {
  visible: boolean;
  toggle: () => void;
  hide: () => void;
  value: string;
  setValue: (value: string) => void;
  ruleset: PasswordRule[];
  rootRef: React.RefObject<HTMLDivElement | null>;
};

const [PassContext, usePass] = createBaseContext<PasswordContextValue>({
  name: "password",
  error: "Password parts must be used inside <Password.Root>",
});

// password root --->

function Password_Root({ className, children, ruleset = [], ref, ...props }: Password_Root.Props) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const composedRef = useComposeRefs(rootRef, ref);

  const toggle = () => setVisible((v) => !v);
  const hide = () => setVisible(false);

  const ctx = { visible, toggle, hide, value, setValue, ruleset, rootRef };

  return (
    <PassContext value={ctx}>
      <InputGroup.Root
        ref={composedRef}
        data-slot="password"
        data-revealed={visible ? "" : undefined}
        className={cn("group/password", className)}
        {...props}>
        {children}
      </InputGroup.Root>
    </PassContext>
  );
}
namespace Password_Root {
  export type Props = InputGroup.Root.Props & {
    ruleset?: PasswordRule[];
  };
}

// password input --->

function Password_Input({
  type,
  className,
  onChange: onChangeProp,
  onBlur: onBlurProp,
  ...props
}: Password_Input.Props) {
  const { visible, setValue, hide } = usePass();

  const onChange = useComposeEvent(onChangeProp, (e) => setValue(e.target.value));
  const onBlur = useComposeEvent(onBlurProp, hide);

  return (
    <InputGroup.Input
      data-revealed={visible ? "" : undefined}
      type={type ?? (visible ? "text" : "password")}
      className={cn(className)}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
}
namespace Password_Input {
  export type Props = InputGroup.Input.Props;
}

// password addons --->

function Password_Addon({ ...props }: Password_Addon.Props) {
  return <InputGroup.Addon align="inline-end" {...props} />;
}
namespace Password_Addon {
  export type Props = InputGroup.Addon.Props;
}

// password reveal --->

function Password_Reveal({
  className,
  onClick: onClickProp,
  onBlur: onBlurProp,
  ...props
}: Password_Reveal.Props) {
  const { visible, toggle, hide } = usePass();

  const onClick = useComposeEvent(onClickProp, toggle);
  const onBlur = useComposeEvent(onBlurProp, hide);

  return (
    <InputGroup.Button
      icon
      data-slot="password-reveal"
      data-revealed={visible ? "" : undefined}
      className={cn("relative", className)}
      onClick={onClick}
      onBlur={onBlur}
      {...props}>
      <span className="sr-only">{visible ? "Hide password" : "Show password"}</span>
      <Icons.EyeClose className="transition-all absolute-center icon-visible in-data-revealed:icon-hidden" />
      <Icons.Eye className="transition-all absolute-center icon-hidden in-data-revealed:icon-visible" />
    </InputGroup.Button>
  );
}
namespace Password_Reveal {
  export type Props = Omit<InputGroup.Button.Props, "children" | "className"> & {
    className?: string;
  };
}

// password ruleset --->

function Password_Ruleset({ ruleset, value, className, ...props }: Password_Ruleset.Props) {
  const ctx = usePass();
  const current = value ?? ctx.value;
  const rules = ruleset ?? ctx.ruleset;

  return (
    <ul className={cn("flex flex-col gap-0.5", className)} {...props}>
      {rules.map((r) => {
        const pass = r.rule(current);
        return (
          <li
            key={r.label}
            data-passed={pass ? "" : undefined}
            className="flex items-center gap-1.5 text-sm leading-none">
            <span className="relative flex size-4 items-center justify-center icon:size-3 icon:stroke-2.5">
              <Icons.Check className="text-foreground transition-all absolute-center icon-hidden in-data-passed:icon-visible" />
              <Icons.Close className="text-muted-foreground transition-all absolute-center icon-visible in-data-passed:icon-hidden" />
            </span>
            <span className={pass ? "text-foreground" : "text-muted-foreground"}>{r.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
namespace Password_Ruleset {
  export type Rule = PasswordRule;
  export type Props = React.ComponentProps<"ul"> & {
    ruleset?: PasswordRule[];
    value?: string;
  };
}

// password hover --->

function Password_Hover({ value, ...props }: Password_Hover.Props) {
  const { rootRef } = usePass();

  return (
    <Glance.Root {...props}>
      <Glance.Trigger delay={50} closeDelay={50} render={<InputGroup.Button icon />}>
        <Icons.Alert />
      </Glance.Trigger>
      <Glance.Content anchor={() => rootRef.current}>
        <Password_Ruleset value={value} />
      </Glance.Content>
    </Glance.Root>
  );
}
namespace Password_Hover {
  export type Props = Glance.Root.Props & {
    value?: string;
  };
}

// exports --->

export {
  Password_Addon as Addon,
  Password_Hover as Hover,
  Password_Input as Input,
  Password_Reveal as Reveal,
  Password_Root as Root,
  Password_Ruleset as Ruleset,
};
