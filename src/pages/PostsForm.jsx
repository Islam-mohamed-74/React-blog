"use client";

import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function PostsForm(props) {
  const { user } = props;
  const { id } = useParams();
  const mode = id === "new" ? "add" : id ? "edit" : "add";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (mode === "edit") {
      const getPost = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`http://localhost:3000/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setValue("title", res.data.title);
          setValue("url", res.data.url);
          setValue("content", res.data.content);
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      };
      getPost();
    }
  }, [mode, id, setValue]);

  const newPost = {
    title: {
      required: "Title is required",
      minLength: { value: 3, message: "Title must have at least 3 characters" },
      maxLength: {
        value: 30,
        message: "Title must have at least 3 characters and less than 30",
      },
    },
    url: {
      required: "Image url is required",
    },
    content: {
      required: "Content is required",
      minLength: {
        value: 10,
        message: "Content must have at least 10 characters and less than 100",
      },
      maxLength: {
        value: 100,
        message: "Content must have at least 10 characters and less than 100",
      },
    },
  };

  const editPost = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const post = await axios.put(
        `http://localhost:3000/posts/${id}`,
        {
          ...data,
          authorId: user.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(post.data);
      toast.success("Post updated successfully");
      navigate("/post");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const addPost = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const post = await axios.post(
        "http://localhost:3000/posts",
        {
          ...data,
          authorId: user.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(post.data);
      toast.success("Post created successfully");
      navigate("/post");
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل إضافة البوست");
    }
  };

  const handlePosts = (data) => {
    if (mode === "add") {
      addPost(data);
    } else {
      editPost(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wordcraft</h1>
          <p className="text-sm text-gray-500">Global Stories & Articles</p>
        </div>
        <h2 className="mt-8 text-center text-3xl font-extrabold text-gray-900">
          {mode === "add" ? "Create New Article" : "Edit Article"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {mode === "add"
            ? "Share your story with the world"
            : "Update your article content"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(handlePosts)}>
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Article Title
              </label>
              <div className="mt-1">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter a compelling title for your article"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  {...register("title", newPost.title)}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>

            {/* Image URL Field */}
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700"
              >
                Featured Image URL
              </label>
              <div className="mt-1">
                <input
                  id="url"
                  name="url"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  {...register("url", newPost.url)}
                />
                {errors.url && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.url.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Add a high-quality image that represents your article
                </p>
              </div>
            </div>

            {/* Content Field */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Article Content
              </label>
              <div className="mt-1">
                <textarea
                  id="content"
                  name="content"
                  rows={6}
                  placeholder="Write your article content here. Share your thoughts, insights, and stories..."
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm resize-vertical"
                  {...register("content", newPost.content)}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.content.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Write between 10-100 characters to give readers a preview of
                  your article
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex cursor-pointer items-center justify-between space-x-4">
              <button
                type="button"
                onClick={() => navigate("/post")}
                className="flex-1 cursor-pointer flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                {mode === "add" ? (
                  <>
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Create Article
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Update Article
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Preview Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Writing Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-4 h-4 text-green-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Use a clear, descriptive title</span>
                </div>
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-4 h-4 text-green-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Choose high-quality images</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-4 h-4 text-green-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Write engaging content</span>
                </div>
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-4 h-4 text-green-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Keep it concise and clear</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
