import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import type { IUser } from '../types';


const loginSchema = z.object({
    email: z.email({ message: "Це не схоже на пошту" }),
    password: z.string().min(6, { message: "Пароль має бути не менше 6 символів" }),
});


type LoginFields = z.infer<typeof loginSchema>;

interface LoginProps {
    onLogin: (user: any) => void;
    allUsers: IUser[];
}

const Login = ({ onLogin, allUsers }: LoginProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFields>({
        resolver: zodResolver(loginSchema)
    });
    const navigate = useNavigate();
    const onSubmit = (data: LoginFields) => {
        const eFind = allUsers.find(u => u.email === data.email);
        console.log('Данные из формы:', data);
        console.log('Список всех юзеров (пропс):', allUsers);
        if (eFind) {
            onLogin(eFind);
            navigate('/');
        } else {
            alert("Користувача не знайдено!");
        }
    }
    return (
        <div className='flex items-center justify-center min-h-screen '>
            <form action="" onSubmit={handleSubmit(onSubmit)} className='flex items-center flex-col w-md justify-center gap-7 shadow-2xl rounded-[2.5rem] p-15 bg-white'>
                <h1 className='text-3xl font-black text-slate-800 mb-8 text-center uppercase'>Login</h1>
                <input type="text" placeholder='Введіть email:'{...register('email')} className='bg-slate-100 p-3 pr-20 rounded-2xl w-full border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-700 placeholder:text-slate-400' />
                {errors.email && <span className="text-red-500 text-xs ml-2">{errors.email.message}</span>}
                <input type="password" placeholder='Введіть пароль:'{...register('password')} className='bg-slate-100 p-3 pr-20 rounded-2xl w-full border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-700 placeholder:text-slate-400' />
                {errors.password && <span className="text-red-500 text-xs ml-2">{errors.password.message}</span>}
                <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-colors shadow-lg shadow-blue-200 active:scale-95 duration-200 mt-15'>Увійти</button>
            </form>
        </div>
    )
}


export default Login