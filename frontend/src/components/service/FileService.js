import axios from 'axios';

class FileService {
  static BASE_URL = "http://localhost:1010";

  static async getAllFiles(token) {
    try {
      const response = await axios.get(`${FileService.BASE_URL}/files/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async uploadFile(formData, token) {
    try {
      const response = await axios.post(`${FileService.BASE_URL}/upload`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default FileService;
