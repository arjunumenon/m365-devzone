import { Context } from "@azure/functions";
import { AxiosStatic } from "axios";
import { IQnARequestProperties } from "../models/IQnARequestProperties";
import { IqnaResponse, IResponse } from "../models/IQnAResponse";


const Axios = require("axios") as AxiosStatic;
export const callLanguageStudioEndPoint = async (context: Context, qnarequestProperties: IQnARequestProperties): Promise<any> => {

    const qnaEndPoint: string = "https://teams-qnabot.cognitiveservices.azure.com";
    const qnaProjectName: string = "QnaBot";
    const qnaSubsriptionkey: string = "UNIQUE_KEY";

    const langstudioEndPoint = `${qnaEndPoint}/language/:query-knowledgebases?projectName=${qnaProjectName}&api-version=2021-10-01&deploymentName=production`;
    const langstudioHeader: any = {
        "Ocp-Apim-Subscription-Key": qnaSubsriptionkey,
        "Content-Type": "application/json"
    };
    const langstudioBody: any = {
        "top": qnarequestProperties.top,
        "question": qnarequestProperties.question,
        "includeUnstructuredSources": true,
        "confidenceScoreThreshold": "0.5"
    };

    let qnaResponse : IqnaResponse = null;
    try {
        const response: any = await Axios.post<IResponse>(langstudioEndPoint, langstudioBody, {
            headers: langstudioHeader
        });
        qnaResponse = response.data;
    } catch (err: any) {
        console.log(err);
        context.log.error(err);
        return {
            status: 500,
            body: {
                error:
                    "Failed to Get answers for the question",
            },
        };
    }

    return qnaResponse;
}