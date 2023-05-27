import { User } from "../../../models/user";
import { UserVerification } from "../../../models/userVerification";

export async function sendUserVerificationEmail(user: User, userVerification: UserVerification): Promise<any> {
    return await fetch("https://api.mailchannels.net/tx/v1/send", {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
        },
        "body": JSON.stringify({
            "personalizations": [
                {
                    "to": [
                        {
                            "email": user.email,
                            "name": user.firstname + " " + user.lastname
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
                    "value": `Your verification code is ${userVerification.code.substring(0, 3)} ${userVerification.code.substring(3, 6)} and it's valid for 15 minutes.\n\nDo not share this code to anyone if you did not request it.`,
                }
            ]
        })
    });
};
