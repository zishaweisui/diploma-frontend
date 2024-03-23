import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import serviceUsers from "services/users";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "first_name", headerName: "First name" },
  { field: "last_name", headerName: "Last name" },
  { field: "email", headerName: "Email" },
  { field: "nickname", headerName: "Nickname" },
];

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    serviceUsers
      .all()
      .then((data) =>
        setUsers(
          data.map(({ profile, ...user }) => ({
            ...user,
            first_name: profile.first_name,
            last_name: profile.last_name,
          }))
        )
      );
  }, []);

  return (
    <Container component="main" maxWidth="lg" sx={{ marginTop: 5 }}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
        autoHeight
      />
    </Container>
  );
};

export default Users;
