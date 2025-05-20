import { TextFormField } from '../../components/ui/textFromField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema, type LoginFormValues } from '../../shared/constants/scheme'
import { getInitialLoginUser, loginUserDto } from '../../features/user/helpers/userHelpers'
import { useLoginMutation } from '../../services/api/auth/authEnpoints'
import { hashPassword } from './Hash/hashPassword'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../shared/constants/route/routes'
import toast from 'react-hot-toast'
import { TOAST_TEXT } from '../../shared/constants/text/ToastText'
import { InputType } from '../../shared/constants/enum/input'
import { Button } from '../../components/ui/Button'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: getInitialLoginUser(),
  })

  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  async function onSubmit(values: LoginFormValues) {
    try {
      const hashedPassword = await hashPassword(values.password)
      const loginUser = loginUserDto(values, hashedPassword)
      await login(loginUser).unwrap()
      navigate(PATHS.HOME)
      toast.success(TOAST_TEXT.LOGIN)
    } catch (error) {
      toast.error(TOAST_TEXT.LOGIN_ERROR)
      console.error(error)
    }
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
          type={InputType.EMAIL}
          error={errors.email?.message}
        />

        <TextFormField
          label="Пароль"
          placeholder="Введите пароль"
          register={register('password')}
          type={InputType.PASSWORD}
          error={errors.password?.message}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-black text-white hover:bg-gray-800"
      >
        {isLoading ? 'Вход...' : 'Вход'}
      </Button>
    </form>
  )
}
