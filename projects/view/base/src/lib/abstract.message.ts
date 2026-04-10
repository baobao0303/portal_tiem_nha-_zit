import { ElementRef, inject, InputSignal } from '@angular/core';
import { MessagePayload, MessageType } from '@application/base';
import { MessageBO, ContactBO } from '@application/messages';
import { LocalizedFullNameContext } from './contexts';
import { ViewAction } from './view.render.registry';

export abstract class AbstractMessage implements ViewAction {
  /** The data input signal for the component. */
  public abstract readonly data: InputSignal<MessagePayload>;

  /** The localized full name context. */
  protected readonly localizedFullNameContext = inject(LocalizedFullNameContext);

  /** Helper method to get the element reference of the component. */
  protected readonly elementRef = inject(ElementRef);

  /** The type of the message. */
  protected getMessageType(): MessageType {
    return 'Normal';
  }

  /** Helper method to get the message from the data input. */
  public getMessage(): MessageBO | undefined {
    return this.data().message;
  }

  /** Helper method to get the sender from the data input. */
  public getSender(): ContactBO | undefined {
    return this.data().sender;
  }

  /** Helper method to get whether the message is from the current user. */
  public byMe(): boolean {
    return this.data().byMe;
  }

  /** Returns the message to display. */
  protected abstract display(): any;

  /**
   * Sets the tabindex attribute of the native element.
   *
   * @param value - The tabindex value to set.
   */
  public setTabIndex(value: number): void {
    this.elementRef?.nativeElement.setAttribute('tabindex', value.toString());
  }

  /**
   * Sets the focus state of the component.
   *
   * @param focused - A boolean indicating whether the component should be focused (true) or blurred (false).
   */
  public setFocused(focused: boolean): void {
    if (focused) {
      this.elementRef?.nativeElement.focus();
    } else {
      this.elementRef?.nativeElement.blur();
    }
  }

  /**
   * Sets the disabled attribute on the native element.
   *
   * @param disabled - A boolean value indicating whether the element should be disabled.
   */
  public setDisabled(disabled: boolean): void {
    this.elementRef?.nativeElement.setAttribute('disabled', disabled.toString());
  }

  /**
   * Scrolls the element into view.
   *
   * @param options - Optional parameter to specify the scroll behavior and block/inline alignment.
   *                  It follows the ScrollIntoViewOptions interface.
   *                  Example: { behavior: 'smooth', block: 'start' }
   */
  public scrollIntoView(options?: ScrollIntoViewOptions): void {
    this.elementRef?.nativeElement.scrollIntoView(options);
  }

  /**
   * Toggles a CSS class on the native element of the component.
   *
   * @param className - The name of the CSS class to toggle.
   * @param add - A boolean indicating whether to add or remove the class.
   *              If true, the class will be added. If false, the class will be removed.
   */
  public toggleClass(className: string, add: boolean): void {
    const element = this.elementRef?.nativeElement;
    if (add) {
      element?.classList.add(className);
    } else {
      element?.classList.remove(className);
    }
  }
}
