import React, { useState } from 'react';
import { PlusCircle, Send, X } from 'lucide-react';

export const CreateActivityForm = ({ onCreate, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        type: '羽球',
        region: '台北市',
        time: '',
        location: '',
        fee: '0',
        maxSpots: '4',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onCreate(formData);
            alert("活動成立！");
            onClose();
            setFormData({
                title: '',
                type: '羽球',
                region: '台北市',
                time: '',
                location: '',
                fee: '0',
                maxSpots: '4',
            });
        } catch (err) {
            alert("建立失敗：" + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <X className="w-6 h-6 text-slate-400" />
                </button>

                <h2 className="text-2xl font-black text-indigo-600 mb-6 flex items-center">
                    <PlusCircle className="mr-2" /> 發起活動
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-4">活動名稱</label>
                            <input
                                required
                                className="w-full px-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                placeholder="例如：熱血羽球團"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-4">類型</label>
                            <select
                                className="w-full px-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option>羽球</option>
                                <option>籃球</option>
                                <option>排球</option>
                                <option>健身</option>
                                <option>跑步</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-4">地區</label>
                            <select
                                className="w-full px-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none"
                                value={formData.region}
                                onChange={e => setFormData({ ...formData, region: e.target.value })}
                            >
                                <option>台北市</option>
                                <option>新北市</option>
                                <option>桃園市</option>
                                <option>台中市</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-4">時間</label>
                            <input
                                required
                                type="datetime-local"
                                className="w-full px-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                value={formData.time}
                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-4">詳細地點</label>
                            <input
                                required
                                className="w-full px-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                placeholder="例如：大安運動中心"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-4">費用 ($)</label>
                            <input
                                required
                                type="number"
                                className="w-full px-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                value={formData.fee}
                                onChange={e => setFormData({ ...formData, fee: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-4">人數上限</label>
                            <input
                                required
                                type="number"
                                className="w-full px-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                value={formData.maxSpots}
                                onChange={e => setFormData({ ...formData, maxSpots: e.target.value })}
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-4">團主聯絡方式 (Line/電話)</label>
                            <input
                                required
                                className="w-full px-6 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                                placeholder="例如：Line ID: sport123"
                                value={formData.contact}
                                onChange={e => setFormData({ ...formData, contact: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 mt-4 bg-indigo-600 text-white rounded-[1.5rem] font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center justify-center active:scale-[0.98]"
                    >
                        {loading ? "處理中..." : <><Send className="w-5 h-5 mr-2" /> 立即發布</>}
                    </button>
                </form>
            </div>
        </div>
    );
};
