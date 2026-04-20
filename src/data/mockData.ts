import type { IUser, ITender, IBid } from '../types';


export const mockTenders: ITender[] = [
    {
        id: 1,
        title: "Розробка мобільного додатку",
        description: 'test',
        budget: 1000000 ,
        deadline: '12-12-2012',
        companyId: 33,
        status: 'active',
    },
    {
        id: 2,
        title: "Дизайн логотипу",
        description: 'test',
        budget: 500000,
        deadline: '11-11-2012',
        companyId: 34,
        status: 'closed',
    },
    {
        id: 3,
        title: "Пошук постачальника кави",
        description: 'test',
        budget: 200000,
        deadline: '10-10-2012',
        companyId: 35,
        status: 'pending',
    },
]
export const mockUsers: IUser[]= [
    {
        id: 1,
        name: 'admin',
        email: '@gmail.com',
        role: 'admin',
        avatar: '#'
    },
        {
        id: 2,
        name: 'company',
        email: '@gmail.com',
        role: 'company',
        avatar: '#'
    },
    {
        id: 3,
        name: 'user',
        email: '@gmail.com',
        role: 'user',
        avatar: '#'    
    },

]
export const mockBids: IBid[]=[
    {
        id: 1,
        tenderId: 1,
        userId: 777,
        message: "test1",
        price: 10000,
        status: "pending",
    },{
        id: 2,
        tenderId: 2,
        userId: 777,
        message: "test2",
        price: 20000,
        status: "accepted",
    },{
        id: 3,
        tenderId: 3,
        userId: 777,
        message: "test3",
        price: 30000,
        status: "rejected",
    }
]
