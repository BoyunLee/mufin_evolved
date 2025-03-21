import { History, TransactionType } from "@prisma/client";

export interface IHistoryRepository {
    findHistoriesByUserId(userId: string): Promise<History[]>;
    createHistory(userId: string, stockId: number, transactionType: TransactionType, price?: number, quantity?: number): Promise<History>;
    deleteHistory(historyId: number): Promise<History>;    
}