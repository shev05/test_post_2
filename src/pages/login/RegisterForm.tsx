import { TextFormField } from '../../components/ui/textFromField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema, type RegisterFormValues } from '../../shared/constants/scheme'
import { getInitialRegisterUser, registerUserDto } from '../../features/user/helpers/userHelpers'
import { useRegisterMutation } from '../../services/api/auth/authEnpoints'
import { hashPassword } from './Hash/hashPassword'
import toast from 'react-hot-toast'
import { TOAST_TEXT } from '../../shared/constants/text/ToastText'
import { InputType } from '../../shared/constants/enum/input'
import { Button } from '../../components/ui/Button'

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: getInitialRegisterUser(),
  })

  const [registerUser, { isLoading }] = useRegisterMutation()

  async function onSubmit(values: RegisterFormValues) {
    try {
      const hashedPassword = await hashPassword(values.password)
      const regUser = registerUserDto(values, hashedPassword)
      await registerUser(regUser).unwrap()
      toast.success(TOAST_TEXT.REGISTER)
    } catch (error) {
      console.error(error)
      toast.error(TOAST_TEXT.REGISTER_ERROR)
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
          label="Имя"
          placeholder="Введите имя"
          register={register('fullName')}
          type={InputType.TEXT}
          error={errors.fullName?.message}
        />
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
        {isLoading ? 'Регистрация...' : 'Регистрация'}
      </Button>
    </form>
  )
}
