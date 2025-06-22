import React from 'react';
import Header from '../components/Header';
import PostComposer from '../components/PostComposer';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { TrendingUp, Users, Eye, Plus, Calendar, Bookmark, Star, ArrowRight, Building, MapPin } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { posts } = useData();

  const profileStats = [
    { label: 'Profile viewers', value: '127', icon: Eye, change: '+12%' },
    { label: 'Post impressions', value: '1,847', icon: TrendingUp, change: '+23%' },
    { label: 'Search appearances', value: '89', icon: Users, change: '+5%' },
  ];

  const newsItems = [
    {
      title: 'Tech layoffs continue across industry',
      readers: '12,234 readers',
      time: '2h ago',
      trending: true
    },
    {
      title: 'Remote work policies evolving in 2024',
      readers: '8,987 readers',
      time: '4h ago',
      trending: false
    },
    {
      title: 'AI adoption in workplace grows 300%',
      readers: '21,156 readers',
      time: '6h ago',
      trending: true
    },
    {
      title: 'Startup funding shows resilience',
      readers: '5,543 readers',
      time: '8h ago',
      trending: false
    },
    {
      title: 'Green tech investments surge globally',
      readers: '9,876 readers',
      time: '12h ago',
      trending: true
    }
  ];

  const suggestedConnections = [
    {
      name: 'Jennifer Liu',
      title: 'Senior Product Manager at Meta',
      image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 15
    },
    {
      name: 'Carlos Rodriguez',
      title: 'Data Scientist at Netflix',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 8
    },
    {
      name: 'Priya Sharma',
      title: 'UX Designer at Adobe',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 23
    }
  ];

  const upcomingEvents = [
    {
      title: 'Tech Leaders Summit 2024',
      date: 'Dec 15',
      attendees: '2.3k',
      type: 'Virtual'
    },
    {
      title: 'AI & Machine Learning Workshop',
      date: 'Dec 18',
      attendees: '856',
      type: 'In-person'
    }
  ];

  const featuredJobs = [
    {
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
      applicants: '200+',
      timePosted: '2d ago'
    },
    {
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      applicants: '150+',
      timePosted: '1d ago'
    }
  ];

  return (
    <div className="min-h-screen bg-linkedin-bg-light">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Enhanced Profile Card */}
            <div className="card overflow-hidden">
              {/* Cover Image */}
              <div className="h-16 bg-gradient-to-r from-linkedin-blue via-linkedin-blue-light to-purple-500 relative">
                <img
                  src={user?.profileImage}
                  alt={user?.name}
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-16 w-16 rounded-full border-4 border-white"
                />
              </div>
              
              <div className="pt-8 pb-4 px-4 text-center">
                <h3 className="font-semibold text-linkedin-gray-dark hover:text-linkedin-blue cursor-pointer">
                  {user?.name}
                </h3>
                <p className="text-sm text-linkedin-gray mt-1">{user?.title}</p>
                <p className="text-xs text-linkedin-gray-light mt-1">{user?.location}</p>
                
                <div className="mt-3 pt-3 border-t border-linkedin-border">
                  <div className="flex justify-between text-xs">
                    <span className="text-linkedin-gray">Profile strength</span>
                    <span className="text-linkedin-blue font-medium">Intermediate</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div className="bg-linkedin-blue h-1 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>

              <div className="border-t border-linkedin-border">
                {profileStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center space-x-2">
                      <stat.icon className="h-4 w-4 text-linkedin-gray" />
                      <span className="text-sm text-linkedin-gray">{stat.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-linkedin-blue">{stat.value}</span>
                      <div className="text-xs text-green-600">{stat.change}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-linkedin-border bg-gray-50">
                <button className="w-full text-left text-sm text-linkedin-gray hover:text-linkedin-blue flex items-center justify-between">
                  <span>My items</span>
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card p-4">
              <h3 className="font-semibold text-linkedin-gray-dark mb-3">Recent</h3>
              <div className="space-y-2">
                {[
                  'React Developers Network',
                  'JavaScript Community',
                  'Frontend Developers',
                  'Tech Entrepreneurs',
                  'Product Management'
                ].map((group, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                    <div className="w-2 h-2 bg-linkedin-blue rounded-full"></div>
                    <span className="text-sm text-linkedin-gray">{group}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Groups */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-linkedin-gray-dark">Groups</h3>
                <Plus className="h-4 w-4 text-linkedin-gray cursor-pointer hover:text-linkedin-blue" />
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Tech Professionals', members: '2.1M' },
                  { name: 'Product Managers', members: '890K' },
                  { name: 'Startup Founders', members: '456K' }
                ].map((group, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-linkedin-gray" />
                      <div>
                        <span className="text-sm text-linkedin-gray-dark">{group.name}</span>
                        <div className="text-xs text-linkedin-gray-light">{group.members} members</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-linkedin-gray-dark">Events</h3>
                <Plus className="h-4 w-4 text-linkedin-gray cursor-pointer hover:text-linkedin-blue" />
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 border border-linkedin-border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="text-center">
                        <div className="text-xs text-linkedin-gray-light">DEC</div>
                        <div className="text-lg font-bold text-linkedin-blue">{event.date.split(' ')[1]}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-linkedin-gray-dark">{event.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-linkedin-gray-light">{event.attendees} attending</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{event.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            <PostComposer />
            
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button className="text-sm font-medium text-linkedin-blue border-b-2 border-linkedin-blue pb-1">
                  Recent
                </button>
                <button className="text-sm text-linkedin-gray hover:text-linkedin-blue pb-1">
                  Top
                </button>
              </div>
              <button className="text-sm text-linkedin-gray hover:text-linkedin-blue">
                View all posts
              </button>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* LinkedIn News */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-linkedin-gray-dark">LinkedIn News</h3>
                <button className="text-linkedin-gray hover:text-linkedin-blue">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3">
                {newsItems.map((item, index) => (
                  <div key={index} className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium text-linkedin-gray-dark hover:text-linkedin-blue flex-1">
                        {item.title}
                      </h4>
                      {item.trending && (
                        <TrendingUp className="h-3 w-3 text-green-500 ml-2 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-linkedin-gray-light">{item.time}</span>
                      <span className="text-xs text-linkedin-gray-light">•</span>
                      <span className="text-xs text-linkedin-gray-light">{item.readers}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-3 text-sm text-linkedin-blue hover:underline text-left">
                Show more
              </button>
            </div>

            {/* People You May Know */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-linkedin-gray-dark">People you may know</h3>
                <button className="text-linkedin-blue hover:underline text-sm">
                  View all
                </button>
              </div>
              
              <div className="space-y-3">
                {suggestedConnections.map((person, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-12 h-12 rounded-full border border-linkedin-border"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-linkedin-gray-dark hover:text-linkedin-blue cursor-pointer text-sm">
                        {person.name}
                      </h4>
                      <p className="text-xs text-linkedin-gray mt-1">{person.title}</p>
                      <p className="text-xs text-linkedin-gray-light mt-1">
                        {person.mutualConnections} mutual connections
                      </p>
                      <button className="mt-2 btn-secondary text-xs px-3 py-1">
                        Connect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Jobs */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-linkedin-gray-dark">Jobs for you</h3>
                <ArrowRight className="h-4 w-4 text-linkedin-gray cursor-pointer hover:text-linkedin-blue" />
              </div>
              
              <div className="space-y-3">
                {featuredJobs.map((job, index) => (
                  <div key={index} className="p-3 border border-linkedin-border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start space-x-3">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-10 h-10 rounded-lg border border-linkedin-border"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-linkedin-gray-dark text-sm hover:text-linkedin-blue">
                          {job.title}
                        </h4>
                        <p className="text-xs text-linkedin-gray">{job.company}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <MapPin className="h-3 w-3 text-linkedin-gray-light" />
                          <span className="text-xs text-linkedin-gray-light">{job.location}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-green-600">{job.applicants} applicants</span>
                          <span className="text-xs text-linkedin-gray-light">{job.timePosted}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promoted */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-linkedin-gray-dark">Promoted</h3>
                <button className="text-linkedin-gray hover:text-linkedin-blue">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="border border-linkedin-border rounded-lg p-3 hover:shadow-sm transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">MS</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-linkedin-gray-dark">Microsoft</h4>
                      <p className="text-sm text-linkedin-gray mt-1">
                        Build the future with cutting-edge cloud technology.
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button className="text-sm text-linkedin-blue hover:underline">
                          Follow
                        </button>
                        <span className="text-xs text-linkedin-gray-light">Sponsored</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-linkedin-border rounded-lg p-3 hover:shadow-sm transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">G</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-linkedin-gray-dark">Google</h4>
                      <p className="text-sm text-linkedin-gray mt-1">
                        Organize the world's information and make it universally accessible.
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button className="text-sm text-linkedin-blue hover:underline">
                          Follow
                        </button>
                        <span className="text-xs text-linkedin-gray-light">Sponsored</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-linkedin-gray-light space-y-2 p-4">
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                <a href="#" className="hover:text-linkedin-blue">About</a>
                <a href="#" className="hover:text-linkedin-blue">Accessibility</a>
                <a href="#" className="hover:text-linkedin-blue">Help Center</a>
                <a href="#" className="hover:text-linkedin-blue">Privacy & Terms</a>
                <a href="#" className="hover:text-linkedin-blue">Ad Choices</a>
                <a href="#" className="hover:text-linkedin-blue">Advertising</a>
                <a href="#" className="hover:text-linkedin-blue">Business Services</a>
                <a href="#" className="hover:text-linkedin-blue">Get the LinkedIn app</a>
                <a href="#" className="hover:text-linkedin-blue">More</a>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <span className="font-bold text-linkedin-blue">LinkedIn</span>
                <span>Corporation © 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;