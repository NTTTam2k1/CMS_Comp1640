import axios from 'axios';

class SubjectService {
  static BASE_URL = "http://localhost:1010";

  static async getAllSubjects(token) {
    try {
      const response = await axios.get(`${SubjectService.BASE_URL}/public/subject`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async addSubject(name,startDate, endDate,  token) {
    try {
      const response = await axios.post(`${SubjectService.BASE_URL}/admin/savesubject`, { name, startDate, endDate }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default SubjectService;
