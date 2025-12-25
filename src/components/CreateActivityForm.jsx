import React, { useState, useEffect } from 'react';
import { X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthProvider';

export const CreateActivityForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
    const { user } = useAuth();
    const defaultForm = {
        title: '',
        type: '羽球',
        region: '台北市',
        contactName: '',
        time: '',
        location: '',
        fee: '0',
        maxSpots: '4',
        contact: ''
    };

    const [formData, setFormData] = useState(defaultForm);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    title: initialData.title || '',
                    type: initialData.type || '羽球',
                    region: initialData.region || '台北市',
                    contactName: initialData.contactName || '',
                    time: initialData.time || '',
                    location: initialData.location || '',
                    fee: initialData.fee || '0',
                    maxSpots: initialData.maxSpots || '4',
                    contact: initialData.contact || ''
                });
            } else {
                setFormData({
                    ...defaultForm,
                    contactName: user?.displayName || user?.email?.split('@')[0] || ''
                });
            }
        }
    }, [isOpen, initialData, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            alert("操作失敗: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const isEdit = !!initialData;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-10 shadow-2xl relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute right-8 top-8 p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <X className="w-6 h-6 text-slate-400" />
                </button>

                <h3 className="text-2xl font-black mb-8 text-slate-800 italic">
                    {isEdit ? '編輯活動內容' : '發起新活動'}
                </h3>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
                    <div className="col-span-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">活動名稱</label>
                        <input
                            required
                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-700 placeholder-slate-300"
                            placeholder="如：週六下午熱血羽球"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">運動種類</label>
                        <select
                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                            value={formData.type}
                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                        >
                            {['羽球', '桌球', '籃球', '跑步', '健身', '排球'].map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">地區</label>
                        <select
                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                            value={formData.region}
                            onChange={e => setFormData({ ...formData, region: e.target.value })}
                        >
                            {['台北市', '新北市', '桃園市', '台中市', '高雄市', '台南市'].map(r => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">時間</label>
                        <input
                            required
                            type="datetime-local"
                            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-bold text-slate-700"
                            value={formData.time}
                            onChange={e => setFormData({ ...formData, time: e.target.value })}
                            onClick={(e) => e.target.showPicker()}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">詳細地點</label>
                        <input
                            required
                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-700 placeholder-slate-300"
                            placeholder="例如：大安運動中心"
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">費用 (元)</label>
                        <input
                            required
                            type="number"
                            min="0"
                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-700 placeholder-slate-300"
                            value={formData.fee}
                            onChange={e => setFormData({ ...formData, fee: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">最大人數</label>
                        <input
                            required
                            type="number"
                            min="1"
                            max="50"
                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-700 placeholder-slate-300"
                            value={formData.maxSpots}
                            onChange={e => setFormData({ ...formData, maxSpots: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">聯絡人稱呼 (預設為您的暱稱)</label>
                        <input
                            required
                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-700 placeholder-slate-300"
                            placeholder="如何稱呼您"
                            value={formData.contactName}
                            onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">聯絡方式 (Line/電話)</label>
                        <input
                            required
                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-slate-700 placeholder-slate-300"
                            placeholder="例如：Line ID: sport123"
                            value={formData.contact}
                            onChange={e => setFormData({ ...formData, contact: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="col-span-2 mt-4 w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "處理中..." : (isEdit ? "儲存修改" : "立即發布")}
                    </button>
                </form>
            </div>
        </div>
    );
};
