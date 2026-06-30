'use client';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ITeamMember } from '@/features/teams/types';
import { formatDate } from '@/lib/format';
import { Column, ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ITeamMember>[] = [
  {
    id: 'name',
    accessorKey: 'fullName',
    header: ({ column }: { column: Column<ITeamMember, unknown> }) => (
      <DataTableColumnHeader column={column} title='User' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <Avatar className='size-10'>
          <AvatarImage src={row.original.avatar} alt={row.original.fullName} />
          <AvatarFallback>{(row.original.fullName)}</AvatarFallback>
        </Avatar>
        <span className='truncate font-medium'>{row.original.fullName}</span>
      </div>
    ),
    meta: {
      label: 'User',
      placeholder: 'Search members...',
      variant: 'text' as const,
      iconCustom: <Icons.search className='size-4' />
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      row.original.email
    )
  },

  {
    accessorKey: 'createdAt',
    header: 'Joined',
    cell: ({ row }) => (
      <span className='text-muted-foreground text-sm font-medium'>
        {formatDate(row.original.createdAt)}
      </span>
    )
  },
  {
    id: 'actions',
    header: ({ column }: { column: Column<ITeamMember, unknown> }) => (
      <div className='text-center'>
        Actions
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex gap-2 items-center justify-center'>
        <Button variant="success">
          <Icons.checks className='size-4' />
          Approve
        </Button >

        <Button variant="destructive">
          <Icons.xCircle className='size-4' />
          Reject
        </Button>
      </div >
    )
  }
];
