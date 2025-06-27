
import React, { useState } from 'react';
import { RoleSelector } from '../components/RoleSelector';
import { Dashboard } from '../components/Dashboard';
import { Header } from '../components/Header';

export type UserRole = 'editor' | 'reviewer' | 'client' | null;

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      {!selectedRole ? (
        <RoleSelector onRoleSelect={setSelectedRole} />
      ) : (
        <Dashboard role={selectedRole} onRoleChange={setSelectedRole} />
      )}
    </div>
  );
};

export default Index;
