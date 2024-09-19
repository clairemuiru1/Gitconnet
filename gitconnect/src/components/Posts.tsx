'use client';
import React, { useEffect, useState } from 'react';
import { Databases, ID, Account } from 'appwrite';
import { client, account } from './appwriteConfig';
import './styles.css';

const databases = new Databases(client);
const accountService = new Account(client);

interface Post {
    $id: string;
    title: string;
    content: string;
    userId: string;
    likes?: number;
    dislikes?: number;
}

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const user = await accountService.get();
                setUserId(user.$id);
                setLoading(false);
                fetchPosts();
            } catch (error) {
                console.error('Error fetching user ID:', error);
                setError('Failed to fetch user information. Please log in.');
                setLoading(false);
            }
        };

        fetchUserId();
    }, []);

    const fetchPosts = async () => {
        if (!userId) {
            setError('User ID not found. Please log in.');
            return;
        }

        try {
            const response = await databases.listDocuments('66eac406003a5b6dad9f', '66eb1c5f00114c64fb44');
            setPosts(response.documents);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setError('Failed to fetch posts.');
        }
    };

    const addPost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            setError('User ID not found. Please log in.');
            return;
        }

        try {
            await databases.createDocument(
                '66eac406003a5b6dad9f',
                '66eb1c5f00114c64fb44',
                ID.unique(),
                {
                    title: newTitle,
                    content: newContent,
                    userId,
                    likes: 0,
                    dislikes: 0
                }
            );
            fetchPosts(); 
            setNewTitle('');
            setNewContent('');
        } catch (error) {
            console.error('Error adding post:', error);
            setError('Failed to add post.');
        }
    };

    const editPost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPostId) return;

        try {
            await databases.updateDocument(
                '66eac406003a5b6dad9f',
                '66eb1c5f00114c64fb44',
                editingPostId,
                {
                    title: editTitle,
                    content: editContent
                }
            );
            fetchPosts(); 
            setEditingPostId(null);
            setEditTitle('');
            setEditContent('');
        } catch (error) {
            console.error('Error editing post:', error);
            setError('Failed to edit post.');
        }
    };

    const deletePost = async (postId: string) => {
        if (!userId) {
            setError('User ID not found. Please log in.');
            return;
        }

        try {
            const post = posts.find(p => p.$id === postId);
            if (post && post.userId === userId) {
                await databases.deleteDocument('66eac406003a5b6dad9f', '66eb1c5f00114c64fb44', postId);
                fetchPosts(); 
            } else {
                setError('User is not authorized to delete this post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            setError('Failed to delete post.');
        }
    };

    const handleLike = async (postId: string, currentLikes: number) => {
        try {
            await databases.updateDocument(
                '66eac406003a5b6dad9f',
                '66eb1c5f00114c64fb44',
                postId,
                { likes: currentLikes + 1 }
            );
            fetchPosts(); 
        } catch (error) {
            console.error('Error liking post:', error);
            setError('Failed to like post.');
        }
    };

    const handleDislike = async (postId: string, currentDislikes: number) => {
        try {
            await databases.updateDocument(
                '66eac406003a5b6dad9f',
                '66eb1c5f00114c64fb44',
                postId,
                { dislikes: currentDislikes + 1 }
            );
            fetchPosts(); 
        } catch (error) {
            console.error('Error disliking post:', error);
            setError('Failed to dislike post.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="posts-container">
            <h2>Posts</h2>

            <div className="new-post-form">
                <h3>Create New Post</h3>
                <form onSubmit={addPost}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Content"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        required
                    />
                    <button type="submit">Add Post</button>
                </form>
            </div>

            <div className="posts-feed">
                {posts.map((post) => (
                    <div key={post.$id} className="post-item">
                        {editingPostId === post.$id ? (
                            <form onSubmit={editPost} className="edit-post-form">
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Edit Title"
                                    required
                                />
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    placeholder="Edit Content"
                                    required
                                />
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={() => setEditingPostId(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <div className="post-actions">
                                    <button onClick={() => handleLike(post.$id, post.likes || 0)}>Like ({post.likes || 0})</button>
                                    <button onClick={() => handleDislike(post.$id, post.dislikes || 0)}>Dislike ({post.dislikes || 0})</button>
                                    {post.userId === userId && (
                                        <>
                                            <button onClick={() => setEditingPostId(post.$id)}>Edit</button>
                                            <button onClick={() => deletePost(post.$id)}>Delete Post</button>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
