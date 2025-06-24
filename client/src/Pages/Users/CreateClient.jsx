
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../../redux/action/user";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { useForm } from "react-hook-form";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

const CreateClient = ({ open, setOpen, scroll }) => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = (data) => {
    if (data._id) delete data._id; // Remove accidental _id
    console.log("Submitting new client:", data); // Optional: Debug log
    dispatch(createClient(data));
    reset();
    setOpen(false);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
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
        <div className="text-sky-400 font-primary">Add New Client</div>
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>

      <DialogContent>
        <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
          <div className="text-xl flex items-center gap-2 font-normal">
            <PiNotepad size={23} />
            <span>Client Details</span>
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
                        required: "First name is required",
                        minLength: { value: 2, message: "Min 2 characters" },
                        maxLength: { value: 20, message: "Max 20 characters" },
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
                        required: "Last name is required",
                        minLength: { value: 2, message: "Min 2 characters" },
                        maxLength: { value: 20, message: "Max 20 characters" },
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
                        minLength: { value: 4, message: "Min 4 characters" },
                        maxLength: { value: 15, message: "Max 15 characters" },
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
                      placeholder="e.g. client@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email",
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
                        minLength: { value: 6, message: "Min 6 characters" },
                        maxLength: { value: 20, message: "Max 20 characters" },
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
                      type="number"
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

            <DialogActions>
              <button
                type="button"
                onClick={handleClose}
                className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] font-thin"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary-blue px-4 py-2 rounded-lg text-white hover:bg-red-400 font-thin"
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

export default CreateClient;

