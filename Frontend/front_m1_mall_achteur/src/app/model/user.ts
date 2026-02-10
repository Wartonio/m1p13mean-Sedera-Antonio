export interface User {
    _id: string;
    nom: string;
    email: string;
    role: string;
    status: string;
    password: string;
    boutiqueId?: string;
}