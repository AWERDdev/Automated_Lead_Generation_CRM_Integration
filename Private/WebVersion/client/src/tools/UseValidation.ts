import { useState } from "react"

export const Signup_validate = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (fields: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }) => {
    const newErrors: Record<string, string> = {};
    if (!fields.firstName || fields.firstName.trim() === "") {
      newErrors.firstName = "First name is required";
    }
    if (!fields.lastName || fields.lastName.trim() === "") {
      newErrors.lastName = "Last name is required";
    }
    if (!fields.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!fields.password || fields.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (fields.password !== fields.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export const Login_validate = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (fields: { email?: string; password?: string }) => {
    const newErrors: Record<string, string> = {};
    if (!fields.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!fields.password || fields.password.trim() === "") {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};