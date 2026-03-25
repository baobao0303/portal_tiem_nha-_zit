export interface SignalRHub {
  connect(): void;
  close(): void;
  getSignalRAs<T extends SignalRHub>(): T;
}

export type EventHandler<T> = (response: T) => void;
