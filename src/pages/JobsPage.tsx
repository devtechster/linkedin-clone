import React, { useState } from 'react';
import Header from '../components/Header';
import { useData } from '../context/DataContext';
import { MapPin, Clock, Users, Bookmark, X, Building, DollarSign, ExternalLink } from 'lucide-react';

const JobsPage: React.FC = () => {
  const { jobs, applyToJob } = useData();
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resume: null
  });

  const handleApply = () => {
    if (selectedJob) {
      applyToJob(selectedJob.id);
      setShowApplicationModal(false);
      setApplicationData({ coverLetter: '', resume: null });
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-linkedin-bg-light">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-4 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  placeholder="Title, skill or company"
                  className="flex-1 input-field text-sm"
                />
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  placeholder="Location"
                  className="flex-1 input-field text-sm"
                />
              </div>
              <button className="w-full btn-primary text-sm">Search</button>
            </div>

            <div className="card p-4 mb-6">
              <h3 className="font-semibold text-linkedin-gray-dark mb-4">Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <span className="text-sm text-linkedin-gray-dark">My jobs</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <span className="text-sm text-linkedin-gray-dark">My Career Insights</span>
                </div>
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-linkedin-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PJ</span>
                </div>
                <div>
                  <h4 className="font-medium text-linkedin-gray-dark">Post a free job</h4>
                </div>
              </div>
              <button className="w-full btn-secondary text-sm">Get started</button>
            </div>
          </div>

          {/* Job List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-4 border-b border-linkedin-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-linkedin-gray-dark">
                    Top job picks for you
                  </h2>
                  <button className="text-linkedin-blue hover:underline text-sm">
                    Show all →
                  </button>
                </div>
                <p className="text-sm text-linkedin-gray mt-1">
                  Based on your profile, preferences, and activity like applies, searches, and saves
                </p>
              </div>

              <div className="divide-y divide-linkedin-border max-h-96 overflow-y-auto">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedJob?.id === job.id ? 'bg-linkedin-blue/5 border-r-2 border-linkedin-blue' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-12 h-12 rounded-lg border border-linkedin-border"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-linkedin-gray-dark hover:text-linkedin-blue truncate">
                          {job.title}
                        </h3>
                        <p className="text-sm text-linkedin-gray">{job.company}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-linkedin-gray-light">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimeAgo(job.timestamp)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            ✓ Actively recruiting
                          </span>
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            🚀 Easy Apply
                          </span>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Bookmark className="h-4 w-4 text-linkedin-gray" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="lg:col-span-1">
            {selectedJob && (
              <div className="card">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={selectedJob.companyLogo}
                        alt={selectedJob.company}
                        className="w-12 h-12 rounded-lg border border-linkedin-border"
                      />
                      <div>
                        <h2 className="font-bold text-linkedin-gray-dark text-lg">
                          {selectedJob.title}
                        </h2>
                        <p className="text-linkedin-gray">{selectedJob.company}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-linkedin-gray-light">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{selectedJob.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatTimeAgo(selectedJob.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Bookmark className="h-5 w-5 text-linkedin-gray" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-linkedin-gray" />
                        <span className="text-linkedin-gray">{selectedJob.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-linkedin-gray" />
                        <span className="text-linkedin-gray">{selectedJob.salary}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        ✓ Actively recruiting
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        🚀 Easy Apply
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <button 
                      onClick={() => setShowApplicationModal(true)}
                      className="w-full btn-primary"
                    >
                      Easy Apply
                    </button>
                    <button className="w-full btn-secondary">
                      Save job
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-linkedin-gray-dark mb-2">About the job</h3>
                      <p className="text-sm text-linkedin-gray-dark leading-relaxed">
                        {selectedJob.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-linkedin-gray-dark mb-2">Requirements</h3>
                      <ul className="space-y-1">
                        {selectedJob.requirements.map((req, index) => (
                          <li key={index} className="text-sm text-linkedin-gray-dark flex items-start">
                            <span className="text-linkedin-blue mr-2">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-linkedin-gray">
                      <Users className="h-4 w-4" />
                      <span>{selectedJob.applicants.length} applicants</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-y-auto animate-scale-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-linkedin-gray-dark">
                  Apply to {selectedJob?.company}
                </h2>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-linkedin-gray-dark mb-2">
                    {selectedJob?.title}
                  </h3>
                  <p className="text-sm text-linkedin-gray">{selectedJob?.company}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-linkedin-gray-dark mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData({
                      ...applicationData,
                      coverLetter: e.target.value
                    })}
                    className="w-full p-3 border border-linkedin-border rounded-lg resize-none"
                    rows={4}
                    placeholder="Why are you interested in this role?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-linkedin-gray-dark mb-2">
                    Resume
                  </label>
                  <div className="border-2 border-dashed border-linkedin-border rounded-lg p-6 text-center">
                    <p className="text-sm text-linkedin-gray">
                      Your current resume will be submitted
                    </p>
                    <button className="text-linkedin-blue hover:underline text-sm mt-1">
                      Upload a different resume
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-linkedin-gray">
                    By clicking "Submit application", you agree to LinkedIn's Terms of Service and acknowledge that your information will be shared with {selectedJob?.company}.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowApplicationModal(false)}
                    className="flex-1 btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApply}
                    className="flex-1 btn-primary"
                  >
                    Submit application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;