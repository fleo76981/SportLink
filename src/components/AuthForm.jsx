import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { LogIn, UserPlus, Mail, Lock, Loader2, Trophy } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localLoading, setLocalLoading] = useState(false);
    const { login, register, error } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalLoading(true);
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password);
            }
        } catch (err) {
            // Error is handled in context and displayed via error state
        } finally {
            setLocalLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-100 mb-4 animate-bounce-subtle">
                        <Trophy className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent italic mb-2">
                        SportLink
                    </h1>
                    <p className="text-slate-400 font-medium">
                        {isLogin ? "歡迎回來，立即登入" : "加入我們，開始運動"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                            <Mail className="w-5 h-5" />
                        </div>
                        <input
                            required
                            type="email"
                            placeholder="電子郵件"
                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                            <Lock className="w-5 h-5" />
                        </div>
                        <input
                            required
                            type="password"
                            placeholder="密碼"
                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="text-rose-500 text-sm font-bold bg-rose-50 px-4 py-3 rounded-xl border border-rose-100 flex items-center">
                            <div className="w-2 h-2 bg-rose-500 rounded-full mr-2 animate-pulse" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={localLoading}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center active:scale-95 disabled:opacity-50"
                    >
                        {localLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : isLogin ? (
                            <>
                                <LogIn className="w-5 h-5 mr-2" /> 登入
                            </>
                        ) : (
                            <>
                                <UserPlus className="w-5 h-5 mr-2" /> 註冊
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                    <p className="text-slate-400 font-medium">
                        {isLogin ? "還沒有帳號嗎？" : "已經有帳號了？"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 text-indigo-600 font-black hover:underline underline-offset-4"
                        >
                            {isLogin ? "立即註冊" : "返回登入"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
