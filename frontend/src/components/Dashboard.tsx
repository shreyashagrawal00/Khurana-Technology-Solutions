import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import API from '../services/api';
import KanbanBoard from './KanbanBoard';
import AddApplicationModal from './AddApplicationModal';
import ViewApplicationModal from './ViewApplicationModal';
import Analytics from './Analytics';
import { Plus, Database } from 'lucide-react';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data } = await API.get('/applications');
      return data;
    }
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      await API.delete(`/applications/${id}`);
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      if (selectedApp?._id === id) setSelectedApp(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete application');
    }
  };

  const seedDemoData = async () => {
    const demos = [
      {
        company: 'Google',
        role: 'Software Engineer',
        status: 'Interview',
        dateApplied: new Date().toISOString(),
        notes: 'Frontend role in the Search team.',
        parsedData: { skills: ['React', 'TypeScript', 'System Design'], location: 'Mountain View, CA' }
      },
      {
        company: 'Meta',
        role: 'Frontend Developer',
        status: 'Applied',
        dateApplied: new Date().toISOString(),
        notes: 'Focus on React and performance.',
        parsedData: { skills: ['React', 'GraphQL', 'Tailwind'], location: 'Remote' }
      },
      {
        company: 'Amazon',
        role: 'SDE-II',
        status: 'Phone Screen',
        dateApplied: new Date().toISOString(),
        notes: 'AWS Cloud services team.',
        parsedData: { skills: ['Node.js', 'AWS', 'Java'], location: 'Seattle, WA' }
      },
      {
        company: 'Netflix',
        role: 'Senior UI Engineer',
        status: 'Offer',
        dateApplied: new Date().toISOString(),
        notes: 'Streaming platform optimization project.',
        parsedData: { skills: ['JavaScript', 'React', 'Video Rendering'], location: 'Los Gatos, CA' }
      }
    ];

    try {
      let successCount = 0;
      for (const app of demos) {
        try {
          await API.post('/applications', app);
          successCount++;
        } catch (err) {
          console.error(`Failed to seed ${app.company}:`, err);
        }
      }
      
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      
      if (successCount === demos.length) {
        alert('All demo data seeded successfully!');
      } else if (successCount > 0) {
        alert(`Partially seeded: ${successCount}/${demos.length} applications added. Check console for details.`);
      } else {
        alert('Failed to seed demo data. You might need to sign out and back in.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to seed demo data');
    }
  };

  if (isLoading) return <div className="flex justify-center p-20 text-gray-400">Loading your board...</div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-1">Board</h2>
          <p className="text-gray-400 text-sm">Manage your job search pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={seedDemoData}
            className="flex items-center gap-2 rounded-xl bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10 border border-white/10"
          >
            <Database size={20} className="text-purple-400" /> Seed Demo
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-500 shadow-lg shadow-purple-900/20"
          >
            <Plus size={20} /> Add Application
          </button>
        </div>
      </div>

      <Analytics applications={applications || []} />

      <KanbanBoard 
        applications={applications || []} 
        onApplicationClick={(app: any) => setSelectedApp(app)} 
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <AddApplicationModal 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['applications'] });
            setIsModalOpen(false);
          }}
        />
      )}

      {selectedApp && (
        <ViewApplicationModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onDelete={() => handleDelete(selectedApp._id)}
        />
      )}
    </div>
  );
}
