"use client";
import { PropsWithChildren, useMemo } from "react";
import {
    UrqlProvider,
    ssrExchange,
    fetchExchange,
    createClient,
} from "@urql/next";
import { cacheExchange } from "@urql/exchange-graphcache"; //this for normalize caching it's like redux store for graphQL
import { url } from "@/utils/url";
import { getToken } from "@/utils/token";
const GqlProvider = ({ children }: PropsWithChildren) => {
    const [client, ssr] = useMemo(() => {
        /* the ssr ensure that  the cache  get's trasferred over  server side rendering to client side rendering  on hydration
        */
        const ssr = ssrExchange({
            isClient: typeof window !== "undefined",
        });
        const client = createClient({
            url,
            exchanges: [cacheExchange({}), ssr, fetchExchange],
            fetchOptions: () => {
                const token = getToken();
                return token
                    ? {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                    : {};
            },
        });
        return [client, ssr];
    }, []);
    return (
        <UrqlProvider client={client} ssr={ssr}>
            {children}
        </UrqlProvider>
    );
};

export default GqlProvider;
