import type { MediaCredit } from "@/lib/media-credits";
import { creditLine } from "@/lib/media-credits";

/**
 * A found photograph, credited where it is used. These are pictures of the
 * world around the product, never of the product itself.
 */
export function CreditedPhoto({
  alt,
  className,
  credit,
  eager = false,
  height,
  imageClassName,
  src,
  width,
}: {
  alt: string;
  className?: string;
  credit: MediaCredit;
  eager?: boolean;
  height: number;
  imageClassName?: string;
  src: string;
  width: number;
}) {
  return (
    <figure className={className}>
      <img
        alt={alt}
        className={imageClassName ?? "h-full w-full object-cover"}
        decoding="async"
        height={height}
        loading={eager ? "eager" : "lazy"}
        src={src}
        width={width}
      />
      <figcaption className="mt-2 text-small text-muted-foreground">
        {creditLine(credit)}.{" "}
        <a
          className="underline underline-offset-4 hover:text-foreground"
          href={credit.source}
          rel="noreferrer noopener"
          target="_blank"
        >
          Source
        </a>
      </figcaption>
    </figure>
  );
}
