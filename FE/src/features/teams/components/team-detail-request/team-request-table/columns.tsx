'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Icons } from '@/components/icons';
import { Column, ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { ITeamMember } from '@/features/teams/types';
import { formatDate } from '@/lib/format';

function getInitials(name: string) {
  if (!name) return '?';

  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

function TeamRoleBadge({ role }: { role: string }) {
  const normalizedRole = role?.toUpperCase();

  if (normalizedRole === 'OWNER') {
    return (
      <Badge
        variant='default'
        className='bg-indigo-600 font-medium text-white hover:bg-indigo-600'
      >
        Owner
      </Badge>
    );
  }

  if (normalizedRole === 'ADMIN') {
    return (
      <Badge variant='default' className='bg-blue-600 font-medium text-white hover:bg-blue-600'>
        Admin
      </Badge>
    );
  }

  return <Badge variant='secondary'>Member</Badge>;
}

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
          <AvatarFallback>{getInitials(row.original.fullName)}</AvatarFallback>
        </Avatar>
        <span className='truncate font-medium'>{row.original.fullName}</span>
      </div>
    ),
    meta: {
      label: 'Member',
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
    id: 'role',
    accessorKey: 'role',
    enableSorting: false,
    header: ({ column }: { column: Column<ITeamMember, unknown> }) => (
      <DataTableColumnHeader column={column} title='System Role' />
    ),
    cell: ({ cell }) => (
      <Badge variant='outline' className='capitalize'>
        {cell.getValue<ITeamMember['role']>()?.toLowerCase() || 'member'}
      </Badge>
    )
  },

];
