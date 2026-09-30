'use client';
/* oxlint-disable next/no-img-element -- The enlarged original is a pre-encoded static WebP, loaded only on demand. */

import { useEffect, useRef, useState } from 'react';
import { Expand, X } from 'lucide-react';
import { assetUrl } from '@/lib/site-url';
import { sakePhotos, suppliedPhotoDimensions } from '@/lib/sake-photos';
import { Photo } from './photo';

export function SakeGallery() {
  const [selected, setSelected] = useState<(typeof sakePhotos)[number] | null>(
    null,
  );
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (selected && !dialog.current?.open) dialog.current?.showModal();
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  return (
    <section
      className="sake-collection section-pad"
      id="sake-collection"
      aria-labelledby="sake-collection-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-label">酒のある風景</p>
          <h2 id="sake-collection-title">
            季節ごとに、<span className="sake-title-phrase">出会う一杯。</span>
          </h2>
        </div>
        <p>
          掲載銘柄は一例です。
          <br />
          季節や仕入れによって変わります。
          <br />
          その日の一杯は、お気軽にお尋ねください。
        </p>
      </div>
      <p className="sake-gallery-hint">
        <Expand size={15} aria-hidden="true" />
        写真を押すと、大きくご覧いただけます。
      </p>
      <div className="sake-grid">
        {sakePhotos.map((photo) => (
          <figure key={photo.name}>
            <a
              href={assetUrl(`/images/${photo.name}.webp`)}
              aria-label={`${photo.label}の写真を拡大`}
              aria-haspopup="dialog"
              onClick={(event) => {
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                if (
                  !dialog.current ||
                  typeof dialog.current.showModal !== 'function'
                )
                  return;
                event.preventDefault();
                setSelected(photo);
              }}
            >
              <Photo
                name={photo.name}
                alt={photo.label}
                sizes="(max-width: 640px) 43vw, (max-width: 1100px) 27vw, 21vw"
              />
              <span className="sake-expand" aria-hidden="true">
                <Expand size={17} />
              </span>
            </a>
            <figcaption>{photo.label}</figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="sake-lightbox"
        aria-labelledby="sake-lightbox-title"
        onClose={() => setSelected(null)}
      >
        <button
          className="sake-lightbox-close"
          type="button"
          aria-label="写真を閉じる"
          onClick={() => dialog.current?.close()}
          autoFocus
        >
          <X size={24} />
        </button>
        {selected && (
          <figure>
            <img
              src={assetUrl(`/images/${selected.name}.webp`)}
              width={suppliedPhotoDimensions[selected.name][0]}
              height={suppliedPhotoDimensions[selected.name][1]}
              alt={selected.label}
            />
            <figcaption id="sake-lightbox-title">{selected.label}</figcaption>
          </figure>
        )}
      </dialog>
    </section>
  );
}
