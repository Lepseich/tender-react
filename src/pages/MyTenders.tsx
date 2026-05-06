import type { ITender, IUser } from '../types';
import { Link } from 'react-router-dom';

export interface MyTendersProps {
    tenders: ITender[];
    currentUser: IUser | null;
}


const MyTenders = ({ tenders, currentUser }: MyTendersProps) => {
    const currentUserTenders = tenders.filter(t => t.companyId === currentUser!.id);


    return (
        <div className="min-h-screen bg-slate-50">
            <h1 className='text-2xl font-bold'>Ваші тендери:</h1>
            {currentUserTenders.map(t => (
                <Link key={t.id} to={`/tender/${t.id}`}>
                    <div className='bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex justify-between items-center max-w-4xl mx-auto px-4 py-10 space-y-4 mb-3'>
                        <div  className=' flex flex-col gap-2'>
                            <span className='text-xl font-bold text-slate-800'>{t.title}</span>
                            <span className='text-blue-600 font-semibold'>{t.budget.toLocaleString()} ₴</span>
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${t.status === 'active' ? 'bg-green-50 text-green-600' :
                            t.status === 'closed' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                            }`}>
                            {t.status}
                        </div>
                    </div>
                </Link>
            ))}
            {currentUserTenders.length === 0 && (
                <p className="text-center text-slate-400 mt-10">Ви ще не створили жодного тендера</p>
            )}
        </div>
    )
}




export default MyTenders