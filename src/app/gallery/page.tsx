import { Metadata } from 'next';
import { getGallery, getSiteConfig } from '@/lib/sheets';
import { GalleryView } from './GalleryView';

export const metadata: Metadata = {
  title: 'Gallery & Highlights | Arena 2026',
  description:
    'Memories, action shots, and podium highlights from Arena sports championships at Delhi Technological University.',
};

export default async function GalleryPage() {
  const [galleryItems, config] = await Promise.all([
    getGallery(),
    getSiteConfig(),
  ]);

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase text-blue-950 tracking-tight">
          Photo Gallery
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Capturing the spirit of sportsmanship, grit, and inter-department rivalry at DTU Sports Complex.
        </p>
      </div>

      <GalleryView
        galleryItems={galleryItems}
        driveUrl={config.gallery_drive_url}
      />
    </div>
  );
}
