import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";
import { SortableQuestion } from "./SortableWrappers";
import useSheetStore from "../store/useSheetStore";

const QuestionItem = ({ topicId, sub }) => {
  const {
    reorderQuestions,
    deleteQuestion,
    editQuestion,
    toggleSolved
  } = useSheetStore();

  // Safety guard
  if (!sub || !sub.questions) return null;

  // ================= DRAG LOGIC =================
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sub.questions.findIndex((q) => q.id === active.id);
    const newIndex = sub.questions.findIndex((q) => q.id === over.id);

    reorderQuestions(
      topicId,
      sub.id,
      arrayMove(sub.questions, oldIndex, newIndex)
    );
  };

  // ================= PROGRESS CALCULATION =================
  const total = sub.questions.length;
  const solvedCount = sub.questions.filter(q => q.solved).length;
  const percent = Math.round((solvedCount / total) * 100 || 0);

  return (
    <>
      {/* SUBTOPIC PROGRESS BAR */}
      <div className="mt-3 mb-3">
        <div className="text-xs opacity-70 mb-1">
          Progress: {percent}% ({solvedCount}/{total})
        </div>

        <div className="w-full bg-white/10 rounded h-2">
          <div
            className="bg-green-500 h-2 rounded transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* QUESTIONS LIST */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={sub.questions.map((q) => q.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {sub.questions.map((q) => (
              <SortableQuestion key={q.id} id={q.id}>
                <div
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg w-full transition
                    ${q.solved
                      ? "bg-green-500/20 line-through opacity-80"
                      : "bg-black/20 dark:bg-white/5"}
                  `}
                >
                  {/* CHECKBOX */}
                  <input
                    type="checkbox"
                    checked={q.solved || false}
                    onChange={() =>
                      toggleSolved(topicId, sub.id, q.id)
                    }
                    className="cursor-pointer"
                  />

                  {/* TITLE */}
                  <span className="flex-1">{q.title}</span>

                  {/* EDIT */}
                  <button
                    className="px-2 py-1 rounded bg-yellow-500 text-white text-xs"
                    onClick={() => {
                      const t = prompt("Edit question");
                      if (t) editQuestion(topicId, sub.id, q.id, t);
                    }}
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    className="px-2 py-1 rounded bg-red-500 text-white text-xs"
                    onClick={() =>
                      deleteQuestion(topicId, sub.id, q.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </SortableQuestion>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default QuestionItem;
