import { User } from "../models/user";
import { UserVerification } from "../models/userVerification";

export async function sendUserVerificationEmail(userVerification: UserVerification): Promise<any> {
    const request = new Request("https://api.mailchannels.net/tx/v1/send", {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
        },
        "body": JSON.stringify({
            "personalizations": [
                {
                    "to": [
                        {
                            "email": userVerification.user.email,
                            "name": userVerification.user.firstname + " " + userVerification.user.lastname
                        }
                    ]
                }
            ],
            "from": {
                "email": "noreply@ridetracker.app",
                "name": "Ride Tracker",
            },
            "subject": "Attempted login",
            "content": [
                {
                    "type": "text/plain",
                    "value": `Your verification code is ${userVerification.code.substring(0, 3)} ${userVerification.code.substring(3, 6)}.\n\nDo not share this code to anyone if you did not request it.`,
                }
            ]
        })
    });

    return await fetch(request);
};