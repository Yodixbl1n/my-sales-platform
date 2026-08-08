'use client';
import { useState } from 'react';

export default function VideoModal({ videoId }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded text-white" onClick={() => setOpen(true)}>
        Смотреть
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-lg overflow-hidden w-[90%] md:w-3/4 max-w-4xl">
            <div className="relative pb-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Видео урок"
                frameBorder="0"
                allowFullScreen
              />
            </div>
            <div className="p-4 text-right">
              <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded" onClick={() => setOpen(false)}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
