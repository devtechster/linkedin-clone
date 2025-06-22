import React, { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Settings, MoreHorizontal } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const { notifications, markNotificationRead } = useData();
  const [activeTab, setActiveTab] = useState<'all' | 'jobs' | 'posts' | 'mentions'>('all');

  const userNotifications = notifications.filter(n => n.userId === user?.id);

  const filteredNotifications = userNotifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'jobs') return notification.type === 'job';
    if (activeTab === 'posts') return ['like', 'comment'].includes(notification.type);
    if (activeTab === 'mentions') return notification.type === 'mention';
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return '👍';
      case 'comment':
        return '💬';
      case 'connection':
        return '🤝';
      case 'job':
        return '💼';
      case 'message':
        return '📩';
      default:
        return '🔔';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  const handleNotificationClick = (notificationId: string) => {
    markNotificationRead(notificationId);
  };

  return (
    <div className="min-h-screen bg-linkedin-bg-light">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-linkedin-gray-dark">Manage your notifications</h2>
              </div>
              <button className="w-full text-left text-linkedin-blue hover:underline text-sm">
                View settings
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card">
              {/* Header */}
              <div className="p-6 border-b border-linkedin-border">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-linkedin-gray-dark">Notifications</h1>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Settings className="h-5 w-5 text-linkedin-gray" />
                  </button>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-linkedin-border">
                <div className="flex space-x-8 px-6">
                  {[
                    { key: 'all', label: 'All', count: userNotifications.length },
                    { key: 'jobs', label: 'Jobs', count: userNotifications.filter(n => n.type === 'job').length },
                    { key: 'posts', label: 'My posts', count: userNotifications.filter(n => ['like', 'comment'].includes(n.type)).length },
                    { key: 'mentions', label: 'Mentions', count: 0 }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.key
                          ? 'border-linkedin-blue text-linkedin-blue'
                          : 'border-transparent text-linkedin-gray hover:text-linkedin-blue'
                      }`}
                    >
                      {tab.label}
                      {tab.count > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notifications List */}
              <div className="divide-y divide-linkedin-border">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img
                            src={notification.fromUserImage}
                            alt={notification.fromUserName}
                            className="w-12 h-12 rounded-full border border-linkedin-border"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-linkedin-border">
                            <span className="text-sm">
                              {getNotificationIcon(notification.type)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm text-linkedin-gray-dark">
                                <span className="font-medium hover:text-linkedin-blue cursor-pointer">
                                  {notification.fromUserName}
                                </span>{' '}
                                {notification.content}
                              </p>
                              <p className="text-xs text-linkedin-gray-light mt-1">
                                {formatTimeAgo(notification.timestamp)}
                              </p>
                            </div>
                            
                            <div className="flex items-center space-x-2 ml-4">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-linkedin-blue rounded-full"></div>
                              )}
                              <button className="p-1 hover:bg-gray-100 rounded-full">
                                <MoreHorizontal className="h-4 w-4 text-linkedin-gray" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🔔</span>
                    </div>
                    <h3 className="text-lg font-semibold text-linkedin-gray-dark mb-2">
                      No notifications yet
                    </h3>
                    <p className="text-linkedin-gray">
                      When you have notifications, they'll show up here.
                    </p>
                  </div>
                )}
              </div>

              {/* Load More */}
              {filteredNotifications.length > 0 && (
                <div className="p-6 text-center border-t border-linkedin-border">
                  <button className="text-linkedin-blue hover:underline font-medium">
                    Show more notifications
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;