import { useMemo } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Award, Briefcase, Activity } from 'lucide-react';

export default function Analytics({ applications }: { applications: any[] }) {
  const metrics = useMemo(() => {
    const total = applications.length;
    const active = applications.filter(a => !['Rejected', 'Offer'].includes(a.status)).length;
    const offers = applications.filter(a => a.status === 'Offer').length;
    const interviews = applications.filter(a => a.status === 'Interview').length;
    const successRate = total > 0 ? Math.round((offers / total) * 100) : 0;
    
    const stageCounts = {
      'Applied': 0,
      'Phone Screen': 0,
      'Interview': 0,
      'Offer': 0,
      'Rejected': 0,
    };
    
    applications.forEach(app => {
      if (stageCounts[app.status as keyof typeof stageCounts] !== undefined) {
        stageCounts[app.status as keyof typeof stageCounts]++;
      }
    });

    const chartData = Object.entries(stageCounts).map(([name, count]) => ({ name, count }));

    return { total, active, offers, interviews, successRate, chartData };
  }, [applications]);

  const colors = {
    'Applied': '#8b5cf6', // purple-500
    'Phone Screen': '#3b82f6', // blue-500
    'Interview': '#f59e0b', // amber-500
    'Offer': '#10b981', // emerald-500
    'Rejected': '#ef4444', // red-500
  };

  return (
    <div className="mb-8 grid gap-4 grid-cols-1 md:grid-cols-4">
      <div className="md:col-span-3 grid gap-4 grid-cols-2 md:grid-cols-4">
        <div className="glass-card rounded-2xl p-5 border border-white/5 bg-zinc-900/40">
          <div className="flex items-center gap-3 text-gray-400 mb-2">
            <Briefcase size={18} className="text-purple-400" />
            <span className="text-sm font-medium">Total Apps</span>
          </div>
          <p className="text-3xl font-bold text-white">{metrics.total}</p>
        </div>
        
        <div className="glass-card rounded-2xl p-5 border border-white/5 bg-zinc-900/40">
          <div className="flex items-center gap-3 text-gray-400 mb-2">
            <Activity size={18} className="text-blue-400" />
            <span className="text-sm font-medium">Active Pipeline</span>
          </div>
          <p className="text-3xl font-bold text-white">{metrics.active}</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/5 bg-zinc-900/40">
          <div className="flex items-center gap-3 text-gray-400 mb-2">
            <Award size={18} className="text-emerald-400" />
            <span className="text-sm font-medium">Offers</span>
          </div>
          <p className="text-3xl font-bold text-white">{metrics.offers}</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/5 bg-zinc-900/40">
          <div className="flex items-center gap-3 text-gray-400 mb-2">
            <TrendingUp size={18} className="text-amber-400" />
            <span className="text-sm font-medium">Offer Rate</span>
          </div>
          <p className="text-3xl font-bold text-white">{metrics.successRate}%</p>
        </div>
      </div>

      <div className="md:col-span-1 glass-card rounded-2xl p-4 border border-white/5 bg-zinc-900/40 h-32 flex flex-col justify-center">
        <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider pl-2">Pipeline Funnel</div>
        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metrics.chartData}>
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {metrics.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[entry.name as keyof typeof colors]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
