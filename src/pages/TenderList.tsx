import { mockTenders } from '../data/mockData';
import { useState } from 'react';

const TenderList = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTenders = mockTenders.filter(t => {
        const tlc = t.title.toLowerCase();
        return tlc.includes(searchQuery.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Доступні тендери</h1>
                
                <input 
                    type="text" 
                    placeholder="Пошук за назвою..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md p-4 mb-10 bg-white rounded-2xl shadow-sm border border-slate-100 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-700"
                />

                <div className="grid gap-6">
                    {filteredTenders.map(t => ( 
                        /* ИСПОЛЬЗУЕМ t.id В КАЧЕСТВЕ КЛЮЧА */
                        <div key={t.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <span className="text-xl font-bold text-slate-800">{t.title}</span>
                                <span className="text-blue-600 font-semibold">{t.budget.toLocaleString()} ₴</span>
                            </div>
                            
                            <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                t.status === 'active' ? 'bg-green-50 text-green-600' : 
                                t.status === 'closed' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                            }`}>
                                {t.status}
                            </div>
                        </div>
                    ))}

                    {filteredTenders.length === 0 && (
                        <p className="text-center text-slate-400 mt-10">Нічого не знайдено за вашим запитом...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TenderList; 