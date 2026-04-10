import { useState } from 'react';
import API from '../services/api';
import { motion } from 'framer-motion';
import { X, Sparkles, Loader2, Copy } from 'lucide-react';

export default function AddApplicationModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [jd, setJd] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);

  const handleParse = async () => {
    if (!jd) return;
    setIsParsing(true);
    try {
      const { data } = await API.post('/applications/parse', { jd });
      setParsedData(data);
    } catch (err) {
      alert('AI Parsing failed');
    } finally {
      setIsParsing(false);
    }
  };

  const handleSave = async () => {
    try {
      await API.post('/applications', {
        company: parsedData.companyName || 'Unknown Company',
        role: parsedData.role || 'Unknown Role',
        notes: jd,
        parsedData: {
          skills: parsedData.requiredSkills,
          niceToHave: parsedData.niceToHaveSkills,
          seniority: parsedData.seniority,
          location: parsedData.location
        },
        aiSuggestions: parsedData.threeToFiveResumeBulletPoints
      });
      onSuccess();
    } catch (err) {
      alert('Failed to save application');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-2xl rounded-2xl p-8 max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">New Application</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X /></button>
        </div>

        {!parsedData ? (
          <div className="space-y-4">
            <label className="text-sm text-gray-400">Paste Job Description</label>
            <textarea 
              className="h-64 w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-purple-500"
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the full job description here..."
            />
            <button 
              onClick={handleParse}
              disabled={isParsing || !jd}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 p-4 font-bold transition disabled:opacity-50"
            >
              {isParsing ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
              {isParsing ? 'AI is Parsing...' : 'Parse with AI'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-gray-400">Company</p>
                <p className="font-semibold">{parsedData.companyName || 'Unknown Company'}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-xs text-gray-400">Role</p>
                <p className="font-semibold">{parsedData.role || 'Unknown Role'}</p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-400">AI Resume Suggestions</p>
              <div className="space-y-2">
                {parsedData.threeToFiveResumeBulletPoints?.map((bullet: string, i: number) => (
                  <div key={i} className="group relative rounded-lg bg-purple-900/20 p-3 text-sm border border-purple-500/20">
                    {bullet}
                    <button 
                      onClick={() => navigator.clipboard.writeText(bullet)}
                      className="absolute right-2 top-2 opacity-0 transition group-hover:opacity-100"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setParsedData(null)} className="w-1/2 rounded-xl bg-white/5 p-4 font-bold border border-white/10">Back</button>
              <button onClick={handleSave} className="w-1/2 rounded-xl bg-purple-600 p-4 font-bold">Save Application</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
