import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { Building2, Calendar, Trash2 } from 'lucide-react';

export default function Card({ application, onClick, onDelete }: { application: any, onClick?: () => void, onDelete?: () => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: application._id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`glass-card group cursor-grab active:cursor-grabbing relative overflow-hidden rounded-xl p-4 ${isDragging ? 'z-50 opacity-50' : ''}`}
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-purple-500/50" />
      <div className="flex items-start justify-between">
        <h4 className="font-bold text-white leading-tight">{application.role}</h4>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="ml-2 rounded-lg p-1.5 text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
          title="Delete application"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="mt-3 space-y-2 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Building2 size={14} className="text-purple-400" />
          <span>{application.company}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>{new Date(application.dateApplied).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1">
        {application.parsedData?.skills?.slice(0, 3).map((skill: string) => (
          <span key={skill} className="rounded-md bg-purple-900/40 px-2 py-0.5 text-[10px] text-purple-200">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
