import React from 'react';
import { MapPin, Target, X } from 'lucide-react';

const REGIONS = ['全部地區', '台北市', '新北市', '桃園市', '台中市'];
const TYPES = ['全部種類', '羽球', '籃球', '排球', '健身', '跑步'];

export const ActivityFilters = ({
    selectedRegion,
    onRegionChange,
    selectedType,
    onTypeChange
}) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-500 group-hover:text-indigo-600 transition-colors pointer-events-none">
                    <MapPin className="w-5 h-5" />
                </div>
                <select
                    value={selectedRegion}
                    onChange={(e) => onRegionChange(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-white border-none rounded-[1.5rem] shadow-sm hover:shadow-md focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none font-bold text-slate-700 cursor-pointer"
                >
                    {REGIONS.map(reg => <option key={reg} value={reg === '全部地區' ? '' : reg}>{reg}</option>)}
                </select>
            </div>

            <div className="flex-1 relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-500 group-hover:text-indigo-600 transition-colors pointer-events-none">
                    <Target className="w-5 h-5" />
                </div>
                <select
                    value={selectedType}
                    onChange={(e) => onTypeChange(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-white border-none rounded-[1.5rem] shadow-sm hover:shadow-md focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none font-bold text-slate-700 cursor-pointer"
                >
                    {TYPES.map(type => <option key={type} value={type === '全部種類' ? '' : type}>{type}</option>)}
                </select>
            </div>

            {(selectedRegion || selectedType) && (
                <button
                    onClick={() => { onRegionChange(''); onTypeChange(''); }}
                    className="px-6 py-4 bg-slate-200 text-slate-600 rounded-[1.5rem] font-bold hover:bg-slate-300 transition-all active:scale-95 flex items-center justify-center"
                >
                    <X className="w-5 h-5 mr-2" /> 清除篩選
                </button>
            )}
        </div>
    );
};
