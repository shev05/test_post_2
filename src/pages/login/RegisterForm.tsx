import { TextFormField } from '../../components/ui/textFromField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema, type RegisterFormValues } from '../../shared/constants/scheme'
import { getInitialRegisterUser } from '../../features/user/helpers/userHelpers'

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: getInitialRegisterUser(),
  })

  async function onSubmit() {
    console.log('Форма отправлена')
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-sm"
    >
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Вход в аккаунт</h2>
        <p className="text-sm text-gray-500">Введите ваш email и пароль для входа</p>
      </div>

      <div className="space-y-4">
        <TextFormField
          label="Имя"
          placeholder="Введите имя"
          register={register('fullName')}
          type="text"
          error={errors.fullName?.message}
        />
        <TextFormField
          label="Почта"
          placeholder="Введите почту"
          register={register('email')}
          type="email"
          error={errors.email?.message}
        />

        <TextFormField
          label="Пароль"
          placeholder="Введите пароль"
          register={register('password')}
          type="password"
          error={errors.password?.message}
        />
        <TextFormField
          label="Возраст"
          placeholder="Введите возраст"
          register={register('age')}
          type="number"
          error={errors.age?.message}
        />
      </div>

      <button
        type="submit"
        className="focus:outline-none w-full rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        Войти
      </button>
    </form>
  )
}
