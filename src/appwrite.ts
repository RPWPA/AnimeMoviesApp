import { Client, Databases, ID, Query } from "appwrite";
import type { IMovie } from "./interfaces/Imovie";

const Database_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const Metrics_ID = import.meta.env.VITE_APPWRITE_METRICS_ID;
const Project_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(Project_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm: string, movie: IMovie) => {
    try {
        const result = await database.listDocuments(Database_ID, Metrics_ID, [Query.equal("searchTerm", searchTerm)]);

        if (result.documents.length > 0) {
            const document = result.documents[0];
            const newCount = document.count + 1;
            await database.updateDocument(Database_ID, Metrics_ID, document.$id, { count: newCount });
        }
        else {
            await database.createDocument(Database_ID, Metrics_ID, ID.unique(),
                { searchTerm, count: 1, image_url: movie.images.jpg.image_url, title: movie.title }
            );
        }
    }
    catch (error) {
        console.error(error);
    }
}