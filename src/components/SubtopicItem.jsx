import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";
import { SortableSubtopic } from "./SortableWrappers";
import QuestionItem from "./QuestionItem";
import useSheetStore from "../store/useSheetStore";

const SubtopicItem = ({ topic }) => {
  const { reorderSubtopics, addQuestion, deleteSubtopic, editSubtopic } =
    useSheetStore();
    if(!topic||!topic.subtopics) return null;
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = topic.subtopics.findIndex((s) => s.id === active.id);
    const newIndex = topic.subtopics.findIndex((s) => s.id === over.id);

    reorderSubtopics(topic.id, arrayMove(topic.subtopics, oldIndex, newIndex));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={topic.subtopics.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {topic.subtopics.map((sub) => (
            <SortableSubtopic key={sub.id} id={sub.id}>
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">

                {/* SUBTOPIC HEADER */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{sub.name}</h3>

                  <div className="flex gap-2">
                    <button
                      className="px-2 py-1 rounded bg-yellow-500 text-white text-xs"
                      onClick={() => {
                        const name = prompt("Edit subtopic");
                        if (name) editSubtopic(topic.id, sub.id, name);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="px-2 py-1 rounded bg-red-500 text-white text-xs"
                      onClick={() => deleteSubtopic(topic.id, sub.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* ADD QUESTION */}
                <button
                  className="mt-3 px-3 py-1 rounded bg-purple-600 text-white text-sm"
                  onClick={() => {
                    const q = prompt("Add question");
                    if (q) addQuestion(topic.id, sub.id, q);
                  }}
                >
                  + Add Question
                </button>

                {/* QUESTIONS */}
                <QuestionItem topicId={topic.id} sub={sub} />
              </div>
            </SortableSubtopic>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SubtopicItem;
