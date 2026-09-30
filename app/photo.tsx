/* oxlint-disable next/no-img-element -- Static host: pre-encoded WebP sizes are served without an image server. */
import { assetUrl } from '@/lib/site-url';
import { suppliedPhotoDimensions } from '@/lib/sake-photos';

const photoDimensions: Record<string, readonly [number, number]> = {
  hero: [1600, 1067],
  sashimi: [1200, 900],
  aji: [1108, 1477],
  simmered: [1108, 1477],
  fresh: [1108, 1477],
  yakitori: [1108, 1477],
  burger: [1200, 800],
  sake: [900, 608],
  interior: [900, 600],
  counter: [900, 600],
  ...suppliedPhotoDimensions,
};

export function Photo({
  name,
  alt,
  className = '',
  sizes = '(max-width: 640px) 90vw, 45vw',
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [width, height] = photoDimensions[name];
  const sources = [
    `${assetUrl(`/images/${name}-small.webp`)} 600w`,
    ...(suppliedPhotoDimensions[name]
      ? [`${assetUrl(`/images/${name}-medium.webp`)} 1000w`]
      : []),
    `${assetUrl(`/images/${name}.webp`)} ${width}w`,
  ];
  return (
    <img
      className={className}
      src={assetUrl(`/images/${name}.webp`)}
      srcSet={sources.join(', ')}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
