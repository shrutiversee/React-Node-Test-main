
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../../redux/action/user";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  Divider,
} from "@mui/material";

import { PiNotepad, PiXLight } from "react-icons/pi";

// Slide transition for modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateUser = ({ open, setOpen, scroll }) => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createEmployee(data, setOpen));
    reset();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <Dialog
      scroll={scroll}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
    >
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Add New Employee</div>
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>

      <DialogContent>
        <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
          <div className="text-xl flex justify-start items-center gap-2 font-normal">
            <PiNotepad size={23} />
            <span>Employee Details</span>
          </div>

          <Divider />

          <form onSubmit={handleSubmit(onSubmit)}>
            <table className="mt-4 w-full">
              <tbody>
                {/* First Name */}
                <tr>
                  <td className="pb-4 text-lg">First Name</td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      {...register("firstName", {
                        required: "First Name is required",
                        minLength: {
                          value: 2,
                          message: "First name must be at least 2 characters",
                        },
                        maxLength: {
                          value: 20,
                          message: "First name cannot exceed 20 characters",
                        },
                      })}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  </td>
                </tr>

                {/* Last Name */}
                <tr>
                  <td className="pb-4 text-lg">Last Name</td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      {...register("lastName", {
                        required: "Last Name is required",
                        minLength: {
                          value: 2,
                          message: "Last name must be at least 2 characters",
                        },
                        maxLength: {
                          value: 20,
                          message: "Last name cannot exceed 20 characters",
                        },
                      })}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  </td>
                </tr>

                {/* Username */}
                <tr>
                  <td className="pb-4 text-lg">Username</td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      {...register("username", {
                        required: "Username is required",
                        minLength: {
                          value: 4,
                          message: "Username must be at least 4 characters",
                        },
                        maxLength: {
                          value: 15,
                          message: "Username cannot exceed 15 characters",
                        },
                      })}
                      error={!!errors.username}
                      helperText={errors.username?.message}
                    />
                  </td>
                </tr>

                {/* Email */}
                <tr>
                  <td className="pb-4 text-lg">Email</td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="e.g. you@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </td>
                </tr>

                {/* Password */}
                <tr>
                  <td className="pb-4 text-lg">Password</td>
                  <td className="pb-4">
                    <TextField
                      type="password"
                      size="small"
                      fullWidth
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                        maxLength: {
                          value: 20,
                          message: "Password cannot exceed 20 characters",
                        },
                      })}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  </td>
                </tr>

                {/* Phone */}
                <tr>
                  <td className="pb-4 text-lg">Phone</td>
                  <td className="pb-4">
                    <TextField
                      type="text"
                      size="small"
                      fullWidth
                      {...register("phone", {
                        required: "Phone is required",
                        minLength: {
                          value: 10,
                          message: "Phone number must be 10 digits",
                        },
                        maxLength: {
                          value: 10,
                          message: "Phone number must be 10 digits",
                        },
                      })}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Buttons */}
            <DialogActions>
              <button
                type="button"
                onClick={handleClose}
                className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
              >
                {isFetching ? "Submitting..." : "Submit"}
              </button>
            </DialogActions>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUser;
