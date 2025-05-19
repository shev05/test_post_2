import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { LoginEnum, type LoginType } from '../../shared/constants/enum/LoginEnum'

export default function Login() {
  const [activeTab, setActiveTab] = useState<LoginType>(LoginEnum.LOGIN)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Добро пожаловать</h1>
          <p className="mt-2 text-lg text-gray-600">Войдите или создайте новый аккаунт</p>
        </div>
        <div className="rounded-lg p-6 shadow-md">
          <div className="grid grid-cols-2 gap-2 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab(LoginEnum.LOGIN)}
              className={`px-4 py-2 text-center font-medium transition-colors ${
                activeTab === LoginEnum.LOGIN
                  ? 'border-b-2 border-black text-black dark:border-white dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => setActiveTab(LoginEnum.REGISTER)}
              className={`px-4 py-2 text-center font-medium transition-colors ${
                activeTab === LoginEnum.REGISTER
                  ? 'border-b-2 border-black text-black dark:border-white dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Регистрация
            </button>
          </div>
          <div className="mt-4">
            {activeTab === LoginEnum.LOGIN && <LoginForm />}
            {activeTab === LoginEnum.REGISTER && <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  )
}
