import { Injectable } from '@angular/core';
import { SignalRConstant } from './signalr.constant';
import { SignalRHubBase } from './signalr.hub.base';
import { GetUnreadNotificationResponse, NotificationBO, UpdateAvatarContactBO } from '@application/messages';
import { EventHandler } from './signalr.hub';

@Injectable({ providedIn: 'root' })
export class NotificationSignalRHub extends SignalRHubBase {
  public override getPath(): string {
    return SignalRConstant.NOTIFICATION_HUB;
  }
  public onReceiveNotification(handler: EventHandler<NotificationBO>) {
    this.on(SignalRConstant.RECEIVE_NOTIFICATION, (response: any) => {
      try {
        const mappedResponse: NotificationBO = { ...response };
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for ReceiveMessage:', error);
      }
    });
  }
  public onReadNotification(handler: EventHandler<GetUnreadNotificationResponse>) {
    this.on(SignalRConstant.READ_NOTIFICATION, (response: any) => {
      try {
        const mappedResponse: GetUnreadNotificationResponse = { ...response };
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for ReadNotifications:', error);
      }
    });
  }
  public onUpdateAvatarContact(handler: EventHandler<UpdateAvatarContactBO>) {
    this.on(SignalRConstant.UPDATE_CONTACT_AVATAR_HUB, (response: any) => {
      try {
        const mappedResponse: UpdateAvatarContactBO = { ...response };
        handler(mappedResponse);
      } catch (error) {
        console.error('Error mapping response for AvatarUrl:', error);
      }
    });
  }
}
