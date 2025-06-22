import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { MapPin, Briefcase, GraduationCap, Award, Edit3, Plus, MessageCircle, UserPlus } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { userId } = useParams();
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState('');
  const [editData, setEditData] = useState<any>({});

  const isOwnProfile = !userId || userId === user?.id;
  const profileUser = user; // In a real app, fetch user data by userId

  const handleEdit = (section: string) => {
    setIsEditing(section);
    if (section === 'about') {
      setEditData({ about: profileUser?.about || '' });
    }
  };

  const handleSave = () => {
    if (isOwnProfile && user) {
      updateUser(editData);
      setIsEditing('');
      setEditData({});
    }
  };

  const handleCancel = () => {
    setIsEditing('');
    setEditData({});
  };

  if (!profileUser) return null;

  return (
    <div className="min-h-screen bg-linkedin-bg-light">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Header */}
        <div className="card overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-linkedin-blue via-linkedin-blue-light to-linkedin-blue relative">
            <img
              src={profileUser.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 relative">
              <img
                src={profileUser.profileImage}
                alt={profileUser.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white"
              />
              
              <div className="flex-1 mt-4 sm:mt-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-linkedin-gray-dark">{profileUser.name}</h1>
                    <p className="text-xl text-linkedin-gray mt-1">{profileUser.title}</p>
                    <div className="flex items-center text-linkedin-gray-light mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{profileUser.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-4 sm:mt-0">
                    {isOwnProfile ? (
                      <button className="btn-secondary">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit profile
                      </button>
                    ) : (
                      <>
                        <button className="btn-primary">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Connect
                        </button>
                        <button className="btn-secondary">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 mt-4 text-sm text-linkedin-gray">
                  <span>500+ connections</span>
                  <button className="text-linkedin-blue hover:underline">Contact info</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-linkedin-gray-dark">About</h2>
                {isOwnProfile && (
                  <button
                    onClick={() => handleEdit('about')}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Edit3 className="h-4 w-4 text-linkedin-gray" />
                  </button>
                )}
              </div>
              
              {isEditing === 'about' ? (
                <div className="space-y-4">
                  <textarea
                    value={editData.about}
                    onChange={(e) => setEditData({ ...editData, about: e.target.value })}
                    className="w-full p-3 border border-linkedin-border rounded-lg resize-none"
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                  <div className="flex space-x-2">
                    <button onClick={handleSave} className="btn-primary">Save</button>
                    <button onClick={handleCancel} className="btn-ghost">Cancel</button>
                  </div>
                </div>
              ) : (
                <p className="text-linkedin-gray-dark leading-relaxed">
                  {profileUser.about}
                </p>
              )}
            </div>

            {/* Experience Section */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-linkedin-gray-dark">Experience</h2>
                {isOwnProfile && (
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Plus className="h-4 w-4 text-linkedin-gray" />
                  </button>
                )}
              </div>
              
              {profileUser.experience.length > 0 ? (
                <div className="space-y-6">
                  {profileUser.experience.map((exp) => (
                    <div key={exp.id} className="flex space-x-4">
                      <div className="w-12 h-12 bg-linkedin-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-linkedin-gray-dark">{exp.title}</h3>
                        <p className="text-linkedin-gray">{exp.company}</p>
                        <p className="text-sm text-linkedin-gray-light">{exp.duration}</p>
                        <p className="text-sm text-linkedin-gray-dark mt-2">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 text-linkedin-gray-light mx-auto mb-4" />
                  <p className="text-linkedin-gray">No experience added yet</p>
                  {isOwnProfile && (
                    <button className="btn-secondary mt-4">Add experience</button>
                  )}
                </div>
              )}
            </div>

            {/* Education Section */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-linkedin-gray-dark">Education</h2>
                {isOwnProfile && (
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Plus className="h-4 w-4 text-linkedin-gray" />
                  </button>
                )}
              </div>
              
              {profileUser.education.length > 0 ? (
                <div className="space-y-6">
                  {profileUser.education.map((edu) => (
                    <div key={edu.id} className="flex space-x-4">
                      <div className="w-12 h-12 bg-linkedin-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-linkedin-gray-dark">{edu.school}</h3>
                        <p className="text-linkedin-gray">{edu.degree} in {edu.field}</p>
                        <p className="text-sm text-linkedin-gray-light">{edu.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <GraduationCap className="h-12 w-12 text-linkedin-gray-light mx-auto mb-4" />
                  <p className="text-linkedin-gray">No education added yet</p>
                  {isOwnProfile && (
                    <button className="btn-secondary mt-4">Add education</button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-linkedin-gray-dark">Skills</h3>
                {isOwnProfile && (
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Plus className="h-4 w-4 text-linkedin-gray" />
                  </button>
                )}
              </div>
              
              {profileUser.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profileUser.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-linkedin-blue/10 text-linkedin-blue rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Award className="h-8 w-8 text-linkedin-gray-light mx-auto mb-2" />
                  <p className="text-sm text-linkedin-gray">No skills added yet</p>
                  {isOwnProfile && (
                    <button className="btn-secondary mt-3 text-sm">Add skills</button>
                  )}
                </div>
              )}
            </div>

            {/* People Also Viewed */}
            <div className="card p-6">
              <h3 className="font-semibold text-linkedin-gray-dark mb-4">People also viewed</h3>
              <div className="space-y-3">
                {[
                  {
                    name: 'Alex Johnson',
                    title: 'Senior Developer at TechCorp',
                    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
                  },
                  {
                    name: 'Sarah Davis',
                    title: 'Product Designer at Innovation Labs',
                    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
                  },
                  {
                    name: 'Mike Chen',
                    title: 'Marketing Manager at Creative Studio',
                    image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400'
                  }
                ].map((person, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-10 h-10 rounded-full border border-linkedin-border"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-linkedin-gray-dark hover:text-linkedin-blue">
                        {person.name}
                      </h4>
                      <p className="text-xs text-linkedin-gray">{person.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;