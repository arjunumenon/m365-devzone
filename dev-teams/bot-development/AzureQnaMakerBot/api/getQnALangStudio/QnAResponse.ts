export interface qnaAnswer{
    answer: string;
    confidenceScore: number;
}

export interface qnaResponse{
    answers: qnaAnswer[];
}