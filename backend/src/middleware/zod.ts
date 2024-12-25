import { z } from "zod";
import { sendBadRequest } from "../utils/statusUtils";

export const zodValidator =
    (schema: z.Schema) => (req: any, res: any, next: any) => {
        try {
            schema.parse(req.body); // Validate the request body
            next(); // Proceed to the next middleware or route handler
        } catch (err) {
            if (err instanceof z.ZodError) {
                sendBadRequest(res, err.errors[0].message);
                return;
                // Handle validation error
            }
            sendBadRequest(res, "Invalid request body");
            return;
        }
    };
