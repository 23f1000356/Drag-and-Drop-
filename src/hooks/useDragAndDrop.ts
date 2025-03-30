import { useState, useCallback } from 'react';

const useDragAndDrop = () => {
    interface Element {
        id: string;
        x: number;
        y: number;
    }

    const [elements, setElements] = useState<Element[]>([]);
    const [draggingElement, setDraggingElement] = useState<Element | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleDragStart = useCallback((e, element) => {
        setDraggingElement(element);
        setOffset({ x: e.clientX - element.x, y: e.clientY - element.y });
    }, []);

    const handleDragEnd = useCallback(() => {
        setDraggingElement(null);
    }, []);

    const handleDrag = useCallback((e) => {
        if (draggingElement) {
            const updatedElements = elements.map((el) => {
                if (el.id === draggingElement.id) {
                    return {
                        ...el,
                        x: e.clientX - offset.x,
                        y: e.clientY - offset.y,
                    };
                }
                return el;
            });
            setElements(updatedElements);
        }
    }, [draggingElement, elements, offset]);

    return {
        elements,
        setElements,
        draggingElement,
        handleDragStart,
        handleDragEnd,
        handleDrag,
    };
};

export default useDragAndDrop;