import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/action/user";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ClientEdit = ({ open, setOpen, selectedClient }) => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedClient) {
      setValue("firstName", selectedClient.firstName || "");
      setValue("lastName", selectedClient.lastName || "");
      setValue("username", selectedClient.username || "");
      setValue("email", selectedClient.email || "");
      setValue("phone", selectedClient.phone || "");
    }
  }, [selectedClient, setValue]);

  const onSubmit = (data) => {
    if (selectedClient?._id) {
      dispatch(updateUser(selectedClient._id, data));
      handleClose();
    }
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <Dialog
      scroll="paper"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
    >
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Edit Client</div>
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>

      <DialogContent>
        <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
          <div className="text-xl flex justify-start items-center gap-2 font-normal">
            <PiNotepad size={23} />
            <span>Client Details</span>
          </div>
          <Divider />

          <form onSubmit={handleSubmit(onSubmit)}>
            <table className="mt-4 w-full">
              <tbody>
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

                <tr>
                  <td className="pb-4 text-lg">Phone</td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      type="number"
                      {...register("phone", {
                        required: "Phone number is required",
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

export default ClientEdit;
