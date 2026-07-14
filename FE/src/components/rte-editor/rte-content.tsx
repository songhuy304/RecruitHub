import { EditorContent } from "@tiptap/react";
import { cn } from "./ui/utils";
import { useRichTextEditorContext } from "./rte-context";
import type { RichTextEditorContentProps } from "./types";

export function Content({ children, className }: RichTextEditorContentProps) {
  const { editor } = useRichTextEditorContext();

  return (
    <div className="relative">
      <EditorContent
        editor={editor}
        className={cn("rte-content w-full bg-transparent dark:bg-input/30", className)}
      />
      {children}
    </div>
  );
}
