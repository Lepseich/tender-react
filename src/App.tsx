import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css'
import { mockUsers } from './data/mockData';
import type { IUser } from './types';
import TenderList from './pages/TenderList'

function App() {
  const [currentUser, setCurrentUser] = useState<IUser | null>(mockUsers[0]);

  return (
    <>
      {/* 2. НАВБАР (пишем над Routes, чтобы он был виден всегда) */}
      <nav className="flex gap-6 p-4 bg-white shadow-sm border-b border-slate-100 justify-center items-center">

        {/* Обычная ссылка, доступная всем */}
        <NavLink to="/" className="text-slate-600 font-bold">Тендери</NavLink>

        {/* УСЛОВИЕ: Показываем только если роль админ */}
        {currentUser?.role === 'admin' && (
          <NavLink to="/admin" className="text-red-500 font-bold">Адмін-панель</NavLink>
        )}

        {/* УСЛОВИЕ: Показываем только если роль компания */}
        {currentUser?.role === 'company' && (
          <NavLink to="/create" className="text-blue-500 font-bold">Створити тендер</NavLink>
        )}
        {currentUser && (
          <span>"Привіт, {currentUser?.name}"</span>
        )}
        {currentUser && (
          <button
            onClick={() => setCurrentUser(null)}
            className="ml-4 text-xs font-medium text-slate-400 hover:text-rose-500 transition-colors"
          >
            Вихід
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<TenderList />} />
        {/* Сюда потом добавим маршруты для админки и создания тендеров */}
      </Routes>
    </>
  );
}

export default App
