import React, { useState } from 'react';
import { Users, MapPin, Calendar, DollarSign, CheckCircle, Info, Lock, Trash2, Pencil } from 'lucide-react';
import { useAuth } from '../contexts/AuthProvider';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const ActivityList = ({ activities, onJoin, onCloseActivity, onDeleteActivity, onEditActivity, joiningId }) => {
    const [joinedIds, setJoinedIds] = useState(new Set());
    const { user } = useAuth();

    /* ... handleJoin, handleClose, handleDelete ... */
    const handleJoin = async (id) => {
        try {
            await onJoin(id);
            setJoinedIds(prev => new Set(prev).add(id));
            alert("報名成功！");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleClose = async (id) => {
        if (!confirm("確定要提早關閉活動嗎？關閉後將無法再報名。")) return;
        try {
            await onCloseActivity(id);
            alert("活動已成功關閉");
        } catch (err) {
            alert("關閉失敗：" + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("確定要「永久刪除」此活動嗎？此動作無法復原。")) return;
        try {
            await onDeleteActivity(id);
            alert("活動已刪除");
        } catch (err) {
            alert("刪除失敗：" + err.message);
        }
    };

    if (activities.length === 0) {
        return (
            <div className="text-center py-20 bg-white/50 rounded-[2rem] border-2 border-dashed border-indigo-200">
                <Info className="mx-auto w-12 h-12 text-indigo-300 mb-4" />
                <p className="text-indigo-600 font-medium text-lg">目前尚無活動，快去發起一個吧！</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => {
                const isFull = activity.currentJoined >= activity.maxSpots;
                const isClosed = activity.status === 'closed';
                const hasJoined = joinedIds.has(activity.id);
                const isCreator = user?.uid === activity.creatorId;

                return (
                    <div
                        key={activity.id}
                        className={cn(
                            "glass-card rounded-[2rem] p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group relative overflow-hidden",
                            isClosed && "opacity-75 grayscale-[0.5]"
                        )}
                    >
                        {isClosed && (
                            <div className="absolute top-0 right-0 bg-slate-800 text-white px-6 py-2 rounded-bl-3xl font-black text-xs uppercase flex items-center z-10 shadow-lg animate-in slide-in-from-top duration-500">
                                <Lock className="w-3 h-3 mr-2" /> 活動已關閉
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-4">
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                {activity.type}
                            </span>
                            <div className="flex items-center text-slate-500 text-sm">
                                <Users className="w-4 h-4 mr-1" />
                                <span>{activity.currentJoined} / {activity.maxSpots}</span>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                            {activity.title}
                        </h3>

                        <div className="space-y-2 mb-6 flex-grow">
                            <div className="flex items-center text-slate-600">
                                <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                                <span className="text-sm">{activity.region} · {activity.location}</span>
                            </div>
                            <div className="flex items-center text-slate-600">
                                <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                                <span className="text-sm">{activity.time}</span>
                            </div>
                            <div className="flex items-center text-slate-600">
                                <DollarSign className="w-4 h-4 mr-2 text-indigo-500" />
                                <span className="text-sm">{activity.fee === "0" ? "免費" : `$${activity.fee}`}</span>
                            </div>
                        </div>

                        <div className="mt-auto space-y-3">
                            <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                                <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1 flex items-center">
                                    <Info className="w-3 h-3 mr-1" /> 團主聯絡方式
                                </div>
                                <div className="text-sm font-bold text-indigo-700">
                                    {activity.contact || "暫無提供"}
                                </div>
                            </div>

                            {isCreator ? (
                                <div className="grid grid-cols-3 gap-2">
                                    {!isClosed && (
                                        <button
                                            onClick={() => onEditActivity(activity)}
                                            className="py-3 bg-indigo-100 text-indigo-600 rounded-2xl font-bold hover:bg-indigo-200 transition-all flex items-center justify-center border-2 border-indigo-100 text-xs"
                                        >
                                            <Pencil className="w-3 h-3 mr-1" /> 修改
                                        </button>
                                    )}
                                    {!isClosed && (
                                        <button
                                            onClick={() => handleClose(activity.id)}
                                            className="py-3 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all flex items-center justify-center border-2 border-slate-800 text-xs"
                                        >
                                            <Lock className="w-3 h-3 mr-1" /> 關閉
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(activity.id)}
                                        className={cn(
                                            "py-3 bg-red-100 text-red-600 rounded-2xl font-bold hover:bg-red-200 transition-all flex items-center justify-center border-2 border-red-100 text-xs",
                                            isClosed && "col-span-3 w-full"
                                        )}
                                    >
                                        <Trash2 className="w-3 h-3 mr-1" /> 刪除
                                    </button>
                                </div>
                            ) : null}

                            {!isCreator && (
                                isClosed ? (
                                    <div className="w-full py-3 bg-slate-200 text-slate-500 rounded-2xl font-bold text-center">
                                        活動已截止
                                    </div>
                                ) : hasJoined ? (
                                    <div className="flex items-center justify-center py-3 bg-green-50 text-green-600 rounded-2xl font-bold border border-green-200">
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        已報名
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleJoin(activity.id)}
                                        disabled={isFull || joiningId === activity.id}
                                        className={cn(
                                            "w-full py-3 rounded-2xl font-bold transition-all duration-300",
                                            isFull
                                                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-95"
                                        )}
                                    >
                                        {isFull ? "活動額滿" : "立即報名"}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
