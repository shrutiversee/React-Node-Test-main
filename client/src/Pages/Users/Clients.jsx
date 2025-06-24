

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import { PiTrashLight, PiNotepad } from "react-icons/pi";

import Topbar from "./Topbar";
import { Table } from "../../Components";
import { getClients, getEmployeeClients } from "../../redux/action/user";
import CreateClient from "./CreateClient";
import DeleteClient from "./Delete";
import ClientEdit from "./ClientEdit";
import Filter from "./Filter";

const Clients = () => {
  ////////////////////////// VARIABLES //////////////////////////
  const dispatch = useDispatch();
  const { clients, isFetching, error, loggedUser } = useSelector(
    (state) => state.user
  );

  ////////////////////////// STATES //////////////////////////
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  ////////////////////////// EFFECT //////////////////////////
  useEffect(() => {
    if (loggedUser?.role === "employee") {
      dispatch(getEmployeeClients());
    } else {
      dispatch(getClients());
    }
  }, [dispatch, loggedUser?.role]);

  ////////////////////////// COLUMNS //////////////////////////
  const columns = [
    {
      field: "uid",
      headerName: "ID",
      width: 80,
      renderCell: (params) => (
        <span className="font-primary">{params.row.uid}</span>
      ),
    },
    {
      field: "Client Name",
      headerName: "Client Name",
      width: 180,
      renderCell: (params) => (
        <div className="capitalize text-[#20aee3] font-primary cursor-pointer">
          {params.row.firstName} {params.row.lastName}
        </div>
      ),
    },
    {
      field: "username",
      headerName: "Username",
      width: 160,
      renderCell: (params) => (
        <span className="capitalize font-primary">{params.row.username}</span>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 140,
      renderCell: (params) => (
        <span className="font-primary">{params.row.phone}</span>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      renderCell: (params) => (
        <span className="font-primary">{params.row.email}</span>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <div className="flex gap-2">
          {loggedUser?.role !== "employee" && (
            <>
              <Tooltip title="Edit" arrow>
                <PiNotepad
                  className="cursor-pointer text-green-500 text-[22px]"
                  onClick={() => {
                    setSelectedClient(params.row);
                    setOpenEdit(true);
                  }}
                />
              </Tooltip>
              <Tooltip title="Delete" arrow>
                <PiTrashLight
                  className="cursor-pointer text-red-500 text-[22px]"
                  onClick={() => {
                    setSelectedClient(params.row);
                    setOpenDelete(true);
                  }}
                />
              </Tooltip>
            </>
          )}
        </div>
      ),
    },
  ];

  ////////////////////////// RETURN //////////////////////////
  return (
    <div className="w-full">
      <Topbar
        showAddClient={true}
        onAddClick={() => setOpenCreate(true)}
        openFilters={openFilters}
        setOpenFilters={setOpenFilters}
        isFiltered={isFiltered}
        setIsFiltered={setIsFiltered}
      />

      <Filter
        open={openFilters}
        setOpen={setOpenFilters}
        setIsFiltered={setIsFiltered}
      />

      <Table
        rows={clients}
        columns={columns}
        isFetching={isFetching}
        error={error}
        rowsPerPage={10}
      />

      <CreateClient open={openCreate} setOpen={setOpenCreate} scroll="paper" />

      <DeleteClient
        open={openDelete}
        setOpen={setOpenDelete}
        client={selectedClient}
      />

      <ClientEdit
        open={openEdit}
        setOpen={setOpenEdit}
        selectedClient={selectedClient}
      />
    </div>
  );
};

export default Clients;

