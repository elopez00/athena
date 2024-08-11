import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IDrawerButton {
    icon: JSX.Element;
    page: string;
}

export default function DrawerButton({ icon, page }: IDrawerButton) {
    const pathname = usePathname();

    return (
        <ListItem sx={{ display: "block", '& .MuiSvgIcon-root': { fontSize: "2.4rem"} }} disablePadding>
            <Link href={page}>
                <ListItemButton selected={pathname.includes(page)}>
                    <ListItemIcon
                        sx={{ justifyContent: "center", padding: "15px 0" }}
                    >
                        {icon}
                    </ListItemIcon>
                </ListItemButton>
            </Link>
        </ListItem>
    );
}
