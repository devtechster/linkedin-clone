import React, { useState } from 'react';
import { Image, Video, Calendar, FileText, X, BarChart3, Award, Smile } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const PostComposer: React.FC = () => {
  const { user } = useAuth();
  const { createPost } = useData();
  const [isExpanded, setIsExpanded] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [postType, setPostType] = useState<'text' | 'poll' | 'article'>('text');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [pollQuestion, setPollQuestion] = useState('');
  const [articleData, setArticleData] = useState({
    title: '',
    excerpt: '',
    readTime: '5 min read'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postContent.trim()) {
      let pollData = undefined;
      let articleDataToSend = undefined;

      if (postType === 'poll' && pollQuestion.trim() && pollOptions.filter(opt => opt.trim()).length >= 2) {
        pollData = {
          question: pollQuestion,
          options: pollOptions.filter(opt => opt.trim()).map(opt => ({ text: opt, votes: 0 })),
          totalVotes: 0
        };
      }

      if (postType === 'article' && articleData.title.trim()) {
        articleDataToSend = articleData;
      }

      createPost(postContent, selectedImage || undefined, postType, pollData, articleDataToSend);
      setPostContent('');
      setSelectedImage(null);
      setPostType('text');
      setPollOptions(['', '']);
      setPollQuestion('');
      setArticleData({ title: '', excerpt: '', readTime: '5 min read' });
      setIsExpanded(false);
    }
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const sampleImages = [
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  const postTypeOptions = [
    { type: 'text', label: 'Share thoughts', icon: FileText },
    { type: 'poll', label: 'Create poll', icon: BarChart3 },
    { type: 'article', label: 'Write article', icon: FileText }
  ];

  return (
    <div className="card p-4 mb-6 animate-fade-in">
      <div className="flex items-start space-x-3">
        <img
          src={user?.profileImage}
          alt={user?.name}
          className="h-12 w-12 rounded-full border border-linkedin-border"
        />
        <div className="flex-1">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder={
              postType === 'poll' ? 'Ask a question to get insights from your network...' :
              postType === 'article' ? 'Share your expertise with an article...' :
              'Start a post, try writing with AI...'
            }
            className="w-full p-3 border border-linkedin-border rounded-lg resize-none text-linkedin-gray-dark placeholder-linkedin-gray-light focus:border-linkedin-blue focus:ring-1 focus:ring-linkedin-blue transition-all"
            rows={isExpanded ? 4 : 1}
          />

          {/* Post Type Selector */}
          {isExpanded && (
            <div className="mt-3 flex space-x-2">
              {postTypeOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => setPostType(option.type as any)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
                    postType === option.type
                      ? 'bg-linkedin-blue text-white'
                      : 'bg-gray-100 text-linkedin-gray hover:bg-gray-200'
                  }`}
                >
                  <option.icon className="h-4 w-4" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Poll Creator */}
          {isExpanded && postType === 'poll' && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-slide-up">
              <input
                type="text"
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                placeholder="Ask a question..."
                className="w-full p-2 border border-linkedin-border rounded-lg mb-3 focus:border-linkedin-blue focus:ring-1 focus:ring-linkedin-blue"
              />
              <div className="space-y-2">
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updatePollOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 p-2 border border-linkedin-border rounded-lg focus:border-linkedin-blue focus:ring-1 focus:ring-linkedin-blue"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        onClick={() => removePollOption(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {pollOptions.length < 4 && (
                <button
                  onClick={addPollOption}
                  className="mt-2 text-linkedin-blue hover:underline text-sm"
                >
                  + Add option
                </button>
              )}
            </div>
          )}

          {/* Article Creator */}
          {isExpanded && postType === 'article' && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-slide-up">
              <input
                type="text"
                value={articleData.title}
                onChange={(e) => setArticleData({ ...articleData, title: e.target.value })}
                placeholder="Article title..."
                className="w-full p-2 border border-linkedin-border rounded-lg mb-3 focus:border-linkedin-blue focus:ring-1 focus:ring-linkedin-blue font-medium"
              />
              <textarea
                value={articleData.excerpt}
                onChange={(e) => setArticleData({ ...articleData, excerpt: e.target.value })}
                placeholder="Write a brief excerpt..."
                className="w-full p-2 border border-linkedin-border rounded-lg resize-none focus:border-linkedin-blue focus:ring-1 focus:ring-linkedin-blue"
                rows={3}
              />
            </div>
          )}
          
          {selectedImage && (
            <div className="mt-3 relative animate-slide-up">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full max-h-64 object-cover rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {isExpanded && (
            <div className="mt-4 space-y-4 animate-slide-up">
              {/* Image Selection */}
              {postType !== 'poll' && (
                <div>
                  <h4 className="text-sm font-medium text-linkedin-gray-dark mb-2">Add to your post</h4>
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {sampleImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                          selectedImage === image
                            ? 'border-linkedin-blue ring-2 ring-linkedin-blue/20'
                            : 'border-linkedin-border hover:border-linkedin-blue'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Option ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Media Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedImage(sampleImages[0])}
                    className="flex items-center space-x-2 px-3 py-2 text-linkedin-gray hover:text-linkedin-blue hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <Image className="h-5 w-5" />
                    <span className="text-sm font-medium">Photo</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-3 py-2 text-linkedin-gray hover:text-linkedin-blue hover:bg-gray-100 rounded-lg transition-all">
                    <Video className="h-5 w-5" />
                    <span className="text-sm font-medium">Video</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-3 py-2 text-linkedin-gray hover:text-linkedin-blue hover:bg-gray-100 rounded-lg transition-all">
                    <Calendar className="h-5 w-5" />
                    <span className="text-sm font-medium">Event</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-3 py-2 text-linkedin-gray hover:text-linkedin-blue hover:bg-gray-100 rounded-lg transition-all">
                    <Award className="h-5 w-5" />
                    <span className="text-sm font-medium">Celebrate</span>
                  </button>

                  <button className="flex items-center space-x-2 px-3 py-2 text-linkedin-gray hover:text-linkedin-blue hover:bg-gray-100 rounded-lg transition-all">
                    <Smile className="h-5 w-5" />
                    <span className="text-sm font-medium">Feeling</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setIsExpanded(false);
                      setPostContent('');
                      setSelectedImage(null);
                      setPostType('text');
                      setPollOptions(['', '']);
                      setPollQuestion('');
                      setArticleData({ title: '', excerpt: '', readTime: '5 min read' });
                    }}
                    className="px-4 py-2 text-linkedin-gray hover:bg-gray-100 rounded-full transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!postContent.trim() || (postType === 'poll' && (!pollQuestion.trim() || pollOptions.filter(opt => opt.trim()).length < 2))}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostComposer;