import fs from "fs";
import { expect, test } from "vitest";
import { getResponse } from "../../utils/response";

const persons = JSON.parse(fs.readFileSync("./tests/data/persons.json", "utf-8"));

export function createUser() {
    return new Promise(async (resolve) => {
        const firstname = persons.names[Math.floor(Math.random() * persons.names.length)].split(' ')[0];
        const lastname = persons.names[Math.floor(Math.random() * persons.names.length)].split(' ')[1];

        const response = await getResponse("POST", "/api/auth/register", null, {
            firstname: firstname,
            lastname: lastname,
            email: `${firstname}.${lastname}@ridetracker.app`.toLowerCase(),
            password: "test"
        });

        expect(response.success).toBe(true);

        const codeResponse = await getResponse("POST", "/staging/verification", null, {
            id: response.verification
        });
    
        const verifyResponse = await getResponse("POST", "/api/auth/login/verify", null, {
            id: response.verification,
            code: codeResponse.code
        });

        expect(verifyResponse.success).toBe(true);

        const renewResponse = await getResponse("POST", "/api/auth/renew", verifyResponse.key);

        expect(renewResponse.success).toBe(true);

        resolve(renewResponse);
    });
};