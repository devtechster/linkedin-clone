import React, { useState } from 'react';
import { Heart, MessageCircle, Send, MoreHorizontal, ThumbsUp, BarChart3, FileText, Calendar, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

interface Post {
  id: string;
  userId: string;
  userName: string;
  userTitle: string;
  userImage: string;
  content: string;
  image?: string;
  likes: string[];
  comments: Array<{
    id: string;
    userId: string;
    userName: string;
    userImage: string;
    content: string;
    timestamp: string;
  }>;
  timestamp: string;
  type?: 'text' | 'image' | 'video' | 'article' | 'poll' | 'celebration';
  poll?: {
    question: string;
    options: Array<{ text: string; votes: number }>;
    totalVotes: number;
  };
  article?: {
    title: string;
    excerpt: string;
    readTime: string;
  };
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuth();
  const { likePost, commentPost, votePoll } = useData();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  const isLiked = user ? post.likes.includes(user.id) : false;
  const timeAgo = new Date(post.timestamp).toLocaleDateString();

  const handleLike = () => {
    likePost(post.id);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      commentPost(post.id, commentText);
      setCommentText('');
    }
  };

  const handleVote = (optionIndex: number) => {
    if (!hasVoted && post.poll) {
      votePoll(post.id, optionIndex);
      setHasVoted(true);
    }
  };

  const getPostTypeIcon = () => {
    switch (post.type) {
      case 'celebration':
        return <Award className="h-4 w-4 text-yellow-500" />;
      case 'article':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'poll':
        return <BarChart3 className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getPostTypeLabel = () => {
    switch (post.type) {
      case 'celebration':
        return 'celebrates';
      case 'article':
        return 'shared an article';
      case 'poll':
        return 'created a poll';
      default:
        return 'posted';
    }
  };

  return (
    <div className="card p-0 mb-4 animate-fade-in hover:shadow-md transition-shadow duration-200">
      {/* Post Header */}
      <div className="flex items-start justify-between p-6">
        <div className="flex items-start space-x-3">
          <img
            src={post.userImage}
            alt={post.userName}
            className="h-12 w-12 rounded-full border border-linkedin-border"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-linkedin-gray-dark hover:text-linkedin-blue cursor-pointer">
                {post.userName}
              </h3>
              {getPostTypeIcon()}
            </div>
            <p className="text-sm text-linkedin-gray">{post.userTitle}</p>
            <div className="flex items-center space-x-2 text-xs text-linkedin-gray-light">
              <span>{timeAgo}</span>
              <span>•</span>
              <span>{getPostTypeLabel()}</span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="h-5 w-5 text-linkedin-gray" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-3">
        <p className="text-linkedin-gray-dark leading-relaxed whitespace-pre-line">{post.content}</p>
      </div>

      {/* Article Preview */}
      {post.article && (
        <div className="mx-6 mb-4 border border-linkedin-border rounded-lg overflow-hidden hover:shadow-sm transition-shadow cursor-pointer">
          <div className="p-4">
            <h4 className="font-semibold text-linkedin-gray-dark mb-2">{post.article.title}</h4>
            <p className="text-sm text-linkedin-gray mb-2">{post.article.excerpt}</p>
            <span className="text-xs text-linkedin-gray-light">{post.article.readTime}</span>
          </div>
        </div>
      )}

      {/* Poll */}
      {post.poll && (
        <div className="mx-6 mb-4">
          <h4 className="font-medium text-linkedin-gray-dark mb-3">{post.poll.question}</h4>
          <div className="space-y-2">
            {post.poll.options.map((option, index) => {
              const percentage = post.poll!.totalVotes > 0 ? Math.round((option.votes / post.poll!.totalVotes) * 100) : 0;
              return (
                <button
                  key={index}
                  onClick={() => handleVote(index)}
                  disabled={hasVoted}
                  className={`w-full text-left p-3 border border-linkedin-border rounded-lg transition-all ${
                    hasVoted 
                      ? 'cursor-default' 
                      : 'hover:bg-gray-50 hover:border-linkedin-blue cursor-pointer'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-linkedin-gray-dark">{option.text}</span>
                    {hasVoted && <span className="text-sm text-linkedin-gray">{percentage}%</span>}
                  </div>
                  {hasVoted && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-linkedin-blue h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-linkedin-gray-light mt-2">
            {post.poll.totalVotes} vote{post.poll.totalVotes !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Post Image */}
      {post.image && (
        <div className="px-6 pb-3">
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-lg max-h-96 object-cover hover:opacity-95 transition-opacity cursor-pointer"
          />
        </div>
      )}

      {/* Post Stats */}
      <div className="px-6 py-2 border-t border-linkedin-border">
        <div className="flex items-center justify-between text-sm text-linkedin-gray">
          <div className="flex items-center space-x-2">
            {post.likes.length > 0 && (
              <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-1 bg-linkedin-blue text-white px-2 py-1 rounded-full text-xs">
                  <ThumbsUp className="h-3 w-3" />
                  <span>{post.likes.length}</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {post.comments.length > 0 && (
              <button
                onClick={() => setShowComments(!showComments)}
                className="hover:text-linkedin-blue transition-colors"
              >
                {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
              </button>
            )}
            <span className="text-linkedin-gray-light">2 reposts</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-3 border-t border-linkedin-border">
        <div className="flex items-center justify-around">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 ${
              isLiked ? 'text-linkedin-blue bg-linkedin-blue/5' : 'text-linkedin-gray'
            }`}
          >
            <ThumbsUp className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">Like</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-linkedin-gray transition-all duration-200"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-linkedin-gray transition-all duration-200">
            <Send className="h-5 w-5" />
            <span className="text-sm font-medium">Repost</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-linkedin-gray transition-all duration-200">
            <Send className="h-5 w-5" />
            <span className="text-sm font-medium">Send</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-linkedin-border bg-gray-50">
          {/* Comment Form */}
          <div className="p-4">
            <form onSubmit={handleComment} className="flex items-start space-x-3">
              <img
                src={user?.profileImage}
                alt={user?.name}
                className="h-8 w-8 rounded-full border border-linkedin-border"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-3 py-2 border border-linkedin-border rounded-full text-sm placeholder-linkedin-gray-light focus:border-linkedin-blue focus:ring-1 focus:ring-linkedin-blue bg-white"
                />
              </div>
            </form>
          </div>

          {/* Comments List */}
          {post.comments.map((comment) => (
            <div key={comment.id} className="px-4 pb-3">
              <div className="flex items-start space-x-3">
                <img
                  src={comment.userImage}
                  alt={comment.userName}
                  className="h-8 w-8 rounded-full border border-linkedin-border"
                />
                <div className="flex-1">
                  <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                    <h4 className="text-sm font-medium text-linkedin-gray-dark">
                      {comment.userName}
                    </h4>
                    <p className="text-sm text-linkedin-gray-dark">{comment.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 ml-3">
                    <button className="text-xs text-linkedin-gray hover:text-linkedin-blue transition-colors">
                      Like
                    </button>
                    <button className="text-xs text-linkedin-gray hover:text-linkedin-blue transition-colors">
                      Reply
                    </button>
                    <span className="text-xs text-linkedin-gray-light">
                      {new Date(comment.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;