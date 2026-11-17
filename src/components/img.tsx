import { imageLarge, imageSrcSet } from "@/data/images";

interface ImgProps {
  /** Image key, e.g. "lb-1-1" (see src/data/images.ts). */
  k: string;
  /** Alt text in the current language. Empty for decorative images. */
  alt?: string;
  /** CSS sizes hint for picking the 600px or 1400px file. */
  sizes?: string;
  lazy?: boolean;
}

/* eslint-disable @next/next/no-img-element -- static export ships pre-compressed WebP; no image optimizer at runtime */
export function Img({ k, alt = "", sizes = "(max-width: 960px) 50vw, 600px", lazy = false }: ImgProps) {
  return (
    <img
      src={imageLarge(k)}
      srcSet={imageSrcSet(k)}
      sizes={sizes}
      alt={alt}
      loading={lazy ? "lazy" : undefined}
      decoding="async"
    />
  );
}
