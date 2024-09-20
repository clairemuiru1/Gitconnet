'use client';

import React, { useEffect, useState } from 'react';
import { Client, Databases, ID } from 'appwrite';
import { FaThumbsUp, FaThumbsDown, FaTrash, FaComment } from 'react-icons/fa'; 
import './styles/post.css';

const client = new Client();
const databases = new Databases(client);

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('66ea9ca0003b2551e1b5');

interface Post {
  $id: string;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  comments: string[];
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState<{ [key: string]: boolean }>({});
  const [formValues, setFormValues] = useState<{ title: string; content: string }>({
    title: '',
    content: '',
  });
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await databases.listDocuments('66eac406003a5b6dad9f', '66eb1c5f00114c64fb44');
      setPosts(response.documents);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCommentChange = (id: string, value: string) => {
    setCommentText({
      ...commentText,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await databases.createDocument('66eac406003a5b6dad9f', '66eb1c5f00114c64fb44', ID.unique(), {
        title: formValues.title,
        content: formValues.content,
        likes: 0,
        dislikes: 0,
        comments: [],
      });
      fetchPosts();
      setFormValues({ title: '', content: '' });
      setShowPostForm(false); // Hide form after submit
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument('66eac406003a5b6dad9f', '66eb1c5f00114c64fb44', id);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleLike = async (id: string) => {
    const post = posts.find(post => post.$id === id);
    if (post) {
      try {
        await databases.updateDocument('66eac406003a5b6dad9f', '66eb1c5f00114c64fb44', id, {
          likes: post.likes + 1,
        });
        fetchPosts();
      } catch (error) {
        console.error('Error liking post:', error);
      }
    }
  };

  const handleDislike = async (id: string) => {
    const post = posts.find(post => post.$id === id);
    if (post) {
      try {
        await databases.updateDocument('66eac406003a5b6dad9f', '66eb1c5f00114c64fb44', id, {
          dislikes: post.dislikes + 1,
        });
        fetchPosts();
      } catch (error) {
        console.error('Error disliking post:', error);
      }
    }
  };

  const handleComment = async (id: string) => {
    const post = posts.find(post => post.$id === id);
    
    if (!post) {
      console.error(`Post with ID ${id} not found.`);
      return;
    }
  
    const updatedComments = [...(post.comments || []), commentText[id]];
  
    try {
      await databases.updateDocument(
        '66eac406003a5b6dad9f',
        '66eb1c5f00114c64fb44',
        id,
        { comments: updatedComments }
      );
  
      fetchPosts();
  
      setCommentText(prevCommentText => ({
        ...prevCommentText,
        [id]: '',
      }));
  
      setShowCommentForm(prevShowCommentForm => ({
        ...prevShowCommentForm,
        [id]: false,
      }));
  
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };  

  return (
    <div className="posts-container">
      <button onClick={() => setShowPostForm(!showPostForm)} className="create-post-btn">
        {showPostForm ? 'Cancel' : 'Create Post'}
      </button>

      {showPostForm && (
        <form onSubmit={handleSubmit} className="post-form">
          <input
            type="text"
            name="title"
            placeholder="Enter Post Title"
            value={formValues.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="content"
            placeholder="Enter Post Content"
            value={formValues.content}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      )}

      <div className="posts-list">
        {posts.map(post => (
          <div key={post.$id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className="post-actions">
              <button onClick={() => handleLike(post.$id)}>
                <FaThumbsUp /> ({post.likes})
              </button>
              <button onClick={() => handleDislike(post.$id)}>
                <FaThumbsDown /> ({post.dislikes})
              </button>
              <button onClick={() => setShowCommentForm({ ...showCommentForm, [post.$id]: !showCommentForm[post.$id] })}>
                <FaComment /> Comment
              </button>
              <button onClick={() => handleDelete(post.$id)}>
                <FaTrash /> Delete
              </button>
            </div>
            {showCommentForm[post.$id] && (
              <form className="comment-form">
                <input
                  type="text"
                  value={commentText[post.$id] || ''}
                  onChange={(e) => handleCommentChange(post.$id, e.target.value)}
                  placeholder="Add a comment"
                />
                <button onClick={() => handleComment(post.$id)}>Submit Comment</button>
                <input type="file" className="upload-btn" />
              </form>
            )}
            <div className="comments-list">
              {post.comments.map((comment, index) => (
                <p key={index} className="comment">{comment}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
