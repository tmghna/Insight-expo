import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "./auth-context";

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/auth");
      }
    }
  }, [user, loading]);

  return null; // or splash/loading screen while redirecting
}
