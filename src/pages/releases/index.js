import { useState, useEffect } from "react";
import serviceReleases from "services/releases";
import Container from "@mui/material/Container";
import Box from '@mui/joy/Box';
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";

const ReleaseCard = ({ release }) => {
  return (
    <Card variant="outlined" sx={{width: 400}}>
      <CardOverflow>
        {/* <AspectRatio ratio="2">
          <img
            src={release.image}
            srcSet={release.image}
            loading="lazy"
            alt={release.name}
          />
        </AspectRatio> */}
        <IconButton
          aria-label={`Like ${release.id}`}
          size="md"
          variant="solid"
          color="danger"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: "1rem",
            bottom: 0,
            transform: "translateY(50%)",
          }}
        >
          <Favorite />
        </IconButton>
      </CardOverflow>
      <CardContent>
        <Typography level="title-lg">
            {release.name}
        </Typography>
        <Typography level="body-sm">
          {release.platform}
        </Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs">
            {release.distribution_type} | {release.region}
          </Typography>
          <Typography level="body-xs">
            Release Date: {release.release_date}
          </Typography>
          <Typography level="body-xs">
              Publishers:{" "}
              {release.publishers.map((publisher) => publisher.name).join(", ")}
            </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};

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
    <Container maxWidth="lg" sx={{ marginTop: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {releases.map((release) => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </Box>
    </Container>
  );
};


export default Releases;
