import React, { useState, useMemo } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthProvider';
import { useActivities } from './hooks/useActivities';
import { ActivityList } from './components/ActivityList';
import { ActivityFilters } from './components/ActivityFilters';
import { CreateActivityForm } from './components/CreateActivityForm';
import { AuthForm } from './components/AuthForm';
import { Plus, Trophy, Loader2, AlertCircle, RefreshCw, LogOut } from 'lucide-react';

const Header = ({ onOpenForm, view, onViewChange }) => {
    const { logout, user } = useAuth();
    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onViewChange('upcoming')}>
                        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                            <Trophy className="text-white w-6 h-6" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent italic leading-tight">
                                SportLink
                            </h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                                {user?.email || "Connect & Play"}
                            </p>
                        </div>
                    </div>

                    <nav className="hidden md:flex bg-slate-100 p-1 rounded-xl">
                        <button
                            onClick={() => onViewChange('upcoming')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${view === 'upcoming' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            正在進行
                        </button>
                        <button
                            onClick={() => onViewChange('history')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${view === 'history' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            歷史紀錄
                        </button>
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={onOpenForm}
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-2xl font-bold flex items-center hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                    >
                        <Plus className="w-5 h-5 mr-1" /> <span className="hidden xs:inline">發布活動</span>
                    </button>
                    <button
                        onClick={logout}
                        className="p-2.5 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-all border border-slate-200"
                        title="登出"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};

const AppContent = () => {
    const { user, loading: authLoading, error: authError } = useAuth();
    const { activities, loading: activitiesLoading, createActivity, joinActivity, closeActivity, deleteActivity, updateActivity } = useActivities();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [view, setView] = useState('upcoming'); // 'upcoming' | 'history'
    const [editingActivity, setEditingActivity] = useState(null);

    // Filtering states
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const filteredActivities = useMemo(() => {
        const now = new Date();
        return activities.filter(activity => {
            const matchRegion = !selectedRegion || activity.region === selectedRegion;
            const matchType = !selectedType || activity.type === selectedType;

            // Time filtering
            const activityDate = new Date(activity.time);
            const isPast = activityDate < now;
            const matchTime = view === 'upcoming' ? !isPast : isPast;

            return matchRegion && matchType && matchTime;
        });
    }, [activities, selectedRegion, selectedType, view]);

    const handleCreateOrUpdate = async (data) => {
        if (editingActivity) {
            await updateActivity(editingActivity.id, data);
            alert("修改成功！");
        } else {
            await createActivity(data);
            alert("發布成功！");
        }
        setEditingActivity(null); // Reset after submit
    };

    const handleEditClick = (activity) => {
        setEditingActivity(activity);
        setIsFormOpen(true);
    };

    const handleOpenCreate = () => {
        setEditingActivity(null);
        setIsFormOpen(true);
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <p className="text-slate-500 font-bold animate-pulse">正在載入...</p>
            </div>
        );
    }

    if (!user) {
        return <AuthForm />;
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-6 animate-in fade-in duration-700">
            <Header onOpenForm={handleOpenCreate} view={view} onViewChange={setView} />

            <main className="max-w-7xl mx-auto">
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                            {view === 'upcoming' ? '探索鄰近活動' : '歷史活動回顧'}
                        </h2>
                        <p className="text-slate-500 font-medium">
                            {view === 'upcoming' ? '加入運動行列，結交新球友！' : '查看已結束的活動記錄'}
                        </p>
                    </div>
                </div>

                <ActivityFilters
                    selectedRegion={selectedRegion}
                    onRegionChange={setSelectedRegion}
                    selectedType={selectedType}
                    onTypeChange={setSelectedType}
                />

                {activitiesLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                    </div>
                ) : (
                    <ActivityList
                        activities={filteredActivities}
                        onJoin={joinActivity}
                        onCloseActivity={closeActivity}
                        onDeleteActivity={deleteActivity}
                        onEditActivity={handleEditClick}
                    />
                )}
            </main>

            <CreateActivityForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleCreateOrUpdate}
                initialData={editingActivity}
            />

            <footer className="mt-24 text-center">
                <div className="w-12 h-1 bg-slate-200 mx-auto rounded-full mb-6" />
                <p className="text-slate-400 font-bold text-sm">© 2024 SportLink · 精誠合作，連動你我</p>
                <div className="mt-4 flex justify-center space-x-2">
                    <span className="bg-white border border-slate-200 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                        UID: {user.uid.substring(0, 8)}
                    </span>
                    <span className="bg-indigo-50 border border-indigo-100 text-indigo-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {user.email}
                    </span>
                </div>
            </footer>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
