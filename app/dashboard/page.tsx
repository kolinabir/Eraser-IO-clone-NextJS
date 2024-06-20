"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useMutation, useQuery } from "convex/react";
import React, { useEffect } from "react";

const Dashboard = () => {
  const { user } = useKindeBrowserClient();
  const getUser = useQuery(api.user.getUser, { email: user?.email as string });

  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
    if (user) {
      console.log(getUser);
      if (getUser == undefined) {
        createUser({
          name: user.given_name as string,
          email: user.email as string,
          image: user.picture as string,
        }).then((res) => {
          console.log(res, "user created");
        });
      }
    }
  }, [user, getUser]);
  return (
    <div>
      <Button>
        {" "}
        <LogoutLink>Logout</LogoutLink>
      </Button>
    </div>
  );
};

export default Dashboard;
