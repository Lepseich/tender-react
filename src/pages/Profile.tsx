import type { ITender, IUser, IBid } from '../types';

export interface ProfileProps {
    currentUser: IUser;
    tenders: ITender[];
    allBids: IBid[];
}



const Profile = ({ currentUser, tenders, allBids }: ProfileProps) => {
    const userTenders = tenders.filter(t => t.companyId === currentUser.id);
    const userBids = allBids.filter(b => b.userId === currentUser.id);








    return (
        <div>
            <div>
                <div className='flex flex-col items-center justify-self-center w-24 h-24 bg-slate-100 mt-10 mb-10'></div>
                <h1 className='text-3xl font-black text-slate-800 mb-8 text-center uppercase'>{currentUser.name[0]}</h1>

                <div className='bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between items-center max-w-4xl mx-auto px-4 py-10 space-y-4 mb-3'>
                    <h1 className='text-xl font-bold text-slate-800'>Ім'я: <span className='text-xl text-slate-600'> {currentUser.name}</span></h1>

                    <br />
                    <h1 className='text-xl font-bold text-slate-800'>Пошта: <span className='text-xl text-slate-600'> {currentUser.email}</span></h1>
                    <br />
                    <h1 className='text-xl font-bold text-slate-800'>Роль: <span className={`text-xl ${currentUser.role === 'user' ? 'text-blue-500' : currentUser.role === 'admin' ? 'text-red-500' : 'text-blue-500 font-bold'}`}> {currentUser.role.toUpperCase()}</span></h1>
                    <br />
                    {currentUser.role === 'company' && (
                        <span className='text-xl font-bold text-slate-800'>Кількість тендерів: {userTenders.length}</span>
                    )}
                    {currentUser.role === 'user' && (
                        <span className='text-xl font-bold text-slate-800'>Кількість поданих заявок: {userBids.length}</span>
                    )}
                </div>


            </div>
        </div>
    )
}
export default Profile