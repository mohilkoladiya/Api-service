import axios from "axios";
const projectapi = "https://bxctdeshz4.execute-api.us-east-1.amazonaws.com"
const formapi = "https://9p3lyz25id.execute-api.us-east-1.amazonaws.com"
const questionsapi = "https://bktuvuol9c.execute-api.us-east-1.amazonaws.com"
const cardApi = "http://abc17bcccd54.ngrok.io"

export class ApiService {

  async getData(url, data, cancelToken, headers) {
    const config = {
      headers: {
        ...(headers || {}),
      },
    };
    let resData = '';
    const response = await axios.get(url, data, config).catch((err) => {
      resData = { error: 'something went wrong' };
    });
    return resData || response.data;
  }

  async postMethod(url, data, headers, cancelToken) {
    const config = {
      headers: {
        ...(headers || {}),
        //'content-type': 'application/x-www-form-urlencoded',
      },
    };
    if (cancelToken && cancelToken.token) {
      config.cancelToken = cancelToken.token;
    }
    let resData = '';
    const response = await axios.post(url, data, config).catch(thrown => {
      if (thrown.toString() === 'Cancel') {
        resData = 'cancel';
      } else {
        resData = { error: 'something went wrong' };;
      }
    });
    return resData || response.data;
  }

  async putMethod(url, data, headers) {
    const config = {
      headers: {
        ...(headers || {}),
      }
    };
    let resData = '';
    const response = await axios.put(url, data, config).catch(err => {
      resData = { error: 'something went wrong' };
    });
    return resData || response.data;
  }

  async deleteMethod(url, headers) {
    const config = {
      headers: {
        ...(headers || {})
      },
    };
    let resData = '';
    const response = await axios.delete(url, config).catch(err => {
      resData = { error: 'something went wrong' };
    });
    return resData || response.data;
  }

  async clusterById(url, headers) {
    const config = {
      headers: {
        ...(headers || {})
      }
    }
    let resData = ''
    const response = await axios.get(url, config).catch(err => {
      resData = { error: 'Something went wrong' };
    });
    return resData || response.data;
  }

  async getProject() {
    return await this.getData(`${projectapi}/find`, '');
  }
  async createProject(payload) {
    return await this.postMethod(`${projectapi}/insert`, payload);
  }
  async getForm() {
    return await this.getData(`${formapi}/find`, '');
  }
  async getQuestions() {
    return await this.getData(`${questionsapi}/find`, '');
  }
  async editProject(id) {
    return await this.putMethod(`${projectapi}/update/${id}`);
  }
  async createCard(payload) {
    return await this.postMethod(`${cardApi}/test/insert`, payload);
  }
  async getCard(id) {
    return await this.getData(`${cardApi}/test/find/${id}`);
  }
}

export default ApiService
