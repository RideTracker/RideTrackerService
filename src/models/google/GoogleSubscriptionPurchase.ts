export type GoogleSubscriptionPurchase = {
    error?: any;

    "kind": string;
    "startTimeMillis": string;
    "expiryTimeMillis": string;
    "autoResumeTimeMillis": string;
    "autoRenewing": boolean;
    "priceCurrencyCode": string;
    "priceAmountMicros": string;
    "introductoryPriceInfo": {
        "introductoryPriceCurrencyCode": string;
        "introductoryPriceAmountMicros": string;
        "introductoryPricePeriod": string;
        "introductoryPriceCycles": number
    };
    "countryCode": string;
    "developerPayload": string;
    "paymentState": number;
    "cancelReason": number;
    "userCancellationTimeMillis": string;
    "cancelSurveyResult": {
        "cancelSurveyReason": number;
        "userInputCancelReason": string
    };
    "orderId": string;
    "linkedPurchaseToken": string;
    "purchaseType": number;
    "priceChange": {
        "newPrice": {
            "priceMicros": string;
            "currency": string
        };
        "state": number
    };
    "profileName": string;
    "emailAddress": string;
    "givenName": string;
    "familyName": string;
    "profileId": string;
    "acknowledgementState": number;
    "externalAccountId": string;
    "promotionType": number;
    "promotionCode": string;
    "obfuscatedExternalAccountId": string;
    "obfuscatedExternalProfileId": string
};
