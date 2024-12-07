import { Injectable } from "@nestjs/common";
import { AxiosService } from ".";

@Injectable()
export class PhotosApisService {
    constructor(private axiosService: AxiosService) {}

    async getPhotos(url) {
        const response = await this.axiosService.getRequest(`${url}`)
        return response.data;
    }
} 