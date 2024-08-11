"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme";
import { Box } from "@mui/material";
import Drawer from "./global/HomeDrawer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <Box sx={{ display: "grid", gridTemplateColumns: "150px 1fr"}}>
                            <Drawer />
                            {children}
                        </Box>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
