import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import ModalDelete from "../component/ModalDelete";

export default function Post(props) {
  const { users, user } = props;
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("http://localhost:3000/posts");
      setPosts(res.data);
    };
    getPosts();
  }, []);

  const handelDelete = async (post) => {
    const postsBeforeDelete = [...posts];
    try {
      const newPosts = posts.filter((p) => p.id !== post.id);
      setPosts(newPosts);
      await axios.delete(`http://localhost:3000/posts/${post.id}`);
      toast.success("Post deleted successfully");
      setShowModal(false);
    } catch (error) {
      setPosts(postsBeforeDelete);
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
    <div className="py-16 sm:py-24  min-h-screen">
      <Link
        to="/post/new"
        className="fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 text-2xl font-bold z-10"
      >
        +
      </Link>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            From the blog
          </h2>
          <p class="mt-2 text-lg/8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 sm:mt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col items-start  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="w-full">
                <img
                  src={post.url || "https://via.placeholder.com/400x200"}
                  className="w-full h-48 object-fill rounded-t-lg"
                  alt={post.title}
                />
              </div>
              <div className="flex-1 p-6 max-w-full">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600 whitespace-normal break-words">
                  {post.content}
                </p>
              </div>
              <div className="w-full p-6 flex items-center justify-between border-t border-gray-100">
                <div className="flex items-center gap-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="w-10 h-10 rounded-full bg-gray-50"
                  />
                  <p className="text-sm font-medium text-gray-900">
                    {users.find((user) => user.id === post.authorId)?.name ||
                      "Unknown"}
                  </p>
                </div>
                {post.authorId === user.id && (
                  <div className="flex items-center gap-x-2">
                    <Link
                      to={`/post/${post.id}`}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-blue-500"
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
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-red-600"
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
            </article>
          ))}
        </div>
      </div>
      {showModal && (
        <ModalDelete
          handelDelete={() => handelDelete(postToDelete)}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
