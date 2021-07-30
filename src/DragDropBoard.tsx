import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {TodoItemsList} from "./TodoItems";
import {TodoItem, useTodoItems} from "./TodoItemsContext";

const reorder = (list: TodoItem[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const DragDropBoard = () => {
    const { todoItems, dispatch } = useTodoItems();
    function onDragEnd(result: any) {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            todoItems,
            result.source.index,
            result.destination.index
        );

        dispatch({type: "setTodos", data: {todoItems: items}})
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"droppable"}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        <TodoItemsList todoItems={todoItems}/>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DragDropBoard;
