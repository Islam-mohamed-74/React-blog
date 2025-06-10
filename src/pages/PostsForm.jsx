import axios from "axios";
import React, { useEffect } from "react";
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

  // const handleErrors = (errors) => {
  //   console.error(errors);
  // };

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
    <div className="flex capitalize min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl/9 capitalize font-bold tracking-tight text-gray-900">
          {mode === "add" ? "Create new post" : "Edit post"}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(handlePosts)}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="title"
                id="title"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("title", newPost.title)}
              />
              {errors.title && (
                <p className="text-red-500 text-xs m-1 normal-case">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="url"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Image URL
            </label>
            <div className="mt-2">
              <input
                type="url"
                name="url"
                id="url"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("url", newPost.url)}
              />
              {errors.url && (
                <p className="text-red-500 text-xs m-1 normal-case">
                  {errors.url.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                name="description"
                id="description"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 min-h-28 max-h-40"
                {...register("content", newPost.content)}
              />
              {errors.content && (
                <p className="text-red-500 text-xs m-1 normal-case">
                  {errors.content.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center cursor-pointer rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {mode === "add" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
