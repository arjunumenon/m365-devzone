export interface IqnaAnswer{
    answer: string;
    confidenceScore: number;
    id: number;
    source: string;
}

export interface IqnaResponse{
    answers: IqnaAnswer[];
}

export interface IResponse{
    status: number;
    statusText: string;
    data?: IqnaResponse;
}