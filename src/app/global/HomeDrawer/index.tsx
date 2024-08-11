import {
    Drawer,
    List,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WalletIcon from "@mui/icons-material/Wallet";
import SettingsIcon from "@mui/icons-material/Settings";
import DrawerButton from "./DrawerButton";
import DrawerAvatar from "./DrawerAvatar";

export default function HomeDrawer() {
    return (
        <Drawer
            open
            variant="permanent"
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <List sx={{ flex: 1 }}>
                <DrawerButton icon={<HomeIcon />} page="/home" />
                <DrawerButton icon={<WalletIcon />} page="/budgets" />
                <DrawerButton icon={<SettingsIcon />} page="/settings" />
            </List>
            <DrawerAvatar />
        </Drawer>
    );
}
