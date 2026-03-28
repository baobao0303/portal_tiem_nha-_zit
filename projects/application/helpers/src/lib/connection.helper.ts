import { ConnectionStatus } from '@application/base';

export class ConnectionHelper {
  public static readonly CONNECTION_ONLINE_STATUS = 0;
  public static readonly CONNECTION_OFFLINE_STATUS = 1;
  public static readonly CHANNEL_EXIST = 0;
  public static readonly CHANNEL_CREATED_SUCCESS = 1;

  /**
   * Returns the contact connection status as an AvatarEmblemOnlineStatus.
   *
   * @param connectionStatus - The numeric status of the connection.
   * @returns The corresponding AvatarEmblemOnlineStatus ('offline' or 'online'). [default: 'offline']
   */
  public static getContactConnectionStatus(connectionStatus?: number): ConnectionStatus {
    switch (connectionStatus) {
      case ConnectionHelper.CONNECTION_ONLINE_STATUS:
        return 'online';
      case ConnectionHelper.CONNECTION_OFFLINE_STATUS:
        return 'offline';
      default:
        return 'offline';
    }
  }
}
