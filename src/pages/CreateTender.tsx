import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { mockTenders } from '../data/mockData';
import type { ITender } from '../types';


const tenderSchema = z.object({
    title: z.string().min(3, { message: 'Назва повинная містити більше 3-х сиволів' }),
    budget: z.number({ message: "Введіть число" }).positive({ message: "Ціна має бути більше 0" }),
    description: z.string().min(10, { message: 'Опис тендера повинен мати більше 10-ти символів' }),
    deadline: z.string(),
})

type TenderFields = z.infer<typeof tenderSchema>;

interface TenderProps {
    onAddTender: (tender: ITender) => void;
    currentUserId: number;
}



const CreateTender = ({ onAddTender, currentUserId }: TenderProps) => {
    const { register, handleSubmit, formState: { errors } } =
        useForm<TenderFields>({
            resolver: zodResolver(tenderSchema)
        });
    const navigate = useNavigate();
    const onSubmit = (data: TenderFields) => {
        const newTender: ITender = {
            id: Date.now(),
            title: data.title,
            description: data.description,
            budget: data.budget,
            deadline: data.deadline,
            companyId: currentUserId,
            status: 'active',
        }
        onAddTender(newTender);
        navigate('/');
    }



    return (
        <>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <h1>Назва Тендеру</h1>
                <input type="text" placeholder='Введіть назву: '{...register('title')}/>
                <h1>Бюджет</h1>
                <input type="number" placeholder='Введіть бюджет: ' {...register('budget', { valueAsNumber: true })}/>
                <h1>Опис</h1>
                <textarea placeholder='Опис: ' {...register('description')}></textarea>
                <h1>Дедлайн</h1>
                <input type="datetime-local" {...register('deadline')}/>
                <button type="submit">Опублікувати тендер</button>
            </form>
        </>
    );
} 
export default CreateTender