import { FileBO, ContactBO } from '@application/messages';
import { MessageActive } from '@application/base';

export class MessageHelper {
  public static readonly UNREAD_MESSAGE_THRESHOLD = 5;
  public static readonly TYPING_DEBOUNCE = 10000;

  /**
   * Updates a message in the list of active messages.
   *
   * @param {MessageActive[]} messages - The list of active messages.
   * @param {string} messageId - The ID of the message to be updated.
   * @param {MessageActive} updatedMessage - The updated message object.
   * @returns {MessageActive[]} The updated list of active messages.
   */
  public static updateMessageInList(messages: MessageActive[], messageId: string, updatedMessage: MessageActive): MessageActive[] {
    return messages.map((item) => (item.message.id === messageId ? updatedMessage : item));
  }

  /**
   * Updates the media files in a list of messages by adding new media files to the specified message.
   *
   * @param {MessageActive[]} messages - The list of messages to update.
   * @param {string} messageId - The ID of the message to update.
   * @param {FileBO[]} newMedias - The new media files to add to the message.
   * @returns {MessageActive[]} - The updated list of messages with the new media files added to the specified message.
   */
  public static updateMediasInList(messages: MessageActive[], messageId: string, newMedias: FileBO[]): MessageActive[] {
    return messages.map((message) => {
      if (message.message.id === messageId) {
        return {
          ...message,
          message: {
            ...message.message,
            medias: Array.from(new Set([...message.message.medias, ...newMedias])),
          },
        };
      }
      return message;
    });
  }

  /**
   * Updates the replies count and senders list for a specific parent message in the current list of messages.
   *
   * @param {MessageActive[]} current - The current list of active messages.
   * @param {string} parentMessageId - The ID of the parent message to update.
   * @param {number} totalReplies - The total number of replies to the parent message.
   * @param {ContactBO[]} senders - The list of contacts who have sent replies to the parent message.
   * @returns {MessageActive[]} - The updated list of active messages with the specified parent message updated.
   */
  public static updateRepliesInList(current: MessageActive[], parentMessageId: string, totalReplies: number, senders: ContactBO[]): MessageActive[] {
    return current.map((message) => {
      if (message.message.id === parentMessageId) {
        return {
          ...message,
          message: { ...message.message, countMessageChildren: totalReplies, senders: senders },
        };
      }
      return message;
    });
  }
  /**
   * Removes all HTML tags from the given message string.
   * This helps prevent potential XSS (Cross-Site Scripting) attacks
   * and ensures that only plain text is retained.
   *
   * @param message - The input string that may contain HTML tags.
   * @returns A sanitized string with all HTML tags removed.
   */
  public static cleanMessage(message: string): string {
    return message.replace(/<[^>]*>/g, ''); // Remove all HTML tags*
  }
}
