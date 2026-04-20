export interface IUser {
    id: number,
    name: string,
    email: string,
    role: 'user' | 'company' | 'admin',
    avatar: string,
}
export interface ITender {
    id: number,
    title: string,
    description: string, 
    budget: number,
    deadline: string,
    companyId: number,
    status: 'active' | 'closed' | 'pending',
}
export interface IBid {
    id: number,
    tenderId: number,
    userId: number,
    message: string,
    price: number,
    status: 'pending' | 'accepted' | 'rejected', 
}
