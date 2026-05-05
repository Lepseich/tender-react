import { useState } from 'react';
import type { ITender, IUser } from '../types';
import { Link } from 'react-router-dom';

export interface MyTendersProps {
    tenders: ITender[];
    currentUser: IUser | null;
}


const MyTenders = ({tenders, currentUser}: MyTendersProps) => {
    const currentUserTenders = tenders.filter(t => t.companyId === currentUser!.id);


    return(
        <div className="grid gap-6">
            <h1>Ваші тендери:</h1>
            {currentUserTenders.map(t => (
                <div key={t.id}>
                    <span>Назва: {t.title}</span>
                    <span>Бюджет: {t.budget}</span>
                </div>
            ))}
            {currentUserTenders.length === 0 && (
                <p className="text-center text-slate-400 mt-10">Ви ще не створили жодного тендера</p>
            )}
        </div>
    )
}




export default MyTenders