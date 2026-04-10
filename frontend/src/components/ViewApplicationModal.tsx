import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Building2, Calendar, MapPin, Briefcase, Target, Sparkles, FileText, CheckCircle2, Loader2, Copy } from 'lucide-react';
import API from '../services/api';

export default function ViewApplicationModal({ application, onClose }: { application: any, onClose: () => void }) {
  const [isGeneratingCL, setIsGeneratingCL] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);

  if (!application) return null;

  const handleGenerateCoverLetter = async () => {
    try {
      setIsGeneratingCL(true);
      const { data } = await API.post('/applications/generate-cover-letter', {
        company: application.company,
        role: application.role,
        jd: application.notes
      });
      setCoverLetter(data.coverLetter);
    } catch (err) {
      console.error(err);
      alert('Failed to generate cover letter');
    } finally {
      setIsGeneratingCL(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-card w-full max-w-2xl rounded-2xl p-8 max-h-[90vh] overflow-y-auto custom-scrollbar relative"
      >
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-purple-600 shadow-xl shadow-purple-900/30">
            <Building2 size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{application.role || 'Unknown Role'}</h2>
            <p className="text-lg text-purple-400 font-medium">{application.company}</p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                <Calendar size={14} />
                <span>Applied: {new Date(application.dateApplied).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                <Target size={14} />
                <span className="capitalize">{application.status}</span>
              </div>
              {application.parsedData?.location && (
                <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                  <MapPin size={14} />
                  <span>{application.parsedData.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Skills Section */}
          {(application.parsedData?.skills?.length > 0 || application.parsedData?.niceToHave?.length > 0) && (
            <div className="space-y-3 rounded-xl bg-white/5 p-5 border border-white/5">
              <h3 className="flex items-center gap-2 font-semibold text-white">
                <Briefcase size={18} className="text-purple-400" /> 
                Required Profile
              </h3>
              
              {application.parsedData?.skills?.length > 0 && (
                <div>
                  <p className="mb-2 text-xs text-gray-400 uppercase tracking-wider">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {application.parsedData.skills.map((skill: string) => (
                      <span key={skill} className="rounded-lg bg-purple-900/30 border border-purple-500/30 px-3 py-1 text-sm text-purple-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {application.parsedData?.niceToHave?.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs text-gray-400 uppercase tracking-wider">Nice to Have</p>
                  <div className="flex flex-wrap gap-2">
                    {application.parsedData.niceToHave.map((skill: string) => (
                      <span key={skill} className="rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-1 text-sm text-zinc-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* AI Suggestions */}
          {application.aiSuggestions?.length > 0 && (
            <div className="space-y-3 rounded-xl bg-purple-900/10 p-5 border border-purple-500/20">
              <h3 className="flex items-center gap-2 font-semibold text-white">
                <Sparkles size={18} className="text-amber-400" /> 
                AI Resume Suggestions
              </h3>
              <ul className="space-y-2">
                {application.aiSuggestions.map((suggestion: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle2 size={16} className="text-purple-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AI Cover Letter Generator */}
          <div className="space-y-3 rounded-xl bg-indigo-900/10 p-5 border border-indigo-500/20">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-semibold text-white">
                <FileText size={18} className="text-indigo-400" /> 
                AI Cover Letter
              </h3>
              {!coverLetter && (
                <button 
                  onClick={handleGenerateCoverLetter}
                  disabled={isGeneratingCL}
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold transition hover:bg-indigo-500 disabled:opacity-50"
                >
                  {isGeneratingCL ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                  {isGeneratingCL ? 'Generating...' : 'Generate with AI'}
                </button>
              )}
            </div>
            
            {coverLetter && (
              <div className="rounded-lg bg-black/30 p-5 text-sm text-gray-300 whitespace-pre-wrap leading-relaxed border border-white/5 relative group">
                <button 
                  onClick={() => navigator.clipboard.writeText(coverLetter)}
                  className="absolute right-3 top-3 rounded-md bg-white/10 p-2 opacity-0 transition group-hover:opacity-100 hover:bg-white/20"
                  title="Copy to clipboard"
                >
                  <Copy size={16} />
                </button>
                {coverLetter}
              </div>
            )}
          </div>

          {/* User Notes/JD */}
          {application.notes && (
            <div className="space-y-3 rounded-xl bg-white/5 p-5 border border-white/5">
              <h3 className="flex items-center gap-2 font-semibold text-white">
                <FileText size={18} className="text-gray-400" /> 
                Original Job Description
              </h3>
              <div className="rounded-lg bg-black/20 p-4 text-sm text-gray-400 whitespace-pre-wrap max-h-48 overflow-y-auto custom-scrollbar">
                {application.notes}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
