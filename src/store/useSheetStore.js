import { create } from "zustand";
import { v4 as uuid } from "uuid";

const useSheetStore = create((set) => ({
  topics: [],

  //  API LOAD 
  loadFromAPI: async () => {
    try {
      const res = await fetch(
        "https://corsproxy.io/?https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/striver-sde-sheet"
      );

      // IMPORTANT: handle blocked/403 responses
      if (!res.ok) {
        console.log("API blocked or failed:", res.status);
        return;
      }

      const json = await res.json();
      console.log("API RESPONSE:", json);

      const questions = json?.data?.questions || [];

      if (!questions.length) {
        console.log("No questions found from API");
        return;
      }

      // Build Topic -> Subtopic -> Questions structure
      const topicMap = {};

      questions.forEach((q) => {
        const topicName = q.topic || "General";
        const subName = q.sub_topic || "Misc";

        if (!topicMap[topicName]) {
          topicMap[topicName] = {
            id: crypto.randomUUID(),
            name: topicName,
            subtopics: {}
          };
        }

        if (!topicMap[topicName].subtopics[subName]) {
          topicMap[topicName].subtopics[subName] = {
            id: crypto.randomUUID(),
            name: subName,
            questions: []
          };
        }

        topicMap[topicName].subtopics[subName].questions.push({
          id: crypto.randomUUID(),
          title: q.title || "Question",
          solved: false
        });
      });

      const formatted = Object.values(topicMap).map((topic) => ({
        id: topic.id,
        name: topic.name,
        subtopics: Object.values(topic.subtopics)
      }));

      set({ topics: formatted });

    } catch (err) {
      console.log("API failed — app will work in manual mode");
    }
  },

  //  DRAG 
  reorderTopics: (newOrder) => set({ topics: newOrder }),

  reorderSubtopics: (topicId, newOrder) =>
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId ? { ...t, subtopics: newOrder } : t
      ),
    })),

  reorderQuestions: (topicId, subId, newOrder) =>
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              subtopics: t.subtopics.map((s) =>
                s.id === subId ? { ...s, questions: newOrder } : s
              ),
            }
          : t
      ),
    })),

  // TOPIC
  addTopic: (name) =>
    set((state) => ({
      topics: [...state.topics, { id: uuid(), name, subtopics: [] }],
    })),

  deleteTopic: (id) =>
    set((state) => ({
      topics: state.topics.filter((t) => t.id !== id),
    })),

  editTopic: (id, newName) =>
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === id ? { ...t, name: newName } : t
      ),
    })),

  //  SUBTOPIC 
  addSubtopic: (topicId, name) =>
    set((state) => ({
      topics: state.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              subtopics: [
                ...topic.subtopics,
                { id: uuid(), name, questions: [] },
              ],
            }
          : topic
      ),
    })),

  deleteSubtopic: (topicId, subId) =>
    set((state) => ({
      topics: state.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              subtopics: topic.subtopics.filter((s) => s.id !== subId),
            }
          : topic
      ),
    })),

  editSubtopic: (topicId, subId, newName) =>
    set((state) => ({
      topics: state.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              subtopics: topic.subtopics.map((sub) =>
                sub.id === subId ? { ...sub, name: newName } : sub
              ),
            }
          : topic
      ),
    })),

  //  QUESTION 
  addQuestion: (topicId, subId, title) =>
    set((state) => ({
      topics: state.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              subtopics: topic.subtopics.map((sub) =>
                sub.id === subId
                  ? {
                      ...sub,
                      questions: [
                        ...sub.questions,
                        {
                          id: uuid(),
                          title,
                          solved: false
                        }
                      ],
                    }
                  : sub
              ),
            }
          : topic
      ),
    })),

  deleteQuestion: (topicId, subId, qId) =>
    set((state) => ({
      topics: state.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              subtopics: topic.subtopics.map((sub) =>
                sub.id === subId
                  ? {
                      ...sub,
                      questions: sub.questions.filter((q) => q.id !== qId),
                    }
                  : sub
              ),
            }
          : topic
      ),
    })),

  editQuestion: (topicId, subId, qId, newTitle) =>
    set((state) => ({
      topics: state.topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              subtopics: topic.subtopics.map((sub) =>
                sub.id === subId
                  ? {
                      ...sub,
                      questions: sub.questions.map((q) =>
                        q.id === qId ? { ...q, title: newTitle } : q
                      ),
                    }
                  : sub
              ),
            }
          : topic
      ),
    })),

  // SOLVED TOGGLE 
  toggleSolved: (topicId, subId, qId) =>
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              subtopics: t.subtopics.map((s) =>
                s.id === subId
                  ? {
                      ...s,
                      questions: s.questions.map((q) =>
                        q.id === qId ? { ...q, solved: !q.solved } : q
                      ),
                    }
                  : s
              ),
            }
          : t
      ),
    })),
}));

export default useSheetStore;
