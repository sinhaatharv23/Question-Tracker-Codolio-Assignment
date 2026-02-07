import SubtopicItem from "./SubtopicItem";
import useSheetStore from "../store/useSheetStore";
import { motion } from "framer-motion";

const TopicItem = ({ topic }) => {
  const { addSubtopic, deleteTopic, editTopic } = useSheetStore();

  if (!topic) return null;

  // ===== CALCULATE TOPIC PROGRESS =====
  const allQuestions = topic.subtopics.flatMap(s => s.questions || []);
  const solvedCount = allQuestions.filter(q => q.solved).length;
  const percent = Math.round((solvedCount / allQuestions.length) * 100 || 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      {/* TOPIC HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {topic.name}
        </h2>

        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded-lg bg-yellow-500 text-white text-sm"
            onClick={() => {
              const n = prompt("Edit topic");
              if (n) editTopic(topic.id, n);
            }}
          >
            Edit
          </button>

          <button
            className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm"
            onClick={() => deleteTopic(topic.id)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* TOPIC PROGRESS BAR */}
      <div>
        <div className="text-sm opacity-70 mb-1">
          Progress: {percent}% ({solvedCount}/{allQuestions.length})
        </div>

        <div className="w-full bg-white/10 rounded h-2">
          <div
            className="bg-green-500 h-2 rounded"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* ADD SUBTOPIC */}
      <button
        className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm shadow hover:scale-105 transition"
        onClick={() => {
          const n = prompt("Add subtopic");
          if (n) addSubtopic(topic.id, n);
        }}
      >
        + Add Subtopic
      </button>

      {/* SUBTOPICS */}
      <SubtopicItem topic={topic} />
    </motion.div>
  );
};

export default TopicItem;
