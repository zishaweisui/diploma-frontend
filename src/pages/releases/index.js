import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import serviceReleases from "services/releases";

const Releases = () => {

    const [releases, setReleases] = useState([]);
  
    useEffect(() => {
        serviceReleases
        .all()
        .then((data) => {
            setReleases(data);
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
        });
    }, []);
  
  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
      {releases.map((release) => (
        <Card
        color="primary"
        invertedColors={false}
        orientation="horizontal"
        size="sm" 
        variant="outlined"
        sx={{ marginBottom: 2 }}
        key={release.id}
      >
        <CardContent sx={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}>
            <IconButton
              aria-label="bookmark Bahamas Islands"
              variant="plain"
              color="neutral"
              size="sm"
            >
              <BookmarkAdd />
            </IconButton>
          </div>
          <Typography level="title-lg">
           {release.name}
            </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
              Release Date: {release.release_date}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Distribution Type: {release.distribution_type}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Platform: {release.platform}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Region: {release.region}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Publishers:{" "}
              {release.publishers.map((publisher) => publisher.name).join(", ")}
            </Typography>
        </CardContent>
      </Card>
      ))}
    </Container>
  );
};
  
  export default Releases;
  