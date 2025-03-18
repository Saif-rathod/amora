import { useState, useEffect } from 'react';

export interface LovedOne {
  id: string;
  name: string;
  relationship: string;
  avatar: string;
  birthday: string;
  nextEvent?: string;
  notes?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  notifications?: {
    whatsapp: boolean;
    sms: boolean;
    email: boolean;
  };
  preferences?: {
    favoriteColors?: string[];
    interests?: string[];
    giftPreferences?: string;
  };
  occasions?: Array<{
    type: string;
    date: string;
    description?: string;
  }>;
}

const calculateNextEvent = (birthday: string): string => {
  const today = new Date();
  const thisYear = today.getFullYear();
  const [month, day] = birthday.split(' ');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthIndex = months.indexOf(month);
  
  if (monthIndex === -1) return 'Birthday not set';
  
  const nextBirthday = new Date(thisYear, monthIndex, parseInt(day));
  if (nextBirthday < today) {
    nextBirthday.setFullYear(thisYear + 1);
  }
  
  const diffTime = Math.abs(nextBirthday.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Birthday is today!';
  if (diffDays === 1) return 'Birthday tomorrow';
  if (diffDays < 7) return `Birthday in ${diffDays} days`;
  if (diffDays < 30) return `Birthday in ${Math.ceil(diffDays / 7)} weeks`;
  return `Birthday in ${Math.ceil(diffDays / 30)} months`;
};

export const useLovedOnes = () => {
  const [lovedOnes, setLovedOnes] = useState<LovedOne[]>([]);

  useEffect(() => {
    // Load loved ones from localStorage on mount
    const stored = localStorage.getItem('lovedOnes');
    if (stored) {
      setLovedOnes(JSON.parse(stored));
    }
  }, []);

  const addLovedOne = async (newLovedOne: Omit<LovedOne, 'id' | 'nextEvent'>) => {
    const lovedOne: LovedOne = {
      ...newLovedOne,
      id: Date.now().toString(),
      nextEvent: calculateNextEvent(newLovedOne.birthday)
    };

    const updatedLovedOnes = [...lovedOnes, lovedOne];
    setLovedOnes(updatedLovedOnes);
    localStorage.setItem('lovedOnes', JSON.stringify(updatedLovedOnes));
    return lovedOne;
  };

  const updateLovedOne = (id: string, updates: Partial<LovedOne>) => {
    const updatedLovedOnes = lovedOnes.map(lo => 
      lo.id === id 
        ? { 
            ...lo, 
            ...updates,
            nextEvent: updates.birthday ? calculateNextEvent(updates.birthday) : lo.nextEvent 
          }
        : lo
    );
    setLovedOnes(updatedLovedOnes);
    localStorage.setItem('lovedOnes', JSON.stringify(updatedLovedOnes));
  };

  const deleteLovedOne = (id: string) => {
    const updatedLovedOnes = lovedOnes.filter(lo => lo.id !== id);
    setLovedOnes(updatedLovedOnes);
    localStorage.setItem('lovedOnes', JSON.stringify(updatedLovedOnes));
  };

  return {
    lovedOnes,
    addLovedOne,
    updateLovedOne,
    deleteLovedOne
  };
};
