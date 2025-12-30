import React from "react";
import { Box, Typography, Paper, Grid, Card, CardContent } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";

const AboutPage: React.FC = () => {
  const features = [
    {
      title: "Quality Education",
      description: "We provide world-class education with experienced faculty and modern facilities.",
      icon: <SchoolIcon sx={{ fontSize: 48, color: "primary.main" }} />,
    },
    {
      title: "Expert Faculty",
      description: "Our faculty members are industry experts with years of teaching experience.",
      icon: <GroupsIcon sx={{ fontSize: 48, color: "primary.main" }} />,
    },
    {
      title: "Achievements",
      description: "Recognized for excellence in education and student achievements.",
      icon: <EmojiEventsIcon sx={{ fontSize: 48, color: "primary.main" }} />,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <InfoIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          About Us
        </Typography>
      </Box>

      <Paper sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to Our College
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Our college is dedicated to providing exceptional education and fostering academic
          excellence. We strive to create an environment where students can grow intellectually,
          personally, and professionally.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          With state-of-the-art facilities, experienced faculty, and a comprehensive curriculum,
          we prepare our students for successful careers in their chosen fields.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Our commitment to excellence has made us a leading institution in higher education,
          recognized for innovation, research, and student success.
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
        Our Features
      </Typography>

      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                p: 2,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3, mt: 3, backgroundColor: "primary.main", color: "white" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Mission Statement
        </Typography>
        <Typography variant="body1">
          To empower students with knowledge, skills, and values that enable them to contribute
          meaningfully to society and achieve their personal and professional goals.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AboutPage;

