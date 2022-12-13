import { IqnaResponse } from "../models/IQnAResponse";

export const getRefinedResponse = async (completeResponse: IqnaResponse): Promise<string> => {
    let refinedResponse: string = "";
    if (completeResponse.answers.length > 0) {
        refinedResponse = completeResponse.answers[0].answer;
    }
    else{
        refinedResponse = "Sorry, I don't have an answer for that.";
    }
    return refinedResponse;
}