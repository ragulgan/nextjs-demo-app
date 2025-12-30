import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Dashboard: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after login
    router.push("/home");
  }, [router]);

  return null;
};

export default Dashboard;

