import { Loader } from '@/components/ui/loader';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <Loader />
    </div>
  );
}
