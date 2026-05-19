import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { create } from 'zustand';
import { auth, isFirebaseConfigured } from '../firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  authError: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
}

const demoCredentials = {
  email: 'dr.smith@carepulse.org',
  password: 'demo1234',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  authError: '',
  setUser: (user) => set({ user }),
  clearError: () => set({ authError: '' }),
  login: async (email, password) => {
    set({ loading: true, authError: '' });
    try {
      if (auth && isFirebaseConfigured) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (email !== demoCredentials.email || password !== demoCredentials.password) {
          throw new Error('Please provide valid credentials to continue.');
        }
        set({ user: { email, uid: 'demo-user' } as User });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed.';
      set({ authError: message });
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    if (auth && isFirebaseConfigured) {
      await signOut(auth);
    }
    set({ user: null });
  },
}));

let listenerInitialized = false;
export const initializeAuthListener = () => {
  if (!auth || !isFirebaseConfigured || listenerInitialized) {
    return;
  }
  listenerInitialized = true;
  onAuthStateChanged(auth, (user) => useAuthStore.getState().setUser(user));
};
