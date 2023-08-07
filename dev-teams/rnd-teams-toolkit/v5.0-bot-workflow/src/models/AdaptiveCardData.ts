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