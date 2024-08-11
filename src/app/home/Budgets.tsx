import Budget from "@/service/Budget";
import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";

export default async function Budgets() {
    const budgets = await Budget.fetchAll();
    

    return (
        <Box>
            <Typography variant="body1">Please pick a main budget:</Typography>
            <List>
                {budgets?.map((b) => (
                    <ListItemButton key={b.id}>
                        <Typography>{b.name}</Typography>
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}
