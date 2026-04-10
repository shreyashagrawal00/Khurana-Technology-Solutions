import { useDroppable } from '@dnd-kit/core';
import Card from './Card';

interface ColumnProps {
  id: string;
  title: string;
  applications: any[];
  onApplicationClick: (app: any) => void;
}

export default function Column({ id, title, applications, onApplicationClick }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div 
      ref={setNodeRef}
      className="flex min-w-[320px] max-w-[320px] flex-col rounded-2xl bg-zinc-900/50 p-4"
    >
      <div className="mb-4 flex items-center justify-between px-2">
        <h3 className="font-semibold text-gray-300">{title}</h3>
        <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400">
          {applications.length}
        </span>
      </div>
      
      <div className="flex flex-col gap-3">
        {applications.map((app) => (
          <Card key={app._id} application={app} onClick={() => onApplicationClick(app)} />
        ))}
      </div>
    </div>
  );
}
