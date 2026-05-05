import { useState } from 'react';
import type { ITender, IUser, IBid } from '../types';
import { useParams, useNavigate } from 'react-router-dom';




export interface TenderDetailProps {
    tenders: ITender[];
    currentUser: IUser | null;
    onAddBid: (bids: IBid) => void;
    allBids: IBid[];
    onChangeBidStatus: (bidId: number, newStatus: 'accepted' | 'rejected') => void;
}



const TenderDetail = ({ tenders, currentUser, onAddBid, allBids, onChangeBidStatus }: TenderDetailProps) => {

    const [bidPrice, setBidPrice] = useState<number>(0);
    const [bidMessage, setBidMessage] = useState('');
    const [isApplying, setIsApplying] = useState(false);
    const { tenderId } = useParams<{ tenderId: string }>();
    const tender = tenders.find(t => {
        return t.id.toString() === tenderId;
    })
    const navigate = useNavigate();

    const handleSubmitBid = () => {
        const newBid: IBid = {
            id: Date.now(),
            tenderId: tender!.id,
            userId: currentUser!.id,
            message: bidMessage,
            price: bidPrice,
            status: 'pending',
        }
        onAddBid(newBid);
        setIsApplying(false);
        navigate('/');
    }
    const hasAlreadyApplied = allBids.some((e) => e.tenderId === tender!.id &&  e.userId === currentUser!.id);
    const myCurrentBid = allBids.find(b => b.tenderId === tender!.id && b.userId === currentUser!.id);
    const isOwner = currentUser && currentUser.id === tender?.companyId ?  true : false ; 
    const tenderBids = allBids.filter(t => t.tenderId === tender!.id);


    return (
        <div>
            <button onClick={() => navigate(-1)}>Назад</button>
            {tender ? (<div>
                <h1>Назва: {tender.title}</h1>
                <p>Бюджет: {tender.budget.toLocaleString()} ₴</p>
                <h2 className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${tender.status === 'active' ? 'bg-green-50 text-green-600' :
                    tender.status === 'closed' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                    }`}>{tender.status}</h2>
                    {isOwner && ( <div> 
                        <h3>Список заявок на тендер</h3>
                        {tenderBids.map(bid => (
                            <div key={bid.id}>
                                <h3>Опис: {bid.message}</h3>
                                <h3>Бюджет: {bid.price} ₴</h3>
                                <button type="button" onClick={() => onChangeBidStatus(bid.id,'accepted' )}>Прийняти</button>
                                <button type="button" onClick={() => onChangeBidStatus(bid.id,'rejected')}>Відхилити</button>
                            </div>
                        ))}
                         </div> )}
                {!isApplying && currentUser?.role === 'user' && hasAlreadyApplied === false && tender.status !== 'closed' &&(
                    <button type="submit" onClick={() => setIsApplying(true)} className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-colors shadow-lg shadow-blue-200 active:scale-95 duration-200 mt-15'>Подати заявку</button>
                )}
                {currentUser?.role === 'user' && tender.status === 'closed' && (
                    <h1 className='text-2xl font-black text-slate-800 mb-8 text-center uppercase'>Прийом заявок завершено. Тендер закрито</h1>
                )}
                {isApplying && (
                    <div className="mt-8 bg-slate-50 p-6 rounded-3xl border border-slate-200">
                        <h1>Тут буде форма</h1>

                        <input type="number" value={bidPrice}  onChange={(e) => setBidPrice(Number(e.target.value))} placeholder='Введіть бюджет'/>
                        <textarea value={bidMessage} onChange={(e) => setBidMessage(e.target.value)}></textarea>
                        <button onClick={() => handleSubmitBid()}>Надіслати</button>
                        <button onClick={() => setIsApplying(false)}>Скасувати</button>
                    </div>
                )}
                {hasAlreadyApplied === true && (
                    <div>
                        <h1>Ви вже подали заявку на цей тендер ✅</h1>
                        <p>Ваша ціна: {myCurrentBid?.price} ₴</p>
                        <p>Ваше повідомлення: {myCurrentBid?.message}</p>
                    </div>
                )}


            </div>) : (<h1>Тендер не знайдено</h1>)}

        </div>
    )
}
export default TenderDetail