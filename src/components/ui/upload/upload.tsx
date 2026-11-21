"use client";

import { useState } from "react";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

// upload --->

function Upload({
  className,
  accept,
  multiple,
  disabled,
  onChange,
  children,
  ...props
}: Upload.Props) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (list: FileList | null) => {
    const next = list ? Array.from(list) : [];
    setFiles(next);
    onChange?.(next);
  };

  return (
    <div data-slot="upload" className={cn("flex flex-col gap-2", className)}>
      <label
        data-slot="upload-dropzone"
        data-dragging={dragging ? "" : undefined}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-input/20 px-4 py-8 text-center text-sm transition-colors",
          "focus-within:highlight hover:border-foreground/30",
          dragging && "border-primary bg-primary/5",
          disabled && "pointer-events-none opacity-50",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) handleFiles(e.dataTransfer.files);
        }}>
        <input
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          {...props}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
        {children ?? (
          <>
            <Icons.Upload className="size-6 text-muted-foreground" />
            <div className="font-medium">Drag & drop files here</div>
            <div className="text-muted-foreground">or click to browse</div>
          </>
        )}
      </label>
      {files.length > 0 && (
        <ul data-slot="upload-list" className="flex flex-col gap-1 text-sm">
          {files.map((file) => (
            <li key={`${file.name}-${file.size}`} className="truncate text-muted-foreground">
              {file.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
namespace Upload {
  export type Props = Omit<React.ComponentProps<"input">, "type" | "onChange" | "className"> & {
    onChange?: (files: File[]) => void;
    className?: string;
    children?: React.ReactNode;
  };
}

// exports --->

export { Upload };
