import React, { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Users, UserPlus, X, MessageCircle } from 'lucide-react';

const NetworkPage: React.FC = () => {
  const { user } = useAuth();
  const { sendConnectionRequest, acceptConnectionRequest } = useData();
  const [activeTab, setActiveTab] = useState<'grow' | 'invitations'>('grow');

  const connectionRequests = [
    {
      id: '1',
      name: 'John Smith',
      title: 'Software Engineer at Microsoft',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 12,
      message: 'Hi, I\'d like to add you to my professional network.'
    },
    {
      id: '2',
      name: 'Emily Davis',
      title: 'Product Manager at Google',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 8,
      message: 'Let\'s connect! I noticed we work in similar fields.'
    },
    {
      id: '3',
      name: 'Michael Brown',
      title: 'UX Designer at Adobe',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 5,
      message: 'I\'d love to connect and share design insights.'
    }
  ];

  const suggestedConnections = [
    {
      id: '4',
      name: 'Sarah Wilson',
      title: 'Data Scientist at Amazon',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 15,
      reason: 'Works at Amazon'
    },
    {
      id: '5',
      name: 'David Chen',
      title: 'Marketing Director at Netflix',
      image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 22,
      reason: 'You have 22 mutual connections'
    },
    {
      id: '6',
      name: 'Lisa Rodriguez',
      title: 'Frontend Developer at Spotify',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 7,
      reason: 'Works in Software Development'
    },
    {
      id: '7',
      name: 'James Thompson',
      title: 'DevOps Engineer at Tesla',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 11,
      reason: 'Works in Technology'
    },
    {
      id: '8',
      name: 'Maria Garcia',
      title: 'Product Designer at Airbnb',
      image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 6,
      reason: 'Works in Design'
    },
    {
      id: '9',
      name: 'Robert Kim',
      title: 'Backend Developer at Uber',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutualConnections: 9,
      reason: 'Works in Engineering'
    }
  ];

  const handleConnect = (userId: string) => {
    sendConnectionRequest(userId);
  };

  const handleAccept = (userId: string) => {
    acceptConnectionRequest(userId);
  };

  return (
    <div className="min-h-screen bg-linkedin-bg-light">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-4 mb-6">
              <h2 className="font-semibold text-linkedin-gray-dark mb-4">Manage my network</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-linkedin-gray" />
                    <span className="text-sm text-linkedin-gray-dark">Connections</span>
                  </div>
                  <span className="text-sm font-medium text-linkedin-gray">1,034</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-linkedin-gray" />
                    <span className="text-sm text-linkedin-gray-dark">Contacts</span>
                  </div>
                  <span className="text-sm font-medium text-linkedin-gray">294</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-linkedin-gray" />
                    <span className="text-sm text-linkedin-gray-dark">Following & followers</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-linkedin-gray" />
                    <span className="text-sm text-linkedin-gray-dark">Groups</span>
                  </div>
                  <span className="text-sm font-medium text-linkedin-gray">11</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-linkedin-gray" />
                    <span className="text-sm text-linkedin-gray-dark">Events</span>
                  </div>
                  <span className="text-sm font-medium text-linkedin-gray">6</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-linkedin-gray" />
                    <span className="text-sm text-linkedin-gray-dark">Pages</span>
                  </div>
                  <span className="text-sm font-medium text-linkedin-gray">70</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-linkedin-gray" />
                    <span className="text-sm text-linkedin-gray-dark">Newsletters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="flex space-x-8 border-b border-linkedin-border">
                <button
                  onClick={() => setActiveTab('grow')}
                  className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'grow'
                      ? 'border-linkedin-blue text-linkedin-blue'
                      : 'border-transparent text-linkedin-gray hover:text-linkedin-blue'
                  }`}
                >
                  Grow
                </button>
                <button
                  onClick={() => setActiveTab('invitations')}
                  className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'invitations'
                      ? 'border-linkedin-blue text-linkedin-blue'
                      : 'border-transparent text-linkedin-gray hover:text-linkedin-blue'
                  }`}
                >
                  Invitations ({connectionRequests.length})
                </button>
              </div>
            </div>

            {activeTab === 'invitations' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-linkedin-gray-dark">
                    Invitations ({connectionRequests.length})
                  </h2>
                  <button className="text-linkedin-blue hover:underline">Show all</button>
                </div>

                {connectionRequests.map((request) => (
                  <div key={request.id} className="card p-6 animate-fade-in">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <img
                          src={request.image}
                          alt={request.name}
                          className="w-16 h-16 rounded-full border border-linkedin-border"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-linkedin-gray-dark hover:text-linkedin-blue cursor-pointer">
                            {request.name}
                          </h3>
                          <p className="text-sm text-linkedin-gray mt-1">{request.title}</p>
                          <p className="text-xs text-linkedin-gray-light mt-1">
                            {request.mutualConnections} mutual connections
                          </p>
                          {request.message && (
                            <p className="text-sm text-linkedin-gray-dark mt-2 bg-gray-50 p-3 rounded-lg">
                              "{request.message}"
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 mt-4">
                      <button className="btn-ghost text-linkedin-gray">
                        Ignore
                      </button>
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="btn-primary"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'grow' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-linkedin-gray-dark">
                    People you may know
                  </h2>
                  <button className="text-linkedin-blue hover:underline">Show all</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestedConnections.map((person) => (
                    <div key={person.id} className="card p-6 text-center animate-fade-in">
                      <div className="relative">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-20 h-20 rounded-full mx-auto border border-linkedin-border"
                        />
                        <button className="absolute top-0 right-2 p-1 text-linkedin-gray hover:text-linkedin-gray-dark">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="mt-4">
                        <h3 className="font-semibold text-linkedin-gray-dark hover:text-linkedin-blue cursor-pointer">
                          {person.name}
                        </h3>
                        <p className="text-sm text-linkedin-gray mt-1">{person.title}</p>
                        <p className="text-xs text-linkedin-gray-light mt-2">{person.reason}</p>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <button
                          onClick={() => handleConnect(person.id)}
                          className="flex-1 btn-secondary text-sm"
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          Connect
                        </button>
                        <button className="p-2 border border-linkedin-border rounded-full hover:bg-gray-50">
                          <MessageCircle className="h-4 w-4 text-linkedin-gray" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stay in touch games */}
                <div className="card p-6">
                  <h3 className="font-semibold text-linkedin-gray-dark mb-4">
                    Stay in touch through daily games
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Zip #85', players: '27 connections played', color: 'bg-orange-500' },
                      { name: 'Queens #406', players: '8 connections played', color: 'bg-purple-500' },
                      { name: 'Tango #246', players: '10 connections played', color: 'bg-blue-500' }
                    ].map((game, index) => (
                      <div key={index} className="border border-linkedin-border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${game.color} rounded-lg flex items-center justify-center`}>
                            <span className="text-white font-bold text-sm">
                              {game.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-linkedin-gray-dark">{game.name}</h4>
                            <p className="text-xs text-linkedin-gray-light">{game.players}</p>
                          </div>
                        </div>
                        <button className="w-full mt-3 btn-secondary text-sm">Solve</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;