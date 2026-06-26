"use client";

import React, { useState, useEffect } from "react";
import { useGetMembers } from "../hooks";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface TeamDetailMemberProps {
  teamId?: number;
}

const TeamDetailMember = ({ teamId }: TeamDetailMemberProps) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // Reset page to 1 when search query changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data: responseData, isLoading, error } = useGetMembers({
    teamId: teamId || 0,
    page,
    limit,
    search: debouncedSearch,
    enabled: !!teamId,
  });

  const members = responseData || [];

  // Determine pagination state.
  // Next is disabled if we returned less than the limit.
  const hasNextPage = members.length === limit;
  const hasPreviousPage = page > 1;

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPreviousPage) {
      setPage((prev) => prev - 1);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const getTeamRoleBadge = (role: string) => {
    const r = role?.toUpperCase();
    if (r === "OWNER") {
      return (
        <Badge variant="default" className="bg-indigo-600 hover:bg-indigo-600 text-white font-medium">
          Owner
        </Badge>
      );
    }
    if (r === "ADMIN") {
      return (
        <Badge variant="default" className="bg-blue-600 hover:bg-blue-600 text-white font-medium">
          Admin
        </Badge>
      );
    }
    return <Badge variant="secondary">Member</Badge>;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filters & Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Input
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Icons.search className="size-4 text-muted-foreground" />}
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[280px]">Member</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>System Role</TableHead>
              <TableHead>Team Role</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading Skeleton matching cell layout to prevent cumulative layout shift
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-10 rounded-full" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-44" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-6 w-16 rounded-md" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-6 w-16 rounded-md" />
                  </TableCell>
                  <TableCell className="py-3">
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center gap-1 py-4 text-destructive">
                    <Icons.alertCircle className="size-6" />
                    <Typography as="p" variant="label-sm" className="font-semibold">
                      Failed to load members
                    </Typography>
                    <Typography as="p" variant="paragraph-xs" className="text-muted-foreground">
                      {(error as any)?.message || "An unexpected error occurred."}
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 py-8">
                    <div className="bg-muted flex size-12 items-center justify-center rounded-full">
                      <Icons.user className="text-muted-foreground size-6" />
                    </div>
                    <Typography as="p" variant="label-md" className="font-semibold">
                      No members found
                    </Typography>
                    <Typography as="p" variant="paragraph-sm" className="text-muted-foreground">
                      {search ? "No members match your search parameters." : "This team has no members."}
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarImage src={member.avatar} alt={member.fullName} />
                        <AvatarFallback>{getInitials(member.fullName)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <Typography as="span" variant="label-sm" className="font-medium truncate">
                          {member.fullName}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-muted-foreground text-sm font-medium">
                    {member.email}
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge variant="outline" className="capitalize">
                      {member.role?.toLowerCase() || "member"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">
                    {getTeamRoleBadge(member.teamRole)}
                  </TableCell>
                  <TableCell className="py-3">
                    {member.isVerified ? (
                      <Badge variant="success" className="gap-1">
                        <Icons.check className="size-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-muted-foreground">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {members.length > 0 && (
        <div className="flex items-center justify-between px-2 py-2">
          <div className="text-muted-foreground text-sm">
            Page {page}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={!hasPreviousPage || isLoading}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={!hasNextPage || isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { TeamDetailMember };
