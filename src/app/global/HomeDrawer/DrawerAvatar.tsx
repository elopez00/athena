import AuthClient from "@/util/client/AuthClient";
import {
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    Tooltip,
    Menu,
    MenuItem,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import { redirect, RedirectType } from "next/navigation";

export default function DrawerAvatar() {
    const user = AuthClient.getUser();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        AuthClient.logout();
        setAnchorEl(null);
        redirect("/auth", RedirectType.push);
    };

    return user ? (
        <>
            <List sx={{ flex: 0 }}>
                <Divider />
                <ListItem sx={{ display: "block" }} disablePadding>
                    <ListItemButton onClick={handleClick}>
                        <ListItemAvatar
                            sx={{ justifyContent: "center", padding: "15px 0" }}
                        >
                            <Tooltip title="Account">
                                <Avatar
                                    sx={{
                                        margin: "0 auto",
                                        height: "2.3rem",
                                        width: "2.3rem",
                                    }}
                                    src={user.data.avatar}
                                    alt={user.data.name}
                                />
                            </Tooltip>
                        </ListItemAvatar>
                    </ListItemButton>
                </ListItem>
            </List>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{
                    horizontal: 10,
                    vertical: "center",
                }}
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "center",
                }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    ) : null;
}
