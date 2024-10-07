export const API_RESPONSES = {
    // Success Responses
    USER_CREATED: "User successfully created",
    USER_LOGGED_IN: "User successfully logged in",
    EMAIL_SENT: "Email successfully sent",
    PASSWORD_CHANGED: "Password successfully changed",
    USER_LOGGED_OUT: "User successfully logged out",

    // Error Responses
    USER_NOT_FOUND: "User not found",
    USER_ALREADY_EXISTS: "User already exists",
    INVALID_CREDENTIALS: "Invalid credentials",
    FAILED_TO_GENERATE_TOKEN: "Failed to generate token",
    FAILED_TO_SEND_EMAIL: "Failed to send email",
    FAILED_TO_LOGIN: "Failed to login",

    // VALIDATION ERRORS
    INVALID_EMAIL: "Invalid email",
    INVALID_PASSWORD: "Invalid password",
    PASSWORD_LENGTH: "Password must be at least 6 characters long",
    PASSWORD_ALPHA: "Password must contain at least one letter",
    PASSWORD_DIGIT: "Password must contain at least one digit",
    PASSWORD_SPECIAL_CHAR:
        "Password must contain at least one special character",
    MISSING_REQUIRED_FIELDS: "Please fill in all required fields",
    

    // General Responses
    BAD_REQUEST: "Bad request",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Forbidden",
    NOT_FOUND: "Resource not found",
    INTERNAL_SERVER_ERROR: "Internal server error",
    SERVICE_UNAVAILABLE: "Service unavailable",
};
