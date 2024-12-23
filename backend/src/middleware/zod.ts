import { z } from "zod";
import { sendBadRequest, sendInternalServerError } from "../utils/statusUtils";

export const zodValidator =
    (schema: z.Schema) => (req: any, res: any, next: any) => {
        try {
            schema.parse(req.body); // Validate the request body
            next(); // Proceed to the next middleware or route handler
        } catch (err) {
            if (err instanceof z.ZodError) {
                return sendBadRequest(res, err.errors[0].message);
                // Handle validation error
            }
            return sendBadRequest(res, "Invalid request body");
        }
    };

export const CartSchema = z.object({
    userId: z.string().nonempty(),
    products: z.array(
        z.object({
            productId: z.string().nonempty(),
            quantity: z.number().int().positive(),
        })
    ),
});

