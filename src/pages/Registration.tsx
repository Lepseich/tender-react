import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom'; import { mockUsers } from '../data/mockData';


const registerSchema = z.object({
    email: z.email({ message: "Це не схоже на пошту" }),
    username: z.string().min(3, { message: "Ім'я повинно містити більше 3-х символів" }),
    password: z.string().min(6, { message: "Пароль має бути не менше 6 символів" }),
    confirmPassword: z.string().min(6, { message: "Пароль має бути не менше 6 символів" }),
    role: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Паролі не збігаються",
        path: ["confirmPassword"],
    });


type RegisterFields = z.infer<typeof registerSchema>;

interface RegisterProps {
    onReg: (user: any) => void;
}
const Registration = ({ onReg }: RegisterProps) => {
    const { register, handleSubmit, formState: { errors } } =
        useForm<RegisterFields>({
            resolver: zodResolver(registerSchema)
        });
    const navigate = useNavigate();
    const onSubmit = (data: RegisterFields) => {
        const newUser = {
            id: Date.now(),
            name: data.username,
            email: data.email,
            role: data.role,
            avatar: '#',
        }
        onReg(newUser);
        console.log('Новый пользователь создан');
        navigate('/');
    }
    return (
        <div className='flex items-center justify-center min-h-screen '>
            <form action="" onSubmit={handleSubmit(onSubmit)} className='flex items-center flex-col w-md justify-center gap-7 shadow-2xl rounded-[2.5rem] p-15 bg-white'>
                <h1 className='text-3xl font-black text-slate-800 mb-8 text-center uppercase'>Registration</h1>

                <input type="text" placeholder='Введіть username:'{...register('username')} className='bg-slate-100 p-3 pr-20 rounded-2xl w-full border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-700 placeholder:text-slate-400' />
                {errors.username && <span className="text-red-500 text-xs ml-2">{errors.username.message}</span>}
                <input type="text" placeholder='Введіть email:'{...register('email')} className='bg-slate-100 p-3 pr-20 rounded-2xl w-full border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-700 placeholder:text-slate-400' />
                {errors.email && <span className="text-red-500 text-xs ml-2">{errors.email.message}</span>}
                <select {...register('role')} className='bg-slate-100 p-3 rounded-2xl w-full border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-700 outline-none cursor-pointer'>
                    <option value="user">👤 Шукаю роботу</option>
                    <option value="company">🏢 Шукаю партнерів / Компанія</option>
                </select>
                <input type="password" placeholder='Введіть пароль:'{...register('password')} className='bg-slate-100 p-3 pr-20 rounded-2xl w-full border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-700 placeholder:text-slate-400' />
                {errors.password && <span className="text-red-500 text-xs ml-2">{errors.password.message}</span>}
                <input type="password" placeholder='Підтвердіть пароль: '{...register('confirmPassword')} className='bg-slate-100 p-3 pr-20 rounded-2xl w-full border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all duration-200 text-slate-700 placeholder:text-slate-400' />
                {errors.confirmPassword && <span className="text-red-500 text-xs ml-2">{errors.confirmPassword.message}</span>}


                <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-colors shadow-lg shadow-blue-200 active:scale-95 duration-200 mt-15'>Увійти</button>
            </form>
        </div>
    )
}



export default Registration;