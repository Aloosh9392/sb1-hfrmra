import React, { useState } from 'react';
import { X, Camera, Mail, Phone, Facebook, Globe2, User, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';

interface SettingsProps {
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const { currentUser, updateUserProfile } = useStore();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    avatar: currentUser?.avatar || '',
    country: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    facebook: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">الإعدادات</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={formData.avatar || currentUser?.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-purple-500"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 ml-2" />
                الاسم
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الجنس</label>
              <div className="flex space-x-6 space-x-reverse">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="mr-2 text-gray-700">ذكر</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="mr-2 text-gray-700">أنثى</span>
                </label>
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Globe2 className="w-4 h-4 ml-2" />
                البلد
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4 ml-2" />
                العمر
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">ربط الحساب</h3>
              
              <div className="space-y-4">
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
                >
                  <span className="flex items-center">
                    <Mail className="w-5 h-5 ml-2" />
                    ربط البريد الإلكتروني
                  </span>
                  <span className="text-sm text-gray-500">غير مرتبط</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-2 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50"
                >
                  <span className="flex items-center">
                    <Phone className="w-5 h-5 ml-2" />
                    ربط رقم الهاتف
                  </span>
                  <span className="text-sm text-gray-500">غير مرتبط</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-2 border-2 border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-50"
                >
                  <span className="flex items-center">
                    <Facebook className="w-5 h-5 ml-2" />
                    ربط حساب فيسبوك
                  </span>
                  <span className="text-sm text-gray-500">غير مرتبط</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};