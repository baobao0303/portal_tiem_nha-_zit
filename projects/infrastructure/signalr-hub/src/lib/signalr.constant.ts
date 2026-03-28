export class SignalRConstant {
  public static readonly MESSAGE_HUB = 'message-hub';
  public static readonly CHANNEL_HUB = 'channel-hub';
  public static readonly NOTIFICATION_HUB = 'notification-hub';
  public static readonly UPDATE_CONTACT_AVATAR_HUB = 'UpdateContactAvatar';

  // Notifications events
  public static readonly RECEIVE_NOTIFICATION = 'ReceiveNotification';
  public static readonly READ_NOTIFICATION = 'ReadNotifications';

  // Chat events
  public static readonly RECEIVE_MESSAGE = 'ReceiveMessage';
  public static readonly RECEIVE_THREAD_MESSAGE = 'ReceiveThreadMessage';
  public static readonly RECEIVE_LAST_MESSAGE = 'ReceiveLastMessage';
  public static readonly RECEIVE_LAST_THREAD_MESSAGE = 'ReceiveLastThreadMessage';
  public static readonly GET_LAST_MESSAGE_IN_CHANNEL = 'GetLastMessageInChannel';
  public static readonly LAST_MESSAGE_IN_CHANNEL = 'LastMessageInChannel';
  public static readonly COUNT_UNREAD_MESSAGE = 'CountUnreadMessage';
  public static readonly TOTAL_UNREAD_MESSAGE_IN_CHANNEL = 'TotalUnreadMessageInChannel';
  public static readonly USER_TYPING = 'UserTyping';
  public static readonly USER_STOPPED_TYPING = 'UserStoppedTyping';
  public static readonly START_TYPING_MESSAGE = 'StartTypingMessage';
  public static readonly STOP_TYPING_MESSAGE = 'StopTypingMessage';
  public static readonly USER_READ_MESSAGES = 'UserReadMessages';
  public static readonly READ_MESSAGES = 'ReadMessages';
  public static readonly REACT_TO_MESSAGE = 'ReactToMessage';
  public static readonly USER_REACT_TO_MESSAGE = 'UserReactToMessage';
  public static readonly DELETE_REACTION = 'DeleteReaction';
  public static readonly USER_DELETE_REACTION = 'UserDeleteReaction';
  public static readonly GET_MESSAGE_BY_ID = 'GetMessageById';
  public static readonly MESSAGE_BODY = 'MessageBody';
  public static readonly GET_MEDIAS_BY_MESSAGE_ID = 'GetMediasByMessageId';
  public static readonly MESSAGE_MEDIAS = 'MessageMedias';
  public static readonly GET_REPLIES_BY_MESSAGE_ID = 'GetRepliesByMessageId';
  public static readonly MESSAGE_REPLIES = 'MessageReplies';

  // Channel events
  public static readonly CREATE_CHANNEL = 'CreateChannel';
  public static readonly UPDATE_CHANNEL = 'UpdateChannel';
  public static readonly ADD_PARTICIPANTS = 'AddParticipants';
  public static readonly DELETE_PARTICIPANT = 'DeleteParticipant';
}
