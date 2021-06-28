import { CookieSetOptions } from "universal-cookie";

export type IRefresher = ({ onError }: { onError: () => void }) => void;

export type IRefreshToken = (
    name: string,
    _: any,
    options?: CookieSetOptions | undefined,
    refresher?: IRefresher,
) => void;
