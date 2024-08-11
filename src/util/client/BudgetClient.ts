import { BudgetSummary } from "ynab";

export default class BudgetClient {
    private _headers: Headers;

    constructor(headers: Headers) {
        this._headers = headers;
    }

    public async fetchAll(): Promise<BudgetSummary[]> {
        const res = await fetch("/api/budget", {
            method: "GET",
            headers: this._headers
        });
        const data = await res.json();

        return data.budgets;
    }
}