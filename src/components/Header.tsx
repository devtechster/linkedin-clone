import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Home, 
  Users, 
  Briefcase, 
  MessageCircle, 
  Bell, 
  User,
  ChevronDown,
  LogOut,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { notifications } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read && n.userId === user?.id).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/', active: location.pathname === '/' },
    { icon: Users, label: 'My Network', path: '/network', active: location.pathname === '/network' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs', active: location.pathname === '/jobs' },
    { icon: MessageCircle, label: 'Messaging', path: '/messaging', active: location.pathname === '/messaging' },
    { icon: Bell, label: 'Notifications', path: '/notifications', active: location.pathname === '/notifications', badge: unreadNotifications },
  ];

  return (
    <header className="bg-white border-b border-linkedin-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Search */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex-shrink-0">
              <div className="w-8 h-8 bg-linkedin-blue rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">in</span>
              </div>
            </Link>
            
            <form onSubmit={handleSearch} className="hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-linkedin-gray-light" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-64 pl-10 pr-4 py-2 bg-linkedin-bg-light border-none rounded-lg text-sm placeholder-linkedin-gray-light focus:ring-2 focus:ring-linkedin-blue focus:bg-white"
                />
              </div>
            </form>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center px-3 py-2 rounded-lg text-xs transition-colors relative ${
                  item.active
                    ? 'text-linkedin-blue bg-linkedin-blue/5'
                    : 'text-linkedin-gray hover:text-linkedin-blue hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="hidden sm:block">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`flex flex-col items-center px-3 py-2 rounded-lg text-xs transition-colors ${
                  showProfileMenu
                    ? 'text-linkedin-blue bg-linkedin-blue/5'
                    : 'text-linkedin-gray hover:text-linkedin-blue hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <img
                    src={user?.profileImage}
                    alt={user?.name}
                    className="h-5 w-5 rounded-full border border-linkedin-border mr-1"
                  />
                  <ChevronDown className="h-3 w-3" />
                </div>
                <span className="hidden sm:block">Me</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-linkedin-border py-2 animate-scale-in">
                  <div className="px-4 py-3 border-b border-linkedin-border">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.profileImage}
                        alt={user?.name}
                        className="h-12 w-12 rounded-full border border-linkedin-border"
                      />
                      <div>
                        <p className="font-medium text-linkedin-gray-dark">{user?.name}</p>
                        <p className="text-sm text-linkedin-gray">{user?.title}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    to={`/profile/${user?.id}`}
                    className="flex items-center px-4 py-2 text-sm text-linkedin-gray-dark hover:bg-gray-50"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User className="h-4 w-4 mr-3" />
                    View profile
                  </Link>
                  
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-linkedin-gray-dark hover:bg-gray-50"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings & Privacy
                  </button>
                  
                  <hr className="my-1" />
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-linkedin-gray-dark hover:bg-gray-50"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;