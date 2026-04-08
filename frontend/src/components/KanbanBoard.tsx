import { DndContext, closestCorners } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import Column from './Column';
import API from '../services/api';
import { useQueryClient } from '@tanstack/react-query';

const STAGES = ['Applied', 'Phone Screen', 'Interview', 'Offer', 'Rejected'];

export default function KanbanBoard({ applications }: { applications: any[] }) {
  const queryClient = useQueryClient();

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const applicationId = active.id as string;
    const newStatus = over.id as string;

    if (!STAGES.includes(newStatus)) return;

    try {
      await API.put(`/applications/${applicationId}`, { status: newStatus });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar">
        {STAGES.map((stage) => (
          <Column 
            key={stage} 
            id={stage} 
            title={stage} 
            applications={applications.filter(app => app.status === stage)} 
          />
        ))}
      </div>
    </DndContext>
  );
}
