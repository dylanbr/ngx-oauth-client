export abstract class NgxOAuthStorage {
    abstract getItem(key: string): string | null;
    abstract removeItem(key: string): void;
    abstract setItem(key: string, data: string): void;
}

export interface NgxOAuthConfig {
  host: string;
  token?: string;
  key?: string;
  secret?: string;
  storage?: NgxOAuthStorage;
  storage_prefix?: string;
  storage_suffix?: string;
}
