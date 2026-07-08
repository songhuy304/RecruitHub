import { ENotificationType, INotification } from '../types';
import type { Notification } from './store';
import type { NotificationAction } from '@/components/ui/notification-card';

export const mapApiNotification = (apiNotif: INotification): Omit<Notification, 'id'> & { id: string } => {
  let actions: NotificationAction[] | undefined = undefined;

  if (
    apiNotif.type === ENotificationType.INVITED_TO_TEAM ||
    apiNotif.type === ENotificationType.TEAM_INVITE
  ) {
    actions = [
      {
        id: 'view',
        label: 'View Workspaces',
        type: 'redirect',
        style: 'primary'
      }
    ];
  }

  return {
    id: String(apiNotif.id),
    title: apiNotif.title,
    body: apiNotif.content,
    status: apiNotif.isRead ? 'read' : 'unread',
    createdAt: apiNotif.createdAt || new Date().toISOString(),
    actions
  };
};
