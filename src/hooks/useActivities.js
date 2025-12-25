import { useState, useEffect, useCallback } from 'react';
import {
    collection,
    query,
    onSnapshot,
    addDoc,
    serverTimestamp,
    runTransaction,
    doc,
    orderBy,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../contexts/AuthProvider';

// Hardcoded appId for the current demonstration as per requirements
const appId = "sportlink-demo";
const COLLECTION_PATH = `artifacts/${appId}/public/data/activities`;

export const useActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const q = query(
            collection(db, COLLECTION_PATH),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setActivities(docs);
            setLoading(false);
        }, (error) => {
            console.error("Firestore sync error:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const createActivity = useCallback(async (activityData) => {
        if (!user) throw new Error("Must be logged in to create activity");

        const newActivity = {
            ...activityData,
            currentJoined: 0,
            createdAt: serverTimestamp(),
            creatorId: user.uid,
            status: 'active',
        };

        return await addDoc(collection(db, COLLECTION_PATH), newActivity);
    }, [user]);

    const joinActivity = useCallback(async (activityId) => {
        if (!user) throw new Error("Must be logged in to join");

        const activityRef = doc(db, COLLECTION_PATH, activityId);

        try {
            await runTransaction(db, async (transaction) => {
                const activityDoc = await transaction.get(activityRef);
                if (!activityDoc.exists()) {
                    throw new Error("Activity does not exist!");
                }

                const data = activityDoc.data();
                const maxSpots = parseInt(data.maxSpots);
                const currentJoined = data.currentJoined || 0;

                if (currentJoined >= maxSpots) {
                    throw new Error("活動已額滿！");
                }

                // Check if user already joined (Optional but good practice)
                // For this demo, we'll just increment currentJoined. 
                // Real apps should store user IDs in a sub-collection.

                transaction.update(activityRef, {
                    currentJoined: currentJoined + 1
                });
            });
            return true;
        } catch (error) {
            console.error("Transaction failed: ", error);
            throw error;
        }
    }, [user]);

    const closeActivity = useCallback(async (activityId) => {
        if (!user) throw new Error("Must be logged in to close activity");
        const activityRef = doc(db, COLLECTION_PATH, activityId);
        return await updateDoc(activityRef, { status: 'closed' });
    }, [user]);

    const deleteActivity = useCallback(async (activityId) => {
        if (!user) throw new Error("Must be logged in to delete activity");
        const activityRef = doc(db, COLLECTION_PATH, activityId);
        return await deleteDoc(activityRef);
    }, [user]);

    const updateActivity = useCallback(async (activityId, data) => {
        if (!user) throw new Error("Must be logged in to update activity");
        const activityRef = doc(db, COLLECTION_PATH, activityId);
        return await updateDoc(activityRef, data);
    }, [user]);

    return { activities, loading, createActivity, joinActivity, closeActivity, deleteActivity, updateActivity };
};
