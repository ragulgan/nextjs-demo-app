import React from "react";
import { Box, Typography, Paper, Grid, Card, CardContent, Chip } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";

const CoursesPage: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: "Computer Science Fundamentals",
      code: "CS101",
      instructor: "Dr. John Smith",
      students: 45,
      duration: "3 months",
      status: "Active",
      description: "Introduction to computer science concepts and programming fundamentals.",
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      code: "CS201",
      instructor: "Dr. Jane Doe",
      students: 38,
      duration: "4 months",
      status: "Active",
      description: "Advanced data structures and algorithm design techniques.",
    },
    {
      id: 3,
      title: "Web Development",
      code: "CS301",
      instructor: "Prof. Mike Johnson",
      students: 52,
      duration: "3 months",
      status: "Active",
      description: "Modern web development using React, Node.js, and databases.",
    },
    {
      id: 4,
      title: "Database Management",
      code: "CS401",
      instructor: "Dr. Sarah Williams",
      students: 42,
      duration: "3 months",
      status: "Active",
      description: "Database design, SQL, and database administration.",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <MenuBookIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Courses
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.code}
                    </Typography>
                  </Box>
                  <Chip label={course.status} color="success" size="small" />
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <PeopleIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      {course.students} Students
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      {course.duration}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ mt: 2, fontWeight: "medium" }}>
                  Instructor: {course.instructor}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CoursesPage;

