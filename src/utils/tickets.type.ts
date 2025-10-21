export interface TicketProps {
    id: string;
    name: string;
    status: string;
    created_at: Date | null;
    updated_at: Date | null;
    customerId:string;
    userId:string;
}