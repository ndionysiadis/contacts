export interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    email: string | null;
    number: string | null;
    deleted_at?: string | null;
}
