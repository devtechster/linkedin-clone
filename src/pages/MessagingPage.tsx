import React, { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Search, Plus, MoreHorizontal, Send, Paperclip, Smile } from 'lucide-react';

const MessagingPage: React.FC = () => {
  const { user } = useAuth();
  const { messages, sendMessage } = useData();
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock conversation data
  const conversations = [
    {
      id: '1',
      name: 'Maya Mishra',
      title: 'Software Engineer at TechCorp',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      lastMessage: 'Thanks for responding! Looking forward to connecting.',
      timestamp: '9:42 PM',
      unread: true
    },
    {
      id: '2',
      name: 'Mangesh Deshmukh',
      title: 'Product Manager at Innovation Labs',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      lastMessage: 'Hi again, I was curious how shall I apply to the...',
      timestamp: 'Jun 9',
      unread: false
    },
    {
      id: '3',
      name: 'Faizal Cackoowala',
      title: 'UX Designer at Creative Studio',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      lastMessage: 'she havent accepted my request',
      timestamp: 'Jun 9',
      unread: false
    },
    {
      id: '4',
      name: 'Rizwan Mewegar',
      title: 'Marketing Director at BrandCorp',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
      lastMessage: 'this weekend',
      timestamp: 'Jun 6',
      unread: false
    },
    {
      id: '5',
      name: 'Giovanni Cucco',
      title: 'Data Scientist at DataFlow',
      image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400',
      lastMessage: 'I am available at 5PM onwards today, tomorrow...',
      timestamp: 'Jun 5',
      unread: false
    },
    {
      id: '6',
      name: 'Nirav Patel',
      title: 'Frontend Developer at WebSolutions',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      lastMessage: 'Sure',
      timestamp: 'Jun 5',
      unread: false
    }
  ];

  // Mock messages for selected conversation
  const conversationMessages = selectedConversation === '1' ? [
    {
      id: '1',
      senderId: '1',
      senderName: 'Maya Mishra',
      senderImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'Hi! Thanks for your message. I\'m happy to be connected with you. Let\'s keep in touch and grow our professional network.',
      timestamp: '6:01 PM',
      isOwn: false
    },
    {
      id: '2',
      senderId: user?.id || '',
      senderName: user?.name || '',
      senderImage: user?.profileImage || '',
      content: 'Thanks for responding',
      timestamp: '9:41 PM',
      isOwn: true
    },
    {
      id: '3',
      senderId: user?.id || '',
      senderName: user?.name || '',
      senderImage: user?.profileImage || '',
      content: 'Can we connect sometime over a call, I am currently seeking my path as PM and I could use your guidance',
      timestamp: '9:41 PM',
      isOwn: true
    }
  ] : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      sendMessage(selectedConversation, newMessage);
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linkedin-bg-light">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-96">
          {/* Conversations List */}
          <div className="lg:col-span-1 card overflow-hidden">
            <div className="p-4 border-b border-linkedin-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-linkedin-gray-dark">Messaging</h2>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="h-5 w-5 text-linkedin-gray" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Plus className="h-5 w-5 text-linkedin-gray" />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-linkedin-gray-light" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages"
                  className="w-full pl-10 pr-4 py-2 bg-linkedin-bg-light border-none rounded-lg text-sm placeholder-linkedin-gray-light focus:ring-2 focus:ring-linkedin-blue focus:bg-white"
                />
              </div>
            </div>

            <div className="flex space-x-1 p-2 bg-gray-50">
              <button className="flex-1 px-3 py-2 bg-linkedin-blue text-white rounded-lg text-sm font-medium">
                Focused
              </button>
              <button className="flex-1 px-3 py-2 text-linkedin-gray hover:bg-gray-100 rounded-lg text-sm">
                Other
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-linkedin-border cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-linkedin-blue/5' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <img
                        src={conversation.image}
                        alt={conversation.name}
                        className="w-12 h-12 rounded-full border border-linkedin-border"
                      />
                      {conversation.unread && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-linkedin-blue rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium truncate ${
                          conversation.unread ? 'text-linkedin-gray-dark' : 'text-linkedin-gray'
                        }`}>
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-linkedin-gray-light">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-linkedin-gray-light truncate">
                        {conversation.title}
                      </p>
                      <p className={`text-sm truncate mt-1 ${
                        conversation.unread ? 'text-linkedin-gray-dark font-medium' : 'text-linkedin-gray'
                      }`}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 card overflow-hidden flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-linkedin-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={conversations.find(c => c.id === selectedConversation)?.image}
                        alt="User"
                        className="w-10 h-10 rounded-full border border-linkedin-border"
                      />
                      <div>
                        <h3 className="font-semibold text-linkedin-gray-dark">
                          {conversations.find(c => c.id === selectedConversation)?.name}
                        </h3>
                        <p className="text-sm text-linkedin-gray">
                          {conversations.find(c => c.id === selectedConversation)?.title}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreHorizontal className="h-5 w-5 text-linkedin-gray" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="text-center">
                    <p className="text-xs text-linkedin-gray-light">TODAY</p>
                  </div>
                  
                  {conversationMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                        message.isOwn ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <img
                          src={message.senderImage}
                          alt={message.senderName}
                          className="w-8 h-8 rounded-full border border-linkedin-border"
                        />
                        <div className={`px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? 'bg-linkedin-blue text-white'
                            : 'bg-gray-100 text-linkedin-gray-dark'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-blue-100' : 'text-linkedin-gray-light'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-linkedin-border">
                  <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
                          <Paperclip className="h-4 w-4 text-linkedin-gray" />
                        </button>
                        <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
                          <Smile className="h-4 w-4 text-linkedin-gray" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Write a message..."
                        className="w-full px-4 py-2 border border-linkedin-border rounded-full text-sm placeholder-linkedin-gray-light focus:border-linkedin-blue focus:ring-1 focus:ring-linkedin-blue"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="p-2 bg-linkedin-blue text-white rounded-full hover:bg-linkedin-blue-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-linkedin-gray-light mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-linkedin-gray-dark mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-linkedin-gray">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;