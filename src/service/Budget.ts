import { API, BudgetSummary } from "ynab"
import Environment from "@/util/Environment";

export default class Budget {
    /** ynab client */
    private static readonly _ynabClient = new API(Environment.getServerValue("ynabToken"));
    
    public static async fetchAll(): Promise<BudgetSummary[]> {
        const res = await this._ynabClient.budgets.getBudgets();
        res.data.budgets.forEach((b) => {
            console.log(b)
        })

        return res.data.budgets;
    }
}