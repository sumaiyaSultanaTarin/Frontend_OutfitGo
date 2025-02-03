"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
    else{
      setIsAuth(true);
    }
  }, []);

  if(!isAuth)
  {
    return<p>Loading...</p>
  }

  return <>{children}</>;
};
export default AuthGuard;
