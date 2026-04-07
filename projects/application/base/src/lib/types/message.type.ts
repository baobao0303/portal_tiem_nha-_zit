import { MessageBO, ContactBO } from '@application/messages';

/**
 * Type representing different types of messages.
 *
 * @type {string}
 * @property {'Normal'} Normal - Represents a normal message.
 * @property {'DateSeparator'} DateSeparator - Represents a date separator message.
 * @property {'CreateChannel'} CreateChannel - Represents a message for creating a channel.
 * @property {'UpdateChannel'} UpdateChannel - Represents a message for updating a channel.
 * @property {'AddParticipants'} AddParticipants - Represents a message for adding participants.
 * @property {'DeleteParticipant'} DeleteParticipant - Represents a message for deleting a participant.
 */
export type MessageType = 'Normal' | 'DateSeparator' | 'CreateChannel' | 'UpdateChannel' | 'AddParticipants' | 'DeleteParticipant';

/**
 * Represents the payload data for a message.
 *
 * @property {MessageBO} message - The message object.
 * @property {ContactBO} sender - The contact of the sender.
 * @property {boolean} byMe - Indicates if the sender is the current user.
 */
export type MessagePayload = {
  message?: MessageBO;
  sender?: ContactBO;
  byMe: boolean;
  // Add more properties here
};

/**
 * Represents the payload data for a channel.
 *
 * @property {string} channelId - The ID of the channel.
 * @property {string} channelName - The name of the channel.
 */
export type ChannelAddParticipantType = {
  Id: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
};

/**
 * Represents the type of loading messages in a chat.
 *
 * - 'prepend': Load messages before the current set (older messages).
 * - 'appended': Load messages after the current set (newer messages).
 * - 'initializing': Load the initial set of messages.
 */
export type LoadMessageType = 'prepended' | 'appended' | 'initializing';

/**
 * Represents the state of a message in the chat.
 *
 * @property {MessageBO} message - The message object.
 * @property {ContactBO} sender - The contact of the sender.
 * @property {string} channelId - The ID of the channel where the message was sent.
 */
export type MessageActive = {
  message: MessageBO;
  sender: ContactBO;
  channelId: string;
};

/**
 * Represents the state of messages by channel.
 *
 * @property {number} activePage - The current active page number.
 * @property {number} totalPages - The total number of pages available.
 * @property {number} totalItems - The total number of items/messages.
 * @property {number} pageSize - The number of items/messages per page.
 * @property {MessageActive[]} messages - An array of message active.
 */
export type MessageByChannelPagingActive = {
  activePage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  messages: MessageActive[];
};
