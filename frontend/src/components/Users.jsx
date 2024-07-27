// Import the axios library for making HTTP requests
import axios from "axios";

// Import the useState and useEffect hooks from React
import React, { useEffect, useState } from "react";

// Import the useNavigate hook from React Router DOM
import { useNavigate } from "react-router-dom";

// Import the Button component from the "./Button" file
import { Button } from "./Button";

// Define the Users component
export function Users() {
  // Declare a state variable called "users" and initialize it with an empty array
  const [users, setUsers] = useState([]);

  // Declare a state variable called "filter" and initialize it with an empty string
  const [filter, setFilter] = useState("");

  // Use the useEffect hook to make an HTTP GET request to the "/api/v1/user/bulk" endpoint with a query parameter "filter" set to the value of the "filter" state variable
  // When the "filter" state variable changes, the effect is triggered
  useEffect(() => {
    // Make an HTTP GET request to the "/api/v1/user/bulk" endpoint with a query parameter "filter" set to the value of the "filter" state variable
    axios
      .get("http://localhost:8080/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        // Set the value of the "users" state variable to the "user" property of the response data
        setUsers(response.data.user);
      });
  }, [filter]);

  // Return a JSX fragment containing the user list UI
  return (
    <>
      {/* Display the heading "Users" */}
      <div className="font-bold mt-6 text-lg">Users</div>

      {/* Display an input field for filtering users */}
      <div className="my-2">
        <input
          type="text"
          placeholder="search user..."
          // Update the "filter" state variable when the input field value changes
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        />
      </div>

      {/* Display a list of users */}
      <div>
        {/* Map over the "users" array and render a User component for each user */}
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </>
  );
}

// Define the User component
function User({ user }) {
  // Get the navigate function from the useNavigate hook
  const navigate = useNavigate();

  // Return a JSX fragment containing the user UI
  return (
    <div className="flex justify-between">
      {/* Display the user's avatar and name */}
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {/* Display the first character of the user's first name */}
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {/* Display the user's first name and last name */}
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      {/* Display a button for sending money to the user */}
      <div className="flex flex-col justify-center h-full">
        <Button
          // When the button is clicked, navigate to the "/send" route with query parameters "id" set to the user's ID and "name" set to the user's first name
          onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          // Display the label "Send Money" on the button
          label={"Send Money"}
        />
      </div>
    </div>
  );
}


