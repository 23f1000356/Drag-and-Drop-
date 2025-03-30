export interface DraggableElement {
    id: string;
    type: 'text' | 'image' | 'button';
    content: string;
    position: {
        x: number;
        y: number;
    };
    properties: {
        [key: string]: any;
    };
}

export interface CanvasState {
    elements: DraggableElement[];
    selectedElementId: string | null;
}

export interface FormProps {
    element: DraggableElement | null;
    onUpdate: (updatedElement: DraggableElement) => void;
}

export interface NavbarProps {
    onAddElement: (type: 'text' | 'image' | 'button') => void;
}