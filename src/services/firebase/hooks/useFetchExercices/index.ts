import { useState } from "react";
import firestore from "@react-native-firebase/firestore";

import { FIRESTORE } from "../../../../constants";

import { Exercice } from "../../../../types";

const exercicesCollection = firestore().collection(
  FIRESTORE.COLLECTIONS.EXECICES,
);

export function useFetchExercices() {
  const [exercices, setExercices] = useState<Exercice[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchExercices = async () => {
    setIsFetching(true);

    try {
      const querySnapshot = await exercicesCollection.get();

      const data = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Exercice;
      });

      setExercices(data);
    } catch {
      throw new Error("Não foi possível buscar as tortas");
    } finally {
      setIsFetching(false);
    }
  };

  return {
    exercices,
    isFetching,
    fetchExercices,
  };
}
