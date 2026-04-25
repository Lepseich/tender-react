import { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css'
import { mockUsers, mockTenders, mockBids } from './data/mockData';
import type { IUser, ITender, IBid } from './types';
import TenderList from './pages/TenderList'
import Login from './pages/Login'
import Registration from './pages/Registration'
import ProtectedRoute from './components/ProtectedRoute'
import CreateTender from './pages/CreateTender';
import MyBids from './pages/MyBids';
import TenderDetail from './pages/TenderDetail';




function App() {
  const [currentUser, setCurrentUser] = useState<IUser | null>(mockUsers[0]);
  const [users, setUsers] = useState<IUser[]>(() => {
    const saved = localStorage.getItem('tender-users');
    return saved !== null ? JSON.parse(saved) : mockUsers;
  });
  const [tenders, setTenders] = useState(() => {
    const saved = localStorage.getItem('tender-posts');
    return saved !== null ? JSON.parse(saved) : mockTenders;
  });
  const [bids, setBids] = useState(() => {
    const saved = localStorage.getItem('bids-posts');
    return saved !== null ? JSON.parse(saved) : mockBids;
  });

  const addTender = (newTender: ITender) => {
    setTenders([...tenders, newTender]);
  }

  const handleRegister = (newUser: IUser) => {
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  }
  const handleAddBid = (newBid: IBid) => {
    setBids([...bids, newBid]);
  }


  useEffect(() => {
    localStorage.setItem('tender-users', JSON.stringify(users))
  }, [users]);
  useEffect(() => {
    localStorage.setItem('tender-posts', JSON.stringify(tenders))
  }, [tenders]);
  useEffect(() => {
    localStorage.setItem('bids-posts', JSON.stringify(bids))
  }, [bids]);
  return (
    <>

      <nav className="flex gap-6 p-4 bg-white shadow-sm border-b border-slate-100 justify-center items-center">


        <NavLink to="/" className="text-slate-600 font-bold">Тендери</NavLink>


        {currentUser?.role === 'admin' && (
          <NavLink to="/admin" className="text-red-500 font-bold">Адмін-панель</NavLink>
        )}


        {currentUser?.role === 'company' && (
          <NavLink to="/create" className="text-blue-500 font-bold">Створити тендер</NavLink>
        )}
        {currentUser?.role === 'user' && (
          <NavLink to="/my-bids" className="text-blue-500 font-bold">Мої заявки</NavLink>
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
        <Route path="/" element={<TenderList tenders={tenders}/>} />
        <Route path="/registration" element={<Registration onReg={handleRegister} />} />
        <Route path="/login" element={<Login onLogin={setCurrentUser} allUsers={users} />} />
        <Route path="/admin" element={
          <ProtectedRoute user={currentUser} requiredRole="admin">
            <h1 className=" text-3xl">Секретная панель админа 🔐</h1>
          </ProtectedRoute>
        } />

        <Route path="/create" element={
          <ProtectedRoute user={currentUser} requiredRole="company">
            <CreateTender onAddTender={addTender} currentUserId={currentUser!.id} />
          </ProtectedRoute>
        } />
        <Route path="/my-bids" element={
          <ProtectedRoute user={currentUser} requiredRole="user">
            <MyBids currentUser={currentUser!} allBids={bids}></MyBids>
          </ProtectedRoute>
        } />
        <Route path='/tender/:tenderId' element={
          <ProtectedRoute user={currentUser}>
            <TenderDetail onAddBid={handleAddBid} tenders={tenders} currentUser={currentUser!} allBids={bids}></TenderDetail>
          </ProtectedRoute>
        }/>
      </Routes>
    </>   
  );
}

export default App
