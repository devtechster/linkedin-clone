import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

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

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary: string;
  companyLogo: string;
  applicants: string[];
  timestamp: string;
  featured?: boolean;
  remote?: boolean;
  urgent?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'connection' | 'job' | 'message' | 'mention' | 'birthday' | 'work_anniversary';
  fromUserId: string;
  fromUserName: string;
  fromUserImage: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface DataContextType {
  posts: Post[];
  jobs: Job[];
  messages: Message[];
  notifications: Notification[];
  createPost: (content: string, image?: string, type?: string, poll?: any, article?: any) => void;
  likePost: (postId: string) => void;
  commentPost: (postId: string, content: string) => void;
  sendMessage: (receiverId: string, content: string) => void;
  markNotificationRead: (notificationId: string) => void;
  sendConnectionRequest: (userId: string) => void;
  acceptConnectionRequest: (userId: string) => void;
  applyToJob: (jobId: string) => void;
  votePoll: (postId: string, optionIndex: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Enhanced sample posts with more variety
    const samplePosts: Post[] = [
      {
        id: '1',
        userId: 'sample1',
        userName: 'Sarah Johnson',
        userTitle: 'Software Engineer at Google',
        userImage: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: '🎉 Excited to share that I just completed my first full-stack project using React and Node.js! The learning journey has been incredible, and I\'m grateful for all the support from the developer community. Special thanks to my mentor Alex Chen for the guidance. What\'s your favorite tech stack for full-stack development? #WebDevelopment #ReactJS #NodeJS #TechCommunity',
        image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
        likes: ['user1', 'user2', 'user3'],
        comments: [
          {
            id: 'c1',
            userId: 'user2',
            userName: 'Alex Chen',
            userImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
            content: 'Congratulations Sarah! Your dedication really paid off. Keep up the great work! 👏',
            timestamp: new Date(Date.now() - 1800000).toISOString()
          }
        ],
        timestamp: new Date().toISOString(),
        type: 'celebration'
      },
      {
        id: '2',
        userId: 'sample2',
        userName: 'Michael Chen',
        userTitle: 'Product Manager at Microsoft',
        userImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: 'Just attended an amazing conference on AI and Machine Learning. The future of technology is here, and it\'s more exciting than ever! 🚀\n\nKey takeaways:\n• AI will augment human capabilities, not replace them\n• Ethical AI development is crucial for sustainable growth\n• The potential applications are limitless across industries\n• Collaboration between humans and AI is the key to success\n\nWhat are your thoughts on the future of AI in the workplace? #AI #MachineLearning #TechConference #Innovation #FutureOfWork',
        likes: ['user3', 'user4', 'user5', 'user6'],
        comments: [
          {
            id: 'c2',
            userId: 'user3',
            userName: 'Emily Rodriguez',
            userImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
            content: 'Great insights Michael! I completely agree about the collaboration aspect. AI tools have already transformed how I approach UX research.',
            timestamp: new Date(Date.now() - 2700000).toISOString()
          }
        ],
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'text'
      },
      {
        id: '3',
        userId: 'sample3',
        userName: 'Emily Rodriguez',
        userTitle: 'UX Designer at Adobe',
        userImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: 'Design thinking isn\'t just about pretty interfaces - it\'s about solving real human problems. 💡\n\nToday I helped a local nonprofit redesign their donation process, resulting in a 40% increase in successful donations. This is why I love what I do!\n\nThe key was understanding the user journey and removing friction points. Sometimes the smallest changes make the biggest impact.\n\n#UXDesign #DesignThinking #SocialImpact #UserExperience #NonProfit',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        likes: ['user1', 'user2', 'user4', 'user7', 'user8'],
        comments: [],
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        type: 'image'
      },
      {
        id: '4',
        userId: 'sample4',
        userName: 'David Kim',
        userTitle: 'Data Scientist at Netflix',
        userImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: 'Quick poll for my network: What\'s the most important skill for data scientists in 2024? 📊',
        likes: ['user2', 'user5'],
        comments: [],
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        type: 'poll',
        poll: {
          question: 'What\'s the most important skill for data scientists in 2024?',
          options: [
            { text: 'Machine Learning & AI', votes: 45 },
            { text: 'Data Visualization', votes: 23 },
            { text: 'Business Communication', votes: 67 },
            { text: 'Cloud Computing', votes: 31 }
          ],
          totalVotes: 166
        }
      },
      {
        id: '5',
        userId: 'sample5',
        userName: 'Lisa Wang',
        userTitle: 'Marketing Director at Spotify',
        userImage: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: 'Just published a new article on the future of digital marketing! 📝\n\nDive deep into how personalization and AI are reshaping customer experiences. Would love to hear your thoughts and experiences in the comments!',
        likes: ['user1', 'user3', 'user6', 'user9'],
        comments: [
          {
            id: 'c3',
            userId: 'user6',
            userName: 'James Wilson',
            userImage: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
            content: 'Excellent article Lisa! The section on predictive analytics was particularly insightful.',
            timestamp: new Date(Date.now() - 5400000).toISOString()
          }
        ],
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        type: 'article',
        article: {
          title: 'The Future of Digital Marketing: Personalization at Scale',
          excerpt: 'Exploring how AI and machine learning are revolutionizing customer experiences and marketing strategies in the digital age...',
          readTime: '5 min read'
        }
      },
      {
        id: '6',
        userId: 'sample6',
        userName: 'Robert Thompson',
        userTitle: 'DevOps Engineer at Tesla',
        userImage: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: '🔧 Just implemented a new CI/CD pipeline that reduced our deployment time by 75%! \n\nKey improvements:\n✅ Automated testing at every stage\n✅ Parallel processing for faster builds\n✅ Blue-green deployment strategy\n✅ Real-time monitoring and rollback capabilities\n\nThe team is thrilled with the results. DevOps is all about continuous improvement! #DevOps #CICD #Automation #Tesla #Engineering',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        likes: ['user2', 'user4', 'user7', 'user10'],
        comments: [],
        timestamp: new Date(Date.now() - 18000000).toISOString(),
        type: 'image'
      },
      {
        id: '7',
        userId: 'sample7',
        userName: 'Maria Garcia',
        userTitle: 'Product Designer at Airbnb',
        userImage: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: '🎨 Sharing some insights from our latest user research study at Airbnb!\n\nWe discovered that 78% of users make booking decisions within the first 30 seconds of viewing a listing. This reinforced the importance of:\n\n• High-quality hero images\n• Clear, scannable information hierarchy\n• Trust signals above the fold\n• Mobile-first design approach\n\nUser research continues to be the foundation of great design decisions. What\'s your favorite research method? #ProductDesign #UserResearch #Airbnb #UX',
        likes: ['user1', 'user3', 'user5', 'user8', 'user11'],
        comments: [
          {
            id: 'c4',
            userId: 'user3',
            userName: 'Emily Rodriguez',
            userImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
            content: 'Love this Maria! User interviews combined with analytics data always give me the best insights.',
            timestamp: new Date(Date.now() - 21600000).toISOString()
          }
        ],
        timestamp: new Date(Date.now() - 21600000).toISOString(),
        type: 'text'
      },
      {
        id: '8',
        userId: 'sample8',
        userName: 'Alex Johnson',
        userTitle: 'Startup Founder & CEO at TechFlow',
        userImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: '🚀 Exciting news! TechFlow just closed our Series A funding round!\n\n$12M to accelerate our mission of democratizing data analytics for small businesses. Huge thanks to our investors, team, and early customers who believed in our vision.\n\nThis journey started in a garage 2 years ago, and now we\'re serving 10,000+ businesses worldwide. The entrepreneurial path isn\'t easy, but it\'s incredibly rewarding.\n\nTo fellow founders: keep pushing, stay focused on your customers, and never give up! 💪\n\n#Startup #Funding #Entrepreneurship #DataAnalytics #TechFlow',
        image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
        likes: ['user2', 'user4', 'user6', 'user9', 'user12', 'user13'],
        comments: [
          {
            id: 'c5',
            userId: 'user2',
            userName: 'Michael Chen',
            userImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
            content: 'Congratulations Alex! Well deserved. Your product has been a game-changer for our analytics team.',
            timestamp: new Date(Date.now() - 25200000).toISOString()
          }
        ],
        timestamp: new Date(Date.now() - 25200000).toISOString(),
        type: 'celebration'
      }
    ];

    // Enhanced job listings with more variety
    const sampleJobs: Job[] = [
      {
        id: '1',
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        description: 'We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building the next generation of web applications using modern frameworks like React, Vue, or Angular. Work with a passionate team on cutting-edge projects that impact millions of users.',
        requirements: ['5+ years of frontend development experience', 'Expert knowledge of JavaScript, HTML, CSS', 'Experience with React or Vue.js', 'Knowledge of responsive design principles', 'Experience with TypeScript', 'Familiarity with testing frameworks'],
        salary: '$120,000 - $160,000',
        companyLogo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
        applicants: ['user1', 'user2'],
        timestamp: new Date().toISOString(),
        featured: true,
        remote: true
      },
      {
        id: '2',
        title: 'Product Manager',
        company: 'Innovation Labs',
        location: 'New York, NY',
        type: 'Full-time',
        description: 'Join our product team to drive the development of cutting-edge software solutions. You will work closely with engineering, design, and business teams to deliver exceptional user experiences. Lead product strategy and roadmap for our flagship products.',
        requirements: ['3+ years of product management experience', 'Strong analytical and problem-solving skills', 'Experience with agile development methodologies', 'Excellent communication skills', 'Data-driven decision making', 'Experience with user research'],
        salary: '$110,000 - $140,000',
        companyLogo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
        applicants: ['user3'],
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        featured: false,
        remote: false
      },
      {
        id: '3',
        title: 'UX/UI Designer',
        company: 'Creative Studio',
        location: 'Los Angeles, CA',
        type: 'Contract',
        description: 'We\'re seeking a talented UX/UI Designer to help create intuitive and beautiful user interfaces for our clients\' digital products. Work on diverse projects across various industries.',
        requirements: ['4+ years of UX/UI design experience', 'Proficiency in Figma, Sketch, or Adobe XD', 'Strong portfolio showcasing design process', 'Understanding of user-centered design principles', 'Experience with prototyping', 'Knowledge of accessibility standards'],
        salary: '$80,000 - $100,000',
        companyLogo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
        applicants: [],
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        featured: false,
        remote: true
      },
      {
        id: '4',
        title: 'Data Scientist',
        company: 'DataFlow Analytics',
        location: 'Seattle, WA',
        type: 'Full-time',
        description: 'Join our data science team to build machine learning models and extract insights from large datasets. Work on challenging problems in recommendation systems, predictive analytics, and business intelligence.',
        requirements: ['PhD or Masters in Data Science, Statistics, or related field', 'Experience with Python, R, and SQL', 'Knowledge of machine learning algorithms', 'Experience with cloud platforms (AWS, GCP)', 'Strong statistical analysis skills'],
        salary: '$130,000 - $170,000',
        companyLogo: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
        applicants: ['user4', 'user5'],
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        featured: true,
        remote: true,
        urgent: true
      },
      {
        id: '5',
        title: 'DevOps Engineer',
        company: 'CloudTech Solutions',
        location: 'Austin, TX',
        type: 'Full-time',
        description: 'Help us scale our infrastructure and improve deployment processes. Work with cutting-edge cloud technologies and automation tools to support our growing platform.',
        requirements: ['3+ years of DevOps experience', 'Experience with Docker and Kubernetes', 'Knowledge of CI/CD pipelines', 'Cloud platform experience (AWS, Azure)', 'Infrastructure as Code (Terraform, CloudFormation)'],
        salary: '$115,000 - $145,000',
        companyLogo: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400',
        applicants: ['user6'],
        timestamp: new Date(Date.now() - 345600000).toISOString(),
        featured: false,
        remote: true
      },
      {
        id: '6',
        title: 'Mobile App Developer',
        company: 'AppVenture',
        location: 'Miami, FL',
        type: 'Full-time',
        description: 'Build amazing mobile experiences for iOS and Android platforms. Work on consumer-facing apps with millions of downloads and help shape the future of mobile technology.',
        requirements: ['4+ years of mobile development experience', 'Proficiency in Swift/Kotlin or React Native', 'Experience with mobile app architecture', 'Knowledge of app store optimization', 'Understanding of mobile UI/UX principles'],
        salary: '$105,000 - $135,000',
        companyLogo: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=400',
        applicants: [],
        timestamp: new Date(Date.now() - 432000000).toISOString(),
        featured: false,
        remote: false
      }
    ];

    // Enhanced notifications
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        userId: user?.id || 'current-user',
        type: 'like',
        fromUserId: 'user1',
        fromUserName: 'Sarah Johnson',
        fromUserImage: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: 'liked your post about web development trends',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        read: false
      },
      {
        id: '2',
        userId: user?.id || 'current-user',
        type: 'comment',
        fromUserId: 'user2',
        fromUserName: 'Michael Chen',
        fromUserImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: 'commented on your post: "Great insights! I completely agree with your perspective on AI."',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false
      },
      {
        id: '3',
        userId: user?.id || 'current-user',
        type: 'connection',
        fromUserId: 'user3',
        fromUserName: 'Emily Rodriguez',
        fromUserImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: 'accepted your connection request',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: false
      },
      {
        id: '4',
        userId: user?.id || 'current-user',
        type: 'birthday',
        fromUserId: 'user4',
        fromUserName: 'David Kim',
        fromUserImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: 'has a birthday today',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        read: true
      },
      {
        id: '5',
        userId: user?.id || 'current-user',
        type: 'work_anniversary',
        fromUserId: 'user5',
        fromUserName: 'Lisa Wang',
        fromUserImage: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: 'is celebrating 3 years at Spotify',
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        read: true
      }
    ];

    setPosts(samplePosts);
    setJobs(sampleJobs);
    setNotifications(sampleNotifications);
  }, [user]);

  const createPost = (content: string, image?: string, type: string = 'text', poll?: any, article?: any) => {
    if (!user) return;

    const newPost: Post = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userTitle: user.title,
      userImage: user.profileImage,
      content,
      image,
      likes: [],
      comments: [],
      timestamp: new Date().toISOString(),
      type: type as any,
      poll,
      article
    };

    setPosts(prev => [newPost, ...prev]);
  };

  const likePost = (postId: string) => {
    if (!user) return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const likes = post.likes.includes(user.id)
          ? post.likes.filter(id => id !== user.id)
          : [...post.likes, user.id];
        
        // Create notification for post owner
        if (!post.likes.includes(user.id) && post.userId !== user.id) {
          const notification: Notification = {
            id: Date.now().toString(),
            userId: post.userId,
            type: 'like',
            fromUserId: user.id,
            fromUserName: user.name,
            fromUserImage: user.profileImage,
            content: `liked your post`,
            timestamp: new Date().toISOString(),
            read: false
          };
          setNotifications(prev => [notification, ...prev]);
        }

        return { ...post, likes };
      }
      return post;
    }));
  };

  const commentPost = (postId: string, content: string) => {
    if (!user) return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now().toString(),
          userId: user.id,
          userName: user.name,
          userImage: user.profileImage,
          content,
          timestamp: new Date().toISOString()
        };

        // Create notification for post owner
        if (post.userId !== user.id) {
          const notification: Notification = {
            id: Date.now().toString(),
            userId: post.userId,
            type: 'comment',
            fromUserId: user.id,
            fromUserName: user.name,
            fromUserImage: user.profileImage,
            content: `commented on your post: "${content}"`,
            timestamp: new Date().toISOString(),
            read: false
          };
          setNotifications(prev => [notification, ...prev]);
        }

        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
  };

  const votePoll = (postId: string, optionIndex: number) => {
    if (!user) return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId && post.poll) {
        const updatedOptions = post.poll.options.map((option, index) => 
          index === optionIndex 
            ? { ...option, votes: option.votes + 1 }
            : option
        );
        
        return {
          ...post,
          poll: {
            ...post.poll,
            options: updatedOptions,
            totalVotes: post.poll.totalVotes + 1
          }
        };
      }
      return post;
    }));
  };

  const sendMessage = (receiverId: string, content: string) => {
    if (!user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages(prev => [...prev, newMessage]);

    // Create notification for receiver
    const notification: Notification = {
      id: Date.now().toString(),
      userId: receiverId,
      type: 'message',
      fromUserId: user.id,
      fromUserName: user.name,
      fromUserImage: user.profileImage,
      content: `sent you a message: "${content}"`,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const sendConnectionRequest = (userId: string) => {
    if (!user) return;

    // Add to connection requests
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const targetUserIndex = users.findIndex((u: any) => u.id === userId);
    if (targetUserIndex !== -1) {
      if (!users[targetUserIndex].connectionRequests) {
        users[targetUserIndex].connectionRequests = [];
      }
      users[targetUserIndex].connectionRequests.push(user.id);
      localStorage.setItem('users', JSON.stringify(users));

      // Create notification
      const notification: Notification = {
        id: Date.now().toString(),
        userId,
        type: 'connection',
        fromUserId: user.id,
        fromUserName: user.name,
        fromUserImage: user.profileImage,
        content: `sent you a connection request`,
        timestamp: new Date().toISOString(),
        read: false
      };
      setNotifications(prev => [notification, ...prev]);
    }
  };

  const acceptConnectionRequest = (userId: string) => {
    if (!user) return;

    // Add to connections for both users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUserIndex = users.findIndex((u: any) => u.id === user.id);
    const otherUserIndex = users.findIndex((u: any) => u.id === userId);

    if (currentUserIndex !== -1 && otherUserIndex !== -1) {
      // Add connections
      if (!users[currentUserIndex].connections) users[currentUserIndex].connections = [];
      if (!users[otherUserIndex].connections) users[otherUserIndex].connections = [];
      
      users[currentUserIndex].connections.push(userId);
      users[otherUserIndex].connections.push(user.id);

      // Remove from connection requests
      users[currentUserIndex].connectionRequests = users[currentUserIndex].connectionRequests?.filter((id: string) => id !== userId) || [];

      localStorage.setItem('users', JSON.stringify(users));

      // Update current user
      const updatedUser = users[currentUserIndex];
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  const applyToJob = (jobId: string) => {
    if (!user) return;

    setJobs(prev => prev.map(job => {
      if (job.id === jobId && !job.applicants.includes(user.id)) {
        return { ...job, applicants: [...job.applicants, user.id] };
      }
      return job;
    }));

    // Create notification for job poster (simulated)
    const notification: Notification = {
      id: Date.now().toString(),
      userId: user.id,
      type: 'job',
      fromUserId: 'system',
      fromUserName: 'LinkedIn',
      fromUserImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: `Your application has been submitted successfully`,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [notification, ...prev]);
  };

  return (
    <DataContext.Provider value={{
      posts,
      jobs,
      messages,
      notifications,
      createPost,
      likePost,
      commentPost,
      sendMessage,
      markNotificationRead,
      sendConnectionRequest,
      acceptConnectionRequest,
      applyToJob,
      votePoll
    }}>
      {children}
    </DataContext.Provider>
  );
};