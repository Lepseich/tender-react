import { useState } from 'react';
import type { ITender, IUser } from '../types';
import { useParams, useNavigate } from 'react-router-dom';




export interface TenderDetailProps {
    tenders: ITender[];
    currentUser: IUser | null;
}



const TenderDetail = ({ tenders, currentUser }: TenderDetailProps) => {
    const { tenderId } = useParams<{ tenderId: string }>();
    const tender = tenders.find(t => {
        return t.id.toString() === tenderId;
    })
    const navigate = useNavigate();





    return (
        <div>
            <button onClick={() => navigate(-1)}>Назад</button>
            {tender ? (<div>
                <h1>Назва: {tender.title}</h1>
                <p>Бюджет: {tender.budget.toLocaleString()} ₴</p>
                <h2 className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${tender.status === 'active' ? 'bg-green-50 text-green-600' :
                    tender.status === 'closed' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                    }`}>{tender.status}</h2>
                {currentUser?.role === 'user' && (
                    <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-colors shadow-lg shadow-blue-200 active:scale-95 duration-200 mt-15'>Подати заявку</button>
                )}
            </div>) : (<h1>Тендер не знайдено</h1>)}

        </div>
    )
}
export default TenderDetail