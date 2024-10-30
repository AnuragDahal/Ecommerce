import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

export const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});

export const uploadMultipleFiles = async (
    files: Express.Multer.File[],
    folderName: string = "/ecommerce"
): Promise<string[]> => {
    if (files.length === 0) {
        return [];
    }
    try {
        const uploadPromises = files.map((file) =>
            imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
                folder: folderName,
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
async function getFileIdFromUrl(url: string): Promise<string | null> {
    const fileName = url.split("/").pop();
    if (!fileName) return null;

    try {
        const searchResults = await imagekit.listFiles({
            name: fileName,
            limit: 1,
        });

        if (searchResults && searchResults.length > 0) {
            return searchResults[0].fileId;
        }
    } catch (error) {
        console.error(`Error searching for file: ${fileName}`, error);
    }

    return null;
}

async function getFileIdsFromUrls(urls: string[]): Promise<string[]> {
    const fileIds = await Promise.all(urls.map((url) => getFileIdFromUrl(url)));
    return fileIds.filter((id): id is string => id !== null);
}

export const deletePreviousImages = async (
    images: string[]
): Promise<boolean> => {
    try {
        const fileIds = await getFileIdsFromUrls(images);
        if (fileIds.length === 0) {
            return true;
        }

        for (const fileId of fileIds) {
            try {
                await imagekit.deleteFile(fileId);
            } catch (deleteError) {
                return false;
            }
        }
        return true;
    } catch (error) {
        console.error("Error deleting images:", error);
        return false;
    }
};
