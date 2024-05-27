import * as Minio from "minio";

const minioConfig = {
	endPoint: "127.0.0.1",
	port: 9000,
	useSSL: false,
	accessKey: "a-6576208688:lex",
	secretKey: "s-6576208688:8905",
};

export const minioClient = new Minio.Client(minioConfig);

export async function getMinioFileUrl(bucketName, objectName) {
	try {
		const url = await minioClient.presignedGetObject(
			bucketName,
			objectName,
		);

		return url;
	} catch (error) {
		console.error("Error getting MinIO file URL:", error);
	}
}
