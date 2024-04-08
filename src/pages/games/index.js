import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import serviceGames from "services/games";

const columns = [
  {
    field: "header_image",
    headerName: "Image",
    renderCell: (params) => (
      <img src={params.row.header_image} alt="Game" style={{ width: 100, height: 50 }} />
    ),
    sortable: false,
    width: 150,
  },
  { field: "name", headerName: "Name", width: 300 },
  { field: "developer", headerName: "Developer", width: 200 },
  { field: "publisher", headerName: "Publisher", width: 200 },
  { field: "genres", headerName: "Genres", width: 150 },
];

const Games = () => {

  const [games, setGames] = useState([]);

  useEffect(() => {
    serviceGames
      .all()
      .then((data) => {
        setGames(data);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }, []);

  return (
    <>
      <Container component="main" maxWidth="lg" sx={{ marginTop: 5 }}>
        <DataGrid
        rows={games}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
        }}
        pageSizeOptions={[50, 100]}
        autoHeight
      />
      </Container>
    </>
  );
};

export default Games;
