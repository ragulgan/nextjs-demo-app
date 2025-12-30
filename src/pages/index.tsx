import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard - authentication check will happen in _app.tsx
    router.push("/dashboard");
  }, [router]);

  return null;
}
