import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { register } from "@/api/authApi";
import axios from "axios";

const RegisterForm = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!formValues.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (formValues.username.length < 4) {
      newErrors.username = "Username should be atleast 4 characters";
    }

    if (!formValues.password) {
      newErrors.password = "Password is required";
    }

    if (formValues.password.length < 8) {
      newErrors.password = "Password must be atleast 8 characters";
    }

    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    }

    if (
      formValues.password &&
      formValues.confirmPassword &&
      formValues.password !== formValues.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    setLoading(true);

    try {
      await register({
        username: formValues.username,
        password: formValues.password,
      });
      toast.success("Registration successful! Please Login");
      setFormValues({
        username: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message;
        toast.error(backendMessage || "Registration failed. Try again.");
      } else {
        toast.error("Registration failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form className="space-y-6" onSubmit={onSubmit} noValidate>
          <div>
            <label
              htmlFor="username"
              className="uppercase text-xs font-bold text-zinc-500 dark:text-white"
            >
              Username
            </label>
            <Input
              id="username"
              name="username"
              placeholder="Enter New Username"
              className={`border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.username ? "border border-red-500" : ""
              }`}
              value={formValues.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="uppercase text-xs font-bold text-zinc-500 dark:text-white"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter Password"
              className={`border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.password ? "border border-red-500" : ""
              }`}
              value={formValues.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="uppercase text-xs font-bold text-zinc-500 dark:text-white"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Enter Confirm Password"
              className={`border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.confirmPassword ? "border border-red-500" : ""
              }`}
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
