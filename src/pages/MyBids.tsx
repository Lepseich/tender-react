import { useState } from 'react';
import type { IBid, IUser } from '../types';
import { mockBids } from '../data/mockData';


export interface MyBidsProps {
    currentUser: IUser;
    allBids: IBid[];
}

const MyBids = ({ currentUser, allBids }: MyBidsProps) => {
    if (!currentUser) return null;
    const myBids = allBids.filter(m => m.userId === currentUser.id);



    return (
        <>
            <h1>Мої заявки</h1>

            <div>
                {myBids.length === 0 ? (<h1>Ви ще не подали жодної заявки</h1>) : (myBids.map(t => (
                    <div key={t.id}>{t.message}{t.price}</div>
                )))}
            </div>
        </>
    )
}

export default MyBids