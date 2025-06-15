"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import ModalDelete from "../component/ModalDelete";

export default function Post(props) {
  const { users, user } = props;
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/posts");
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data);
      }
    };
    getPosts();
  }, []);

  const handelDelete = async (post) => {
    // Store the posts before the delete in case of an error
    const postsBeforeDelete = [...posts];

    try {
      // Delete the post from the state
      const newPosts = posts.filter((p) => p.id !== post.id);
      setPosts(newPosts);

      // Delete the post from the server
      await axios.delete(`http://localhost:3000/posts/${post.id}`);

      // Show a success message
      toast.success("Post deleted successfully");

      // Close the modal
      setShowModal(false);
    } catch (error) {
      // If there is an error, restore the previous posts
      setPosts(postsBeforeDelete);
      // Show an error message
      toast.error(error.response?.data || "Error deleting post");
    }
  };

  const openModal = (post) => {
    setPostToDelete(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPostToDelete(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Link
        to="/post/new"
        className="fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 text-2xl font-bold z-50"
      >
        +
      </Link>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      )}

      {/* Posts Content */}
      {!loading && (
        <main className="max-w-7xl mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-400 leading-tight mb-6">
              Global Stories
              <br />& Articles
            </h1>
            <p className="text-xl text-gray-500 max-w-md mx-auto">
              Discover insights, stories, and knowledge from our community
            </p>
          </div>

          {/* Posts  */}
          <section>
            <h2 className="text-4xl font-bold text-gray-400 mb-12">
              Recent Articles
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  {/* Post Image */}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.url || "/placeholder.svg?height=200&width=400"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={post.title}
                    />
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors duration-200 mb-3 line-clamp-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 min-h-16 text-ellipsis wrap-break-word ">
                      {post.content}
                    </p>

                    {/* Author and Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {
                              (users.find((u) => u.id === post.authorId)
                                ?.name || "U")[0]
                            }
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {users.find((u) => u.id === post.authorId)?.name ||
                            "Unknown"}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      {post.authorId === user.id && (
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/post/${post.id}`}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group/edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 text-gray-500 group-hover/edit:text-blue-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </Link>
                          <button
                            onClick={() => openModal(post)}
                            className="p-2 cursor-pointer rounded-full hover:bg-gray-100 transition-colors duration-200 group/delete"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 text-gray-500 group-hover/delete:text-red-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Empty State */}
            {posts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h6.75"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No articles yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Be the first to share your story with the community.
                </p>
                <Link
                  to="/post/new"
                  className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-2 transition-colors inline-flex items-center space-x-2"
                >
                  <span>Create Article</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </section>
        </main>
      )}

      {/* Delete Modal */}
      {showModal && (
        <ModalDelete
          handelDelete={() => handelDelete(postToDelete)}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
