export interface GenericAdaptiveCards {
    type: string;
    body: Body[];
    $schema: string;
    version: string;
}

/**
 * Interface for the Welcome Card Data
 */
export interface WelcomeCardData {
    initiator: string;
}

export interface DummyActionCardData{
    title: string;
    body: string;
}

export interface DummyActionResponseCardData{
    title: string;
    body: string;
}