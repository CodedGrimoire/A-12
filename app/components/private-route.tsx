"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/auth-context";

type Props = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        const redirect = encodeURIComponent(window.location.pathname);
        router.replace(`/login?redirect=${redirect}`);
      } else {
        setReady(true);
      }
    }
  }, [loading, user, router]);

  if (loading || (!ready && !user)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-600">
        Checking your session...
      </div>
    );
  }

  return <>{children}</>;
}
