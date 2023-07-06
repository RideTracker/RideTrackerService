import { User } from "../../models/user";

export async function sendMessageEmail(user: User, message: string): Promise<any> {
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
                            "email": "contact@ridetracker.app",
                            "name": "Ride Tracker",
                        }
                    ]
                }
            ],
            "from": {
                "email": "noreply@ridetracker.app",
                "name": user.firstname + " " + user.lastname
            },
            "subject": "Message from the app",
            "content": [
                {
                    "type": "text/plain",
                    "value": `${message}\n\nThis was sent by ${user.firstname} ${user.lastname} from ${user.email}.`,
                }
            ]
        })
    });
};
