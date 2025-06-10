import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelRegister = (data) => {
    const createUser = async () => {
      try {
        const user = await axios.post("http://localhost:3000/register", data);
        console.log(user.data);
        toast.success("User created successfully");
      } catch (error) {
        toast.error(error.response.data);
      }
    };
    createUser();
  };
  const handelErrors = (errors) => {
    console.error(errors);
  };
  const registerOptions = {
    name: {
      required: "Name is required",
      minLength: { value: 3, message: "Name must have at least 3 characters" },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "invalid email address",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must have at least 6 characters",
      },
    },
  };
  return (
    <div class="flex capitalize min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 class="mt-10 text-center text-2xl/9 capitalize font-bold tracking-tight text-gray-900">
          Sign up
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          class="space-y-6"
          onSubmit={handleSubmit(handelRegister, handelErrors)}
        >
          <div>
            <label
              for="name"
              class="block text-sm/6  font-medium text-gray-900"
            >
              name
            </label>
            <div class="mt-2">
              <input
                type="name"
                name="name"
                id="name"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("name", registerOptions.name)}
              />
              {errors.name && (
                <p className="text-red-500 text-xs m-1 normal-case">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              for="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email
            </label>
            <div class="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("email", registerOptions.email)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs m-1 normal-case">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div class="text-sm">
                <a
                  href="#"
                  class="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div class="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("password", registerOptions.password)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs m-1 normal-case">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center cursor-pointer rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
}
