"use client";

import { Button, Card, Typography } from "@mui/material";
import authenticate from "./action";
import AuthClient from "@/util/client/AuthClient";
import { FormEvent, useState } from "react";

export default function Signin() {
    const [cookie, setCookie] = useState<string>("");
    const hasSession = AuthClient.hasSession();

    console.log(hasSession);

    const clientLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cookie = await AuthClient.signin();
        setCookie(cookie);
    };

    return (
        <Card>
            <Typography variant="h3">Welcome to Bosawas</Typography>
            <Typography variant="body1">Please sign-in</Typography>
            {!hasSession ? (
                <form onSubmit={clientLogin}>
                    <Button type="submit" variant="outlined">
                        Sign-in
                    </Button>
                </form>
            ) : (
                <form onSubmit={() => authenticate(cookie)}>
                    <Button type="submit" variant="outlined">
                        Complete
                    </Button>
                </form>
            )}
        </Card>
    );
}
