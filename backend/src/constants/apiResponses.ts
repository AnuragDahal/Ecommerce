export const API_RESPONSES = {
    // Success Responses
    USER_CREATED: "User successfully created",
    USER_LOGGED_IN: "User successfully logged in",
    EMAIL_SENT: "Email successfully sent",
    PASSWORD_CHANGED: "Password successfully changed",
    USER_LOGGED_OUT: "User successfully logged out",
    TOKEN_REFRESHED: "Access token and refresh token successfully refreshed",
    PRODUCT_CREATED: "Product successfully created",
    PRODUCT_UPDATED: "Product successfully updated",
    PRODUCT_DELETED: "Product successfully deleted",
    IMAGE_UPLOAD_SUCCESS: "Image uploaded successfully",
    SELLER_CREATED: "Seller successfully created",
    SUCCESS: "Success",
    ADDED_TO_CART: "Product successfully added to cart",
    CART_FETCHED: "Cart successfully fetched",

    // Error Responses
    USER_NOT_FOUND: "User not found",
    USER_ALREADY_EXISTS: "User already exists",
    FAILED_TO_GENERATE_TOKEN: "Failed to generate token",
    FAILED_TO_SEND_EMAIL: "Failed to send email",
    FAILED_TO_LOGIN: "Failed to login",
    UNABLE_TO_CREATE_PRODUCT: "Unable to create product",
    UNABLE_TO_UPDATE_PRODUCT: "Unable to update product",
    IMAGE_UPLOAD_FAILED: "Image upload failed",
    PRODUCT_NOT_FOUND: "Product not found",
    SAME_PASSWORD: "New password must be different from the old password",
    SELLER_ALREADY_EXISTS: "Seller already exists",
    IMAGE_DELETE_FAILED: "Failed to delete images from imagekit",

    // VALIDATION ERRORS
    INVALID_EMAIL: "Invalid email",
    INVALID_PASSWORD: "Invalid password",
    PASSWORD_LENGTH: "Password must be at least 6 characters long",
    PASSWORD_ALPHA: "Password must contain at least one letter",
    PASSWORD_DIGIT: "Password must contain at least one digit",
    PASSWORD_SPECIAL_CHAR:
        "Password must contain at least one special character",
    MISSING_REQUIRED_FIELDS: "Please fill in all required fields",
    MISSING_HEADERS: "Please provide required headers",
    INVALID_CREDENTIALS: "Invalid credentials",
    INVALID_TOKEN: "The token has been expired or is invalid",
    OTP_EXPIRED: "The otp has been expired. Please request a new one",

    // General Responses
    BAD_REQUEST: "Bad request",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Forbidden",
    NOT_FOUND: "Resource not found",
    INTERNAL_SERVER_ERROR: "Internal server error",
    SERVICE_UNAVAILABLE: "Service unavailable",
};
