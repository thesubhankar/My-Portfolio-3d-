import React, { useState } from 'react';
import { auth } from '../services/auth';
import { HiOutlineLockClosed, HiOutlineKey, HiX } from 'react-icons/hi';

const AdminLogin = ({ onLoginSuccess, onClose }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = auth.login(pin);
    if (res.success) {
      onLoginSuccess();
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-dark-900 border border-slate-800 p-6 shadow-2xl space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm"
        >
          <HiX className="text-lg" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-dark-800 border border-neon-pink/50 flex items-center justify-center text-neon-pink mx-auto shadow-neon-pink text-xl">
            <HiOutlineLockClosed />
          </div>
          <h3 className="font-mono text-base font-bold text-white">
            Admin Authentication
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Enter 4-digit security PIN to unlock the content management dashboard.
          </p>
        </div>

        {error && (
          <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 font-mono text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <div className="relative">
              <input
                type="password"
                required
                maxLength={8}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError('');
                }}
                placeholder="Enter PIN (Default: 1234)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-950 border border-slate-700 text-center font-mono text-base text-white tracking-widest placeholder:tracking-normal placeholder:text-xs placeholder-slate-500 focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink"
              />
              <HiOutlineKey className="absolute left-3.5 top-3 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-neon-pink text-white font-mono text-xs font-bold hover:bg-neon-pink/90 shadow-neon-pink transition-all active:scale-95"
          >
            Authenticate & Enter
          </button>
        </form>

        <div className="text-[10px] text-center font-mono text-slate-500">
          // Session protected · 256-bit client encryption
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
