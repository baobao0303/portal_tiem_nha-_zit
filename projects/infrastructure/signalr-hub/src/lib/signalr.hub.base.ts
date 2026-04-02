import { inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthorizationConstant } from '@infrastructure/authorization';
import { BROWSER_STORAGE } from '@infrastructure/base';
import * as SignalR from '@microsoft/signalr';
import { SignalRHub } from './signalr.hub';
export abstract class SignalRHubBase implements SignalRHub {
  private readonly _localStorage = inject(BROWSER_STORAGE);

  private _endPoint: string = '';
  private _hubConnection: SignalR.HubConnection | undefined;
  public connectionState = signal<boolean>(false);
  public connectionState$ = toObservable(this.connectionState);

  public get hubConnection(): SignalR.HubConnection | undefined {
    return this._hubConnection;
  }

  public isConnected(): boolean {
    return this.hubConnection?.state === SignalR.HubConnectionState.Connected;
  }

  /**
   * Establishes a SignalR connection to the specified hub.
   */
  public connect(): void {
    if (this._hubConnection) {
      console.warn(`[SignalR-Hub] Connection already exists for [${this.getPath()}].`);
      return;
    }

    const hubUrl = `${this._endPoint}/${this.getPath()}`;
    console.info(`[SignalR-Hub] Initializing connection to [${hubUrl}]...`);

    this._hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        withCredentials: true,
        transport: SignalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
        accessTokenFactory: () => this._localStorage.get(AuthorizationConstant.vato),
        // headers: {
        //   'Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        //   Authorization: 'Bearer ' + this._localStorage.get(AuthorizationConstant.vato),
        // },
      })
      .withAutomaticReconnect()
      .build();

    // Connection started event
    this._hubConnection.onreconnecting((error) => {
      console.warn(`[SignalR-Hub] Reconnecting to [${this.getPath()}]...`, error);
      this.connectionState.set(false);
    });

    // Reconnected event
    this._hubConnection.onreconnected((connectionId) => {
      console.info(`[SignalR-Hub] Reconnected to [${this.getPath()}] with connection ID: ${connectionId}`);
      this.connectionState.set(true);
    });

    // Start the connection
    this._hubConnection
      .start()
      .then(() => {
        this.connectionState.set(true);
      })
      .catch((error) => {
        console.error(`[SignalR-Hub] Failed to connect to [${this.getPath()}]:`, error);
        this._hubConnection = undefined;
        this.connectionState.set(false);
      });
  }

  public close(): void {
    if (!this._hubConnection) {
      console.warn(`[SignalR-Hub] No connection exists to close for [${this.getPath()}].`);
      return;
    }

    this._hubConnection
      .stop()
      .then(() => console.info(`[SignalR-Hub] Connection to [${this.getPath()}] hub closed.`))
      .catch((error) => console.error(`[SignalR-Hub] Error closing connection to [${this.getPath()}]:`, error))
      .finally(() => {
        this._hubConnection = undefined;
        this.connectionState.set(false);
      });
  }

  /**
   * Invokes a method on the SignalR hub.
   *
   * @param methodName - The name of the method to invoke on the hub.
   * @param args - The arguments to pass to the method.
   * @returns A promise that resolves with the result of the method invocation.
   * @throws Will reject the promise if no connection exists.
   */
  public invoke(methodName: string, ...args: any[]): Promise<any> {
    if (!this._hubConnection) {
      console.warn(`[SignalR-Hub] Cannot invoke method. No connection exists for [${this.getPath()}].`);
      return Promise.reject();
    }

    return this._hubConnection.invoke(methodName, ...args);
  }

  /**
   * Sends a message to the SignalR hub using the specified method name and arguments.
   *
   * @param methodName - The name of the method to invoke on the SignalR hub.
   * @param args - The arguments to pass to the method.
   *
   * @remarks
   * If there is no active connection to the SignalR hub, a warning will be logged and the message will not be sent.
   */
  public send(methodName: string, ...args: any[]): void {
    if (!this._hubConnection) {
      console.warn(`[SignalR-Hub] Cannot send message. No connection exists for [${this.getPath()}].`);
      return;
    }

    this._hubConnection.send(methodName, ...args);
  }

  /**
   * Registers a handler for a specified SignalR event.
   * @param methodName The name of the event.
   * @param action The handler function to execute when the event is triggered.
   */
  public on(methodName: string, action: (...args: any[]) => any): void {
    if (!this._hubConnection) {
      console.warn(`[SignalR-Hub] Cannot register handler. No connection exists for [${this.getPath()}].`);
      return;
    }

    this._hubConnection.on(methodName, action);
  }

  /**
   * Removes a handler for a specified SignalR event.
   * @param methodName The name of the event.
   * @param method The specific handler to remove (optional). If not provided, removes all handlers for the event.
   */
  public off(methodName: string, method?: (...args: any[]) => void): void {
    if (!this._hubConnection) {
      console.warn(`[SignalR-Hub] Cannot unregister handler. No connection exists for [${this.getPath()}].`);
      return;
    }

    if (method) {
      this._hubConnection.off(methodName, method);
    } else {
      this._hubConnection.off(methodName);
    }
  }

  public get endPoint(): string {
    return this._endPoint;
  }

  public set endPoint(endPoint: string) {
    this._endPoint = endPoint;
  }

  public getSignalRAs<T extends SignalRHub>(): T {
    return this as unknown as T;
  }

  public abstract getPath(): string;
}
