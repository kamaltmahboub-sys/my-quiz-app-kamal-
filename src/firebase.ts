import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocFromServer,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
  type Unsubscribe,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import type { Question } from './types';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null,
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate live connection to Firestore on boot
export async function testFirestoreConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'config', 'public'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

export function subscribeAuth(callback: (user: User | null) => void): Unsubscribe {
  return onAuthStateChanged(auth, callback);
}

export async function signInTeacherWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutTeacher(): Promise<void> {
  await signOut(auth);
}

export interface PublicPlatformConfig {
  accessCode: string;
  questionsPerPartQuiz: number;
  questionsPerComprehensive: number;
}

export function subscribePlatformConfig(
  onData: (cfg: PublicPlatformConfig | null) => void,
  onError?: (err: Error) => void,
): Unsubscribe {
  const path = 'config/public';
  return onSnapshot(
    doc(db, 'config', 'public'),
    (snap) => {
      if (!snap.exists()) {
        onData(null);
        return;
      }
      const data = snap.data();
      onData({
        accessCode: typeof data.accessCode === 'string' ? data.accessCode : '11111',
        questionsPerPartQuiz:
          typeof data.questionsPerPartQuiz === 'number' ? data.questionsPerPartQuiz : 10,
        questionsPerComprehensive:
          typeof data.questionsPerComprehensive === 'number' ? data.questionsPerComprehensive : 20,
      });
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.GET, path);
      } catch (wrapped) {
        if (onError && wrapped instanceof Error) onError(wrapped);
      }
    },
  );
}

export function subscribeQuestions(
  onData: (questions: Question[]) => void,
  onError?: (err: Error) => void,
): Unsubscribe {
  const path = 'questions';
  const q = query(collection(db, path), where('part', '>=', 1), where('part', '<=', 10));
  return onSnapshot(
    q,
    (snapshot) => {
      const list: Question[] = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: String(data.id ?? d.id),
          part: Number(data.part ?? 1),
          subPart: typeof data.subPart === 'number' ? Number(data.subPart) : undefined,
          qAr: String(data.qAr ?? ''),
          qEn: String(data.qEn ?? ''),
          optionsAr: Array.isArray(data.optionsAr) ? data.optionsAr.map(String) : ['', '', '', ''],
          optionsEn: Array.isArray(data.optionsEn) ? data.optionsEn.map(String) : ['', '', '', ''],
          correct: Number(data.correct ?? 0),
          expAr: String(data.expAr ?? ''),
          expEn: String(data.expEn ?? ''),
        };
      });
      list.sort(
        (a, b) =>
          a.part - b.part ||
          (a.subPart ?? 1) - (b.subPart ?? 1) ||
          a.id.localeCompare(b.id, undefined, { numeric: true }),
      );
      onData(list);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (wrapped) {
        if (onError && wrapped instanceof Error) onError(wrapped);
      }
    },
  );
}

function sanitizeQuestionPayload(q: Question, uid: string) {
  const cleanId = q.id.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 64) || `q_${Date.now()}`;
  const clampStr = (val: string, max: number, fallback = '') =>
    (val || fallback).trim().slice(0, max);

  const optsAr = [0, 1, 2, 3].map((i) => clampStr(q.optionsAr[i] ?? '', 500, `Option ${i + 1}`));
  const optsEn = [0, 1, 2, 3].map((i) => clampStr(q.optionsEn[i] ?? '', 500, `Option ${i + 1}`));

  return {
    id: cleanId.length >= 2 ? cleanId : `q_${cleanId}`,
    part: Math.min(10, Math.max(1, Math.round(q.part))),
    subPart: Math.min(10, Math.max(1, Math.round(q.subPart ?? 1))),
    qAr: clampStr(q.qAr, 2000, 'سؤال'),
    qEn: clampStr(q.qEn, 2000, 'Question'),
    optionsAr: optsAr,
    optionsEn: optsEn,
    correct: Math.min(3, Math.max(0, Math.round(q.correct))),
    expAr: clampStr(q.expAr, 2000, ''),
    expEn: clampStr(q.expEn, 2000, ''),
    updatedAt: serverTimestamp(),
    updatedBy: uid,
  };
}

export async function savePlatformConfig(cfg: PublicPlatformConfig): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('Authentication required');
  if (!/^\d{5}$/.test(cfg.accessCode)) throw new Error('Access code must be 5 digits');

  const path = 'config/public';
  try {
    await setDoc(doc(db, 'config', 'public'), {
      accessCode: cfg.accessCode,
      questionsPerPartQuiz: Math.min(50, Math.max(1, Math.round(cfg.questionsPerPartQuiz))),
      questionsPerComprehensive: Math.min(
        100,
        Math.max(1, Math.round(cfg.questionsPerComprehensive)),
      ),
      updatedAt: serverTimestamp(),
      updatedBy: user.uid,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function upsertQuestionInFirestore(q: Question): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('Authentication required');
  const payload = sanitizeQuestionPayload(q, user.uid);
  const path = `questions/${payload.id}`;
  try {
    await setDoc(doc(db, 'questions', payload.id), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteQuestionFromFirestore(questionId: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('Authentication required');
  const path = `questions/${questionId}`;
  try {
    await deleteDoc(doc(db, 'questions', questionId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function batchSyncQuestionsToFirestore(
  questions: Question[],
  deleteIds: string[] = [],
): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('Authentication required');

  const operations: Array<{ type: 'set' | 'delete'; id: string; payload?: ReturnType<typeof sanitizeQuestionPayload> }> = [];
  for (const id of deleteIds) {
    operations.push({ type: 'delete', id });
  }
  for (const q of questions) {
    const payload = sanitizeQuestionPayload(q, user.uid);
    operations.push({ type: 'set', id: payload.id, payload });
  }

  // Firestore batch limit is 500 writes per batch
  const CHUNK_SIZE = 450;
  for (let i = 0; i < operations.length; i += CHUNK_SIZE) {
    const chunk = operations.slice(i, i + CHUNK_SIZE);
    const batch = writeBatch(db);
    for (const op of chunk) {
      const ref = doc(db, 'questions', op.id);
      if (op.type === 'delete') {
        batch.delete(ref);
      } else if (op.payload) {
        batch.set(ref, op.payload);
      }
    }
    try {
      await batch.commit();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'questions');
    }
  }
}
