export interface User {
    id: string;
    nom: string;
    email: string;
    role: 'ADMIN' | 'BOUTIQUE' | 'ACHETEUR';
    status: string;
    boutiqueId?: string;
}