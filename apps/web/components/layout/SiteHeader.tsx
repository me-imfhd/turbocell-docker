import React, { Suspense } from "react";
import { MainNav } from "./main-nav";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import UserProfileDropdown from "./user-profile-dropdown";
import { getServerSession } from "next-auth";
import { authOptions } from "@harborx/auth";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import ProfileHeader from "./profile-header";

const SiteHeader = async () => {
  const data = await getServerSession(authOptions);
  const user = data?.user;
  const initials = `${user?.name?.charAt(0) ?? ""}`;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav></MainNav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Suspense
              fallback={
                <Skeleton 
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "w-full bg-muted text-muted-foreground"
                  )}
                >Loading...</Skeleton>
              }
            >
              <ProfileHeader />
            </Suspense>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
