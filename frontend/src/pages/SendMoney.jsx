import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

// This is a React functional component that renders a page for sending money.
// It receives the user's search parameters from the URL and uses them to
// display the recipient's name and avatar.

export const SendMoney = () => {
  // Get the search parameters from the URL using the useSearchParams hook.
  const [searchParams] = useSearchParams();
  // Get the recipient's ID from the "id" parameter.
  const id = searchParams.get("id");
  // Get the recipient's name from the "name" parameter.
  const name = searchParams.get("name");
  // Use the useState hook to create a state variable for the amount to be sent.
  const [amount, setAmount] = useState(0);

  return (
    // Render a flex container with a gray background that takes up the full screen height.
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {// Display the first character of the recipient's name in uppercase.
                  name[0].toUpperCase()}
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  // When the input value changes, update the amount state variable.
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                // When the button is clicked, send a POST request to the server to initiate the transfer.
                onClick={async () => {
                  try {
                    await axios.post(
                      "http://localhost:8080/api/v1/account/transfer",
                      {
                        to: id,
                        amount,
                      },
                      {
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );
                  } catch (error) {
                    console.error("Error during money transfer:", error);
                  }
                }}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
