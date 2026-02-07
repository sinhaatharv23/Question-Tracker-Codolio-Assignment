import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableTopic = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-6">
      <div
        {...attributes}
        {...listeners}
        className="text-sm opacity-60 mb-2 cursor-grab"
      >
        ≡ Drag Topic
      </div>

      {children}
    </div>
  );
};


export const SortableSubtopic = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} className="ml-6 border p-3 rounded mt-3">
      <div {...attributes} {...listeners} className="cursor-grab text-xs mb-1">
        ⇅ Drag Subtopic
      </div>
      {children}
    </div>
  );
};

export const SortableQuestion = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} className="ml-6 mt-2 flex gap-2">
      <span {...attributes} {...listeners} className="cursor-grab">↕</span>
      {children}
    </div>
  );
};
