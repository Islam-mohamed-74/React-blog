import React from "react";
import { useNavigate } from "react-router";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl text-center">
        <div className="card-body">
          <h2 className="card-title text-error"> page not found (404)</h2>
          <p className="text-base-content">
            please check the url and try again
          </p>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary capitalize"
              onClick={() => navigate("/")}
            >
              back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
