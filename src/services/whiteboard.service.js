import axios from 'axios'
import settings from '../config/settings'

const API_URL = settings.getConnectionString()

class WhiteBoardService {
    getProjects() {
        return axios
            .get(API_URL + 'whiteboard/projects')
            .then(response => {
                console.log(response.data)
            })
    }
    
    saveProject(shapes) {
        return axios.post(API_URL + 'saveProject', { 'shapes': shapes }).then(response => {
            console.log(response.data)
        })
    }
}

export default new WhiteBoardService();