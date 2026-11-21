"use client";

import { createContext, use, useMemo } from "react";
import type * as RHF from "react-hook-form";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn, cva } from "@/lib/utils";

// form form context --->

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

type FormFieldContextValue = {
  field: RHF.ControllerRenderProps<any, any>;
  fieldState: RHF.ControllerFieldState;
};

type FormRenderProps<TFieldValues extends RHF.FieldValues = RHF.FieldValues> = {
  field: RHF.ControllerRenderProps<TFieldValues, RHF.FieldPath<TFieldValues>>;
  fieldState: RHF.ControllerFieldState;
};

// form root --->

function Form_Root<V extends RHF.FieldValues = RHF.FieldValues>({
  formContext,
  children,
  ...props
}: Form_Root.Props<V>) {
  return (
    <FormProvider {...formContext}>
      <form {...props}>{children}</form>
    </FormProvider>
  );
}
namespace Form_Root {
  export type Props<V extends RHF.FieldValues = RHF.FieldValues> = React.ComponentProps<"form"> & {
    formContext: RHF.UseFormReturn<V>;
  };
}

// form set --->

function Form_Set({ className, ...props }: Form_Set.Props) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className,
      )}
      {...props}
    />
  );
}
namespace Form_Set {
  export type Props = React.ComponentProps<"fieldset">;
}

// form legend --->

function Form_Legend({ className, variant = "legend", ...props }: Form_Legend.Props) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-2 font-medium data-[variant=label]:text-sm/relaxed data-[variant=legend]:text-sm",
        className,
      )}
      {...props}
    />
  );
}
namespace Form_Legend {
  export type Props = React.ComponentProps<"legend"> & { variant?: "legend" | "label" };
}

// form group --->

function Form_Group({ className, ...props }: Form_Group.Props) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group slot-checkbox-group:gap-3 *:slot-field-group:gap-4 @container/field-group flex w-full flex-col gap-4",
        className,
      )}
      {...props}
    />
  );
}
namespace Form_Group {
  export type Props = React.ComponentProps<"div">;
}

// form variants --->

const formVariants = cva({
  base: "group/field flex w-full gap-2 data-invalid:text-destructive",
  variants: {
    orientation: {
      vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
      horizontal:
        "*:slot-field-label:flex-auto flex-row items-center has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      responsive:
        "@md/field-group:*:slot-field-label:flex-auto flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

// form field --->

function Form_Field({ className, orientation = "vertical", ...props }: Form_Field.Props) {
  const fieldForm = use(FormFieldContext);
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      data-invalid={fieldForm?.fieldState.invalid ? "" : undefined}
      className={cn(formVariants({ orientation }), className)}
      {...props}
    />
  );
}
namespace Form_Field {
  export type Props = React.ComponentProps<"div"> & cva.Props<typeof formVariants>;
}

// form control --->

function Form_Control<TFieldValues extends RHF.FieldValues = RHF.FieldValues>({
  name,
  control: controlProp,
  render,
}: Form_Control.Props<TFieldValues>) {
  const form = useFormContext<TFieldValues>();
  const control = (controlProp ?? form?.control) as RHF.Control<TFieldValues> | undefined;

  if (!control) {
    throw new Error("Form.Control requires a `control` prop or a <FormProvider> ancestor.");
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormFieldContext value={{ field, fieldState }}>
          {render({ field, fieldState })}
        </FormFieldContext>
      )}
    />
  );
}
namespace Form_Control {
  export type Props<TFieldValues extends RHF.FieldValues = RHF.FieldValues> = {
    name: RHF.FieldPath<TFieldValues>;
    control?: RHF.Control<TFieldValues>;
    render: (props: FormRenderProps<TFieldValues>) => React.ReactNode;
  };
}

// form content --->

function Form_Content({ className, ...props }: Form_Content.Props) {
  return (
    <div
      data-slot="field-content"
      className={cn("group/field-content flex flex-1 flex-col gap-0.5 leading-snug", className)}
      {...props}
    />
  );
}
namespace Form_Content {
  export type Props = React.ComponentProps<"div">;
}

// form label --->

function Form_Label({ className, htmlFor, ...props }: Form_Label.Props) {
  const fieldForm = use(FormFieldContext);
  return (
    <Label
      data-slot="field-label"
      htmlFor={htmlFor ?? fieldForm?.field.name}
      className={cn(
        "group/field-label peer/field-label *:slot-field:p-2 flex w-fit gap-2 group-data-[disabled=true]/field:opacity-50 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-input/40 has-[>[data-slot=field]]:has-focus-visible:border-ring has-[>[data-slot=field]]:has-focus-visible:ring-2 has-[>[data-slot=field]]:has-focus-visible:ring-ring/30 dark:has-data-checked:bg-primary/10",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className,
      )}
      {...props}
    />
  );
}
namespace Form_Label {
  export type Props = React.ComponentProps<typeof Label>;
}

// form title --->

function Form_Title({ className, ...props }: Form_Title.Props) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm/relaxed font-medium group-data-[disabled=true]/field:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
namespace Form_Title {
  export type Props = React.ComponentProps<"div">;
}

// form description --->

function Form_Description({ className, ...props }: Form_Description.Props) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-left text-sm/relaxed leading-normal font-normal text-muted-foreground group-has-data-orientation-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className,
      )}
      {...props}
    />
  );
}
namespace Form_Description {
  export type Props = React.ComponentProps<"p">;
}

// form error --->

function Form_Error({ className, children, errors, ...props }: Form_Error.Props) {
  const fieldForm = use(FormFieldContext);
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    const fieldErrors = errors ?? (fieldForm ? [fieldForm.fieldState.error] : undefined);
    if (!fieldErrors?.length) {
      return null;
    }

    const uniqueErrors = [...new Map(fieldErrors.map((error) => [error?.message, error])).values()];

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors, fieldForm]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm/relaxed font-normal text-destructive", className)}
      {...props}>
      {content}
    </div>
  );
}
namespace Form_Error {
  export type Props = React.ComponentProps<"div"> & {
    errors?: Array<{ message?: string } | undefined>;
  };
}

// exports --->

export {
  Form_Content as Content,
  Form_Control as Control,
  Form_Description as Description,
  Form_Error as Error,
  Form_Field as Field,
  Form_Group as Group,
  Form_Label as Label,
  Form_Legend as Legend,
  Form_Root as Root,
  Form_Set as Set,
  Form_Title as Title,
};
