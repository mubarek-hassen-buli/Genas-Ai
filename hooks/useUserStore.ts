import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Initial user profile data
const initialUserProfile = {
  name: 'Hayatuden Jemal',
  email: 'orhanbeymf23@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  plan: 'Premium',
  renewalDate: 'July 17, 2025',
  progress: 0.7, // 70% of subscription period
};

export interface UserState {
  profile: typeof initialUserProfile;
  updateProfile: (data: Partial<typeof initialUserProfile>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: initialUserProfile,
      updateProfile: (data) => set((state) => ({
        profile: {
          ...state.profile,
          ...data
        }
      })),
    }),
    {
      name: 'user-storage',
      storage: Platform.OS !== 'web' 
        ? createJSONStorage(() => AsyncStorage) 
        : createJSONStorage(() => localStorage),
    }
  )
);