import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { useData } from '../context/DataContext';
import { Search, Users, Briefcase, Building, Filter } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { jobs } = useData();
  const [activeTab, setActiveTab] = useState<'people' | 'jobs' | 'companies'>('people');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // Mock search results
  const peopleResults = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Senior Software Engineer at Google',
      location: 'San Francisco, CA',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 12,
      connected: false
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Product Manager at Microsoft',
      location: 'Seattle, WA',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 8,
      connected: true
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      title: 'UX Designer at Adobe',
      location: 'Los Angeles, CA',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 15,
      connected: false
    },
    {
      id: '4',
      name: 'David Kim',
      title: 'Data Scientist at Netflix',
      location: 'Los Gatos, CA',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 6,
      connected: false
    }
  ];

  const companyResults = [
    {
      id: '1',
      name: 'Google',
      industry: 'Technology',
      employees: '100,000+',
      location: 'Mountain View, CA',
      logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
      following: false
    },
    {
      id: '2',
      name: 'Microsoft',
      industry: 'Technology',
      employees: '200,000+',
      location: 'Redmond, WA',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      following: true
    },
    {
      id: '3',
      name: 'Adobe',
      industry: 'Software',
      employees: '25,000+',
      location: 'San Jose, CA',
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      following: false
    }
  ];

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPeople = peopleResults.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompanies = companyResults.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getResultCount = () => {
    switch (activeTab) {
      case 'people':
        return filteredPeople.length;
      case 'jobs':
        return filteredJobs.length;
      case 'companies':
        return filteredCompanies.length;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-linkedin-bg-light">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="card p-4 mb-6">
              <h3 className="font-semibold text-linkedin-gray-dark mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-linkedin-gray-dark mb-2">Location</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-linkedin-gray">San Francisco Bay Area</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-linkedin-gray">New York City</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-linkedin-gray">Seattle</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-linkedin-gray-dark mb-2">Industry</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-linkedin-gray">Technology</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-linkedin-gray">Software</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-linkedin-gray">Design</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-linkedin-gray-dark mb-2">Company Size</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-linkedin-gray">1-10 employees</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-linkedin-gray">11-50 employees</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-linkedin-gray">1000+ employees</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-linkedin-gray-dark mb-2">
                Search results for "{searchQuery}"
              </h1>
              <p className="text-linkedin-gray">
                {getResultCount()} result{getResultCount() !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="flex space-x-8 border-b border-linkedin-border">
                {[
                  { key: 'people', label: 'People', icon: Users, count: filteredPeople.length },
                  { key: 'jobs', label: 'Jobs', icon: Briefcase, count: filteredJobs.length },
                  { key: 'companies', label: 'Companies', icon: Building, count: filteredCompanies.length }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center space-x-2 pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.key
                        ? 'border-linkedin-blue text-linkedin-blue'
                        : 'border-transparent text-linkedin-gray hover:text-linkedin-blue'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                    <span className="bg-gray-200 text-linkedin-gray-dark text-xs px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {activeTab === 'people' && (
                <>
                  {filteredPeople.map((person) => (
                    <div key={person.id} className="card p-6 animate-fade-in">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <img
                            src={person.image}
                            alt={person.name}
                            className="w-16 h-16 rounded-full border border-linkedin-border"
                          />
                          <div>
                            <h3 className="font-semibold text-linkedin-gray-dark hover:text-linkedin-blue cursor-pointer">
                              {person.name}
                            </h3>
                            <p className="text-sm text-linkedin-gray mt-1">{person.title}</p>
                            <p className="text-sm text-linkedin-gray-light mt-1">{person.location}</p>
                            <p className="text-xs text-linkedin-gray-light mt-2">
                              {person.mutualConnections} mutual connections
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {person.connected ? (
                            <button className="btn-ghost">
                              Message
                            </button>
                          ) : (
                            <button className="btn-secondary">
                              Connect
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {activeTab === 'jobs' && (
                <>
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="card p-6 animate-fade-in">
                      <div className="flex items-start space-x-4">
                        <img
                          src={job.companyLogo}
                          alt={job.company}
                          className="w-12 h-12 rounded-lg border border-linkedin-border"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-linkedin-gray-dark hover:text-linkedin-blue cursor-pointer">
                            {job.title}
                          </h3>
                          <p className="text-sm text-linkedin-gray mt-1">{job.company}</p>
                          <p className="text-sm text-linkedin-gray-light mt-1">{job.location}</p>
                          <p className="text-sm text-linkedin-gray-dark mt-2 line-clamp-2">
                            {job.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-3">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              ✓ Actively recruiting
                            </span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              🚀 Easy Apply
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button className="btn-primary text-sm">
                            Easy Apply
                          </button>
                          <button className="btn-ghost text-sm">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {activeTab === 'companies' && (
                <>
                  {filteredCompanies.map((company) => (
                    <div key={company.id} className="card p-6 animate-fade-in">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="w-16 h-16 rounded-lg border border-linkedin-border"
                          />
                          <div>
                            <h3 className="font-semibold text-linkedin-gray-dark hover:text-linkedin-blue cursor-pointer">
                              {company.name}
                            </h3>
                            <p className="text-sm text-linkedin-gray mt-1">{company.industry}</p>
                            <p className="text-sm text-linkedin-gray-light mt-1">
                              {company.employees} employees
                            </p>
                            <p className="text-sm text-linkedin-gray-light mt-1">{company.location}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {company.following ? (
                            <button className="btn-ghost">
                              Following
                            </button>
                          ) : (
                            <button className="btn-secondary">
                              Follow
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {getResultCount() === 0 && (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-linkedin-gray-light mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-linkedin-gray-dark mb-2">
                    No results found
                  </h3>
                  <p className="text-linkedin-gray">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;