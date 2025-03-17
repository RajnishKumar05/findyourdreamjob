"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Search, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

// Mock messages data
const MOCK_CONVERSATIONS = [
  {
    id: "conv1",
    with: {
      id: "user1",
      name: "Rajesh Kumar",
      company: "TechCorp Solutions",
      avatar: "https://ui-avatars.com/api/?name=RK&background=0D8ABC&color=fff",
      role: "employer"
    },
    lastMessage: {
      text: "We would like to invite you for an interview for the Senior Frontend Developer position.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      sender: "user1"
    },
    unread: 2
  },
  {
    id: "conv2",
    with: {
      id: "user2",
      name: "Priya Sharma",
      company: "InnovateTech",
      avatar: "https://ui-avatars.com/api/?name=PS&background=6C5CE7&color=fff",
      role: "employer"
    },
    lastMessage: {
      text: "Thank you for your application! Do you have time for a quick call tomorrow?",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      sender: "user2"
    },
    unread: 0
  },
  {
    id: "conv3",
    with: {
      id: "user3",
      name: "Amit Patel",
      company: "ProductHub",
      avatar: "https://ui-avatars.com/api/?name=AP&background=74B9FF&color=fff",
      role: "employer"
    },
    lastMessage: {
      text: "I've reviewed your portfolio. Very impressive work!",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      sender: "user3"
    },
    unread: 0
  }
];

// Mock message history for a specific conversation
const MOCK_MESSAGES = {
  "conv1": [
    {
      id: "msg1",
      sender: "user1",
      text: "Hello! We were impressed by your application for the Senior Frontend Developer position at TechCorp Solutions.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 - 30 * 60 * 1000)
    },
    {
      id: "msg2",
      sender: "currentUser",
      text: "Thank you! I'm very interested in the position and would love to discuss it further.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: "msg3",
      sender: "user1",
      text: "Great! Can you tell me more about your experience with React and TypeScript?",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: "msg4",
      sender: "currentUser",
      text: "I've been working with React for over 3 years and TypeScript for 2 years. I've built several complex applications using these technologies, including a real-time dashboard and an e-commerce platform.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000)
    },
    {
      id: "msg5",
      sender: "user1",
      text: "Excellent! Have you worked with Next.js as well?",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: "msg6",
      sender: "currentUser",
      text: "Yes, I've been using Next.js for about a year now. I appreciate its built-in routing, SSR capabilities, and how it simplifies deployment.",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000)
    },
    {
      id: "msg7",
      sender: "user1",
      text: "We would like to invite you for an interview for the Senior Frontend Developer position.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ],
  "conv2": [
    {
      id: "msg1",
      sender: "user2",
      text: "Hi there! Thanks for applying to InnovateTech.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: "msg2",
      sender: "currentUser",
      text: "Thank you for considering my application!",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000)
    },
    {
      id: "msg3",
      sender: "user2",
      text: "Thank you for your application! Do you have time for a quick call tomorrow?",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ],
  "conv3": [
    {
      id: "msg1",
      sender: "user3",
      text: "Hello! I'm reviewing applications for the Product Manager role.",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: "msg2",
      sender: "currentUser",
      text: "Great! I'm looking forward to your feedback on my application.",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    },
    {
      id: "msg3",
      sender: "user3",
      text: "I've reviewed your portfolio. Very impressive work!",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ]
};

// Format time for messages
const formatMessageTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) {
    return format(date, 'h:mm a'); // Today: show time
  } else if (days === 1) {
    return 'Yesterday'; // Yesterday
  } else if (days < 7) {
    return format(date, 'EEEE'); // Day of week if within a week
  } else {
    return format(date, 'MMM d'); // Month and day if longer ago
  }
};

export default function MessagesPage() {
  const { /* user: currentUser */ } = useAuth();
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Array<{
    id: string;
    sender: string;
    text: string;
    timestamp: Date;
  }>>([]);
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Detect screen size for mobile/desktop view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Load messages when a conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      // In a real app, fetch messages from Firestore
      // For now, use our mock data
      setMessages(MOCK_MESSAGES[selectedConversation as keyof typeof MOCK_MESSAGES] || []);
      
      // Mark conversation as read
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation 
            ? { ...conv, unread: 0 } 
            : conv
        )
      );
    }
  }, [selectedConversation]);
  
  // Filter conversations based on search term
  const filteredConversations = conversations.filter(conv => 
    conv.with.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.with.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get selected conversation data
  const selectedConversationData = conversations.find(conv => conv.id === selectedConversation);
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const newMsg = {
      id: `new-${Date.now()}`,
      sender: 'currentUser',
      text: newMessage,
      timestamp: new Date()
    };
    
    // Update messages
    setMessages(prev => [...prev, newMsg]);
    
    // Update conversation with new last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation 
          ? { 
              ...conv, 
              lastMessage: {
                text: newMessage,
                timestamp: new Date(),
                sender: 'currentUser'
              } 
            } 
          : conv
      )
    );
    
    // Clear input
    setNewMessage('');
    
    // In a real app, save the message to Firestore
  };
  
  // Back button handler for mobile view
  const handleBackToList = () => {
    setSelectedConversation(null);
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="flex h-[600px]">
          {/* Conversations list - hidden on mobile when a conversation is selected */}
          {(!isMobileView || !selectedConversation) && (
            <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search messages..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation === conversation.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden relative">
                          <Image 
                            src={conversation.with.avatar} 
                            alt={conversation.with.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        {conversation.unread > 0 && (
                          <div className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold truncate">{conversation.with.name}</h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {formatMessageTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{conversation.with.company}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No conversations found
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Message area */}
          {(selectedConversation && selectedConversationData) ? (
            <div className="w-full md:w-2/3 flex flex-col">
              {/* Header */}
              <div className="p-3 border-b flex items-center gap-3">
                {isMobileView && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToList} 
                    className="p-1 mr-1"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                )}
                <div className="h-10 w-10 rounded-full overflow-hidden relative">
                  <Image 
                    src={selectedConversationData.with.avatar} 
                    alt={selectedConversationData.with.name}
                    fill
                    sizes="40px" 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedConversationData.with.name}</h3>
                  <p className="text-xs text-gray-500">{selectedConversationData.with.company}</p>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                  const isCurrentUser = message.sender === 'currentUser';
                  
                  return (
                    <div 
                      key={message.id} 
                      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          isCurrentUser 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p 
                          className={`text-xs mt-1 ${
                            isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {formatMessageTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Message input */}
              <div className="p-3 border-t flex items-end gap-2">
                <Textarea
                  placeholder="Type your message..."
                  className="flex-1 min-h-[60px] max-h-[120px]"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  className="h-10"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : !isMobileView ? (
            <div className="w-full md:w-2/3 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
} 