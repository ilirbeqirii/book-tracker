"use client";

import { createContext, useContext, useEffect, useState } from "react";
import classes from "./toast-notification.module.css";

export const ToastNotificationContext = createContext<{
  showToast: (message: string, type: "success" | "error") => void;
  hideToast: () => void;
  message: string;
  type: "success" | "error";
  isVisible: boolean;
} | null>(null);

export const ToastNotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"success" | "error">("success");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const showToast = (message: string, type: "success" | "error") => {
    setMessage(message);
    setType(type);
    setIsVisible(true);
  };

  const hideToast = () => {
    setIsVisible(false);
  };

  return (
    <ToastNotificationContext.Provider
      value={{ showToast, message, type, isVisible, hideToast }}
    >
      {children}
    </ToastNotificationContext.Provider>
  );
};

export const useToastNotification = () => {
  const context = useContext(ToastNotificationContext);
  if (!context) {
    throw new Error(
      "useToastNotification must be used within a ToastNotificationProvider"
    );
  }
  return context;
};

function ToastNotification({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  const {hideToast} = useToastNotification();
  useEffect(() => {
    const timer = setTimeout(() => {
      hideToast();
    }, 3000);

    return () => clearTimeout(timer);
  }, [hideToast]);

  return (
    <div
      className={[
        classes["toast-notification"],
        classes[type],
        classes["show"],
      ].join(" ")}
    >
      <p>{message}</p>
    </div>
  ) 
}

export default ToastNotification;
