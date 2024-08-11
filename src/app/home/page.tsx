
import { Card, Typography } from "@mui/material";
import style from "./home.module.css";
import Session from "@/service/Session";
import Budgets from "./Budgets";

export default function Home() {
    const user = Session.getUser();

    return (
        <Card className={style.homeCard} variant="outlined">
            <Typography variant="h4">Bosawas Home</Typography>
            <br />
            <Typography variant="body1">
                Welcome <strong>{user?.data.name}</strong>!
            </Typography>
            <br />
            <Budgets />
        </Card>
    );
}
