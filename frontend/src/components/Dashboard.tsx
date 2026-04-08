import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import API from '../services/api';
import KanbanBoard from './KanbanBoard';
import AddApplicationModal from './AddApplicationModal';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data } = await API.get('/applications');
      return data;
    }
  });

  if (isLoading) return <div className="flex justify-center p-20 text-gray-400">Loading your board...</div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Board</h2>
          <p className="text-gray-400">Manage your job search pipeline</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-500 shadow-lg shadow-purple-900/20"
        >
          <Plus size={20} /> Add Application
        </button>
      </div>

      <KanbanBoard applications={applications || []} />

      {isModalOpen && (
        <AddApplicationModal 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['applications'] });
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
