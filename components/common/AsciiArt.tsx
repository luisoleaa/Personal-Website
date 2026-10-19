import type { Layer } from "@/lib/ascii";

export default function AsciiArt({
  layers,
  fontSize,
  className,
}: {
  layers: Layer[];
  fontSize?: string;
  className?: string;
}) {
  return (
    <div
      className={className ? `ascii ${className}` : "ascii"}
      aria-hidden="true"
      style={fontSize ? { fontSize } : undefined}
    >
      {layers.map((layer) => (
        <span key={layer.className} className={layer.className}>
          {layer.text}
        </span>
      ))}
    </div>
  );
}
