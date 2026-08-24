import {
  Code,
  File,
  FileImage,
  FileMd,
  FilePdf,
  FileText,
  FolderSimple,
} from "@phosphor-icons/react";
import type { ContentKind } from "../../shared/content";

interface FileIconProps {
  kind: ContentKind;
  size?: number;
  active?: boolean;
}

export function FileIcon({ kind, size = 21, active = false }: FileIconProps) {
  const color = kind === "directory" ? "var(--accent)" : active ? "var(--accent-soft)" : "currentColor";
  if (kind === "directory") return <FolderSimple size={size} color={color} weight="regular" />;
  if (kind === "pdf") return <FilePdf size={size} color={color} weight="regular" />;
  if (kind === "image") return <FileImage size={size} color={color} weight="regular" />;
  if (kind === "markdown") return <FileMd size={size} color={color} weight="regular" />;
  if (kind === "code") return <Code size={size} color={color} weight="regular" />;
  if (kind === "org" || kind === "text") return <FileText size={size} color={color} weight="regular" />;
  return <File size={size} color={color} weight="regular" />;
}
