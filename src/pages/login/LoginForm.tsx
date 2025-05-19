import { TextFormField } from '../../components/ui/textFromField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema, type LoginFormValues } from '../../shared/constants/scheme'
import { getInitialLoginUser } from '../../features/user/helpers/userHelpers'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: getInitialLoginUser(),
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
