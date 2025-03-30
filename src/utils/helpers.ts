export const generateUniqueId = (): string => {
    return `element-${Math.random().toString(36).substr(2, 9)}`;
};

export const isValidElementType = (type: string): boolean => {
    const validTypes = ['text', 'image', 'button'];
    return validTypes.includes(type);
};

export const cloneElement = (element: any) => {
    return JSON.parse(JSON.stringify(element));
};