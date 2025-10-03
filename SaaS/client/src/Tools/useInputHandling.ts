import { useState } from "react";
import type { userProps } from "@/Types/User";
// Signup input handling hook with individual useState for each field
export const useSignupInputHandling = ():userProps => {
  const [name, setName] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // Add more fields as needed

  const [errors, setErrors] = useState({});

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setAddress("");
    setErrors({});
    setusername("");
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Name is required";
    if (!username) newErrors.username = "username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password && password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!phone) newErrors.phone = "Phone is required";
    if (!address) newErrors.address = "Address is required";
    // Add more validation as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    name, setName,
    username, setusername,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    phone, setPhone,
    address, setAddress,
    errors, setErrors,
    reset,
    validate,
  };
};

// Login input handling hook with individual useState for each field
export const useUserLoginInputHandling = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const reset = () => {
    setEmail("");
    setPassword("");
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    email, setEmail,
    password, setPassword,
    errors, setErrors,
    reset,
    validate,
  };
};

