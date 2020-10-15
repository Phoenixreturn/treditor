import axios from 'axios'

const API_URL = 'http://192.168.0.103:8080/springtest/whiteboard/'

class WhiteBoardService {
    getProjects() {
        return axios
            .get(API_URL + 'projects')
            .then(response => {
                console.log(response)
            })
    }
}

export default new WhiteBoardService();