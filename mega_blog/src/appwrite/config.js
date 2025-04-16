import config from "../conf/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client;
    database;
    bucket;

    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost(title, slug, content, featuredImage, status, userId) {
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async updatePost(title, slug, content, featuredImage, status) {
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            throw error;
        }
    }

    async getPosts() {
        try {
            const queries = [
                Query.equal("status", "active")
            ];

            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(id) {
        try {
            return await this.bucket.deleteFile(
                config.appwriteBucketId,
                id
            );
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(id) {
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                id
            );
        } catch (error) {
            throw error;
        }
    }
};

const service = new Service();

export default service;