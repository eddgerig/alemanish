export interface TranslationOption {
    id: string;
    title: string;
    subtitle: string;
    iconName: string;
}

export interface TranslationLessonData {
    type: 'translation';
    questionPrefix: string;
    highlightedWord: string;
    questionSuffix: string;
    correctOptionId: string;
    options: TranslationOption[];
}

export interface AudioImageOption {
    id: string;
    title: string;
    imageUrl: string;
}

export interface AudioImageLessonData {
    type: 'audioImage';
    instruction: string;
    audioUrl: string;
    phoneticText: string;
    correctOptionId: string;
    options: AudioImageOption[];
}

export interface CompleteWordLessonData {
    type: 'completeWord';
    imageUrl: string;
    audioUrl: string;
    targetWord: string;
    visibleCharacters: number;
}

export type LessonData = TranslationLessonData | AudioImageLessonData | CompleteWordLessonData;

export interface LessonModule {
    moduleId: string;
    title: string;
    lessons: LessonData[];
}
