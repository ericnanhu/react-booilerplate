"use client";

import React from "react";

type NotificationProps = {
  type: "info" | "success" | "error";
  message: string;
};

export default function Notification({ type, message }: NotificationProps) {
  const [isNotificationOn, setIsNotificationOn] = React.useState(true);

  return (
    <div
      className={`${
        isNotificationOn ? "" : "hidden"
      } absolute top-40 max-w-screen-md border rounded flex flex-row bg-emerald-100 mx-auto p-2 text-dark`}>
      <p className="px-2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, facere
        rerum deserunt minima tempora dicta enim ipsum soluta laudantium at
        quibusdam repellat explicabo dolorum quod animi numquam quidem, ad
        tenetur!
      </p>
      <div>
        <svg
          className="stroke-emerald-500 hover:cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="36"
          height="36"
          stroke-linecap="round"
          stroke-linejoin="round"
          onClick={() => setIsNotificationOn(false)}>
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </div>
  );
}
