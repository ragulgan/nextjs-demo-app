import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Paper, Card, CardContent, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { fetchStudents } from "@/redux/slices/studentSlice";
import NextLink from "next/link";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state: any) => state.students);

  useEffect(() => {
    dispatch(fetchStudents({}) as any);
  }, [dispatch]);

  const stats = [
    {
      title: "Total Students",
      value: students?.length || 0,
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: "#1976d2",
      path: "/students",
    },
    {
      title: "Courses",
      value: "45",
      icon: <BookIcon sx={{ fontSize: 40 }} />,
      color: "#2e7d32",
      path: "/courses",
    },
    {
      title: "Faculty",
      value: "89",
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      color: "#ed6c02",
      path: "/faculty",
    },
    {
      title: "Departments",
      value: "12",
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: "#9c27b0",
      path: "/departments",
    },
    {
      title: "Enrollments",
      value: "234",
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      color: "#008755",
      path: "/enrollments",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
        Welcome to College Dashboard
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: 3,
        }}
      >
        {stats.map((stat, index) => (
          <NextLink href={stat.path} passHref legacyBehavior key={index}>
            <Link underline="none">
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                  <Box sx={{ color: stat.color, mb: 2, display: "flex", justifyContent: "center" }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1, color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </NextLink>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 3,
          mt: 3,
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Quick Overview
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Welcome to the College Management System. Here you can manage students, courses, faculty,
            departments, enrollments, and all aspects of college administration.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Use the sidebar navigation to access different sections of the application:
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <li>
              <strong>Students:</strong> Manage student records, enrollment, and academic information
            </li>
            <li>
              <strong>Courses:</strong> Create and manage course offerings and curriculum
            </li>
            <li>
              <strong>Faculty:</strong> Manage faculty members and their assignments
            </li>
            <li>
              <strong>Departments:</strong> Organize academic departments and structure
            </li>
            <li>
              <strong>Enrollments:</strong> Handle student course enrollments and registrations
            </li>
          </Box>
        </Paper>
        <Paper sx={{ p: 3, backgroundColor: "primary.main", color: "white" }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            System Status
          </Typography>
          <Typography variant="body2" paragraph>
            All systems operational
          </Typography>
          <Typography variant="body2" paragraph>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default HomePage;

