import { createUser } from "../../controllers/users/createUser";
import { getUserByEmail } from "../../controllers/users/getUserByEmail";
import { createUserVerification } from "../../controllers/users/verifications/createUserVerification";
import { sendUserVerificationEmail } from "../../controllers/users/verifications/sendUserVerificationEmail";
import { encryptPassword } from "../../utils/encryption";

export const authRegisterSchema = {
    content: {
        firstname: {
            type: "string",
            required: true
        },
        
        lastname: {
            type: "string",
            required: true
        },
        
        email: {
            type: "string",
            required: true
        },
        
        password: {
            type: "string",
            required: true
        }
    }
};

export async function handleAuthRegisterRequest(request: any, env: Env) {
    const { firstname, lastname, email, password } = request.content;

    if(firstname.length < 2 || firstname.length > 128)
        return Response.json({ success: false, message: "Firstname may not be less than 2 character and may not exceed 128 characters." });
        
    if(lastname.length < 2 || lastname.length > 128)
        return Response.json({ success: false, message: "Lastname may not be less than 2 character and may not exceed 128 characters." });

    if(!email.includes('@') || !email.split('@')[1].includes('.') || email.endsWith('.'))
        return Response.json({ success: false, message: "Email does not pass our spam validation, make sure it's a real email." });

    if((await getUserByEmail(env.DATABASE, email)) !== null)
        return Response.json({ success: false, message: "Email is already registered to someone." });

    if(password.length < 3)
        return Response.json({ success: false, message: "Password must be at least 3 characters. We recommend a minimum of 6 characters or longer!" });
    
    const user = await createUser(env.DATABASE, firstname, lastname, email, await encryptPassword(password));

    if(user === null)
        return Response.json({ success: false, message: "Something went wrong!" });

    const userVerification = await createUserVerification(env.DATABASE, user);

    if(userVerification === null)
        return Response.json({ success: false, message: "Something went wrong!" });

    await sendUserVerificationEmail(user, userVerification);

    return Response.json({ success: true, verification: userVerification.id });
};
