import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useSheetStore from "./store/useSheetStore";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableTopic } from "./components/SortableWrappers";
import TopicItem from "./components/TopicItem";

const App = () => {
  const { topics, addTopic, reorderTopics, loadFromAPI } = useSheetStore();

  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(true);

  // ================= LOAD SAVED THEME =================
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDark(savedTheme === "dark");
    }
  }, []);

  // ================= APPLY THEME =================
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // ================= LOAD API DATA =================
  useEffect(() => {
    const loadData = async () => {
      try {
        await loadFromAPI();
      } catch (e) {
        console.log("API failed");
      }
      setLoading(false);
    };

    if (topics.length === 0) {
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  // ================= DRAG TOPICS =================
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = topics.findIndex((t) => t.id === active.id);
    const newIndex = topics.findIndex((t) => t.id === over.id);

    reorderTopics(arrayMove(topics, oldIndex, newIndex));
  };

  return (
    <div
      className="
      min-h-screen transition-all duration-500
      bg-gradient-to-br 
      from-slate-100 via-slate-200 to-slate-300
      dark:from-slate-900 dark:via-slate-950 dark:to-black
      text-black dark:text-white p-8
    "
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          Question Tracker
        </motion.h1>

        {/* DARK MODE TOGGLE */}
        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black shadow-lg"
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* ADD TOPIC */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="
        mb-8 px-6 py-3 rounded-xl font-semibold
        bg-gradient-to-r from-blue-500 to-indigo-600
        text-white shadow-lg
      "
        onClick={() => {
          const name = prompt("Enter topic name");
          if (name) addTopic(name);
        }}
      >
        + Add Topic
      </motion.button>

      {/* LOADING STATE */}
      {loading && (
        <div className="mt-10 text-center opacity-60 text-lg">
          Loading topics from API...
        </div>
      )}

      {/* TOPIC DRAG */}
      {!loading && (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={topics.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-6">
              {topics.map((topic) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SortableTopic id={topic.id}>
                    <div
                      className="
                      backdrop-blur-md 
                      bg-white/10 dark:bg-white/5
                      border border-white/20 
                      rounded-2xl p-5 shadow-xl
                    "
                    >
                      <TopicItem topic={topic} />
                    </div>
                  </SortableTopic>
                </motion.div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default App;
