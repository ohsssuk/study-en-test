import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TestProgressState {
  answerSet: AnswerSetType[];
  timeSet: TimeSetType[];
  addAnswer: (answer: AnswerSetType) => void;
  addTime: (time: TimeSetType) => void;
  reset: () => void;
}

const useTestStore = create<TestProgressState>()(
  persist(
    (set) => ({
      answerSet: [],
      timeSet: [],
      addAnswer: (answer) =>
        set((state) => ({
          answerSet: [...state.answerSet, answer],
        })),
      addTime: (time) =>
        set((state) => ({
          timeSet: [...state.timeSet, time],
        })),
      reset: () =>
        set({
          answerSet: [],
          timeSet: [],
        }),
    }),
    {
      name: "testProgress",
    }
  )
);

export { useTestStore };
