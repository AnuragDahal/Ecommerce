import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

export const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});

export const uploadMultipleFiles = async (
    files: Express.Multer.File[]
): Promise<string[]> => {
    try {
        const uploadPromises = files.map((file) =>
            imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
            })
        );
        const uploadResults = await Promise.all(uploadPromises);
        return uploadResults.map((result) => result.url);
    } catch (error) {
        console.error("Error uploading multiple files:", error);
        throw new Error("Unable to upload files");
    }
};

export const uploadSingleFile = async (
    file: Express.Multer.File
): Promise<string> => {
    try {
        const result = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
        });
        return result.url;
    } catch (error) {
        throw new Error("Unable to upload file");
    }
};

async function getFileIdsFromUrls(urls: string[]): Promise<string[]> {
    const fileIds = [];
    for (const url of urls) {
        const fileDetails = await imagekit.getFileDetails(url);
        fileIds.push(fileDetails.fileId);
    }
    return fileIds;
}

export const deletePreviousImages = async (images: string[]) => {
    try {
        const imageFields = await getFileIdsFromUrls(images);
        console.log("Image fields (file IDs):", imageFields);

        const deleteResults = [];
        for (const fileId of imageFields) {
            const deleteResult = await imagekit.deleteFile(fileId, function () {
                console.log("File deleted successfully");
            });
            deleteResults.push(deleteResult);
        }
        return true;
    } catch (error) {
        console.error("Error deleting images:", error);
        return false;
    }
};
