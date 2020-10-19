import axios from 'axios'
import settings from '../config/settings'

const API_URL = settings.getConnectionString()

class WhiteBoardService {
    getProjects(projects) {
        return axios
            .get(API_URL + 'projects')
            .then(response => {
                projects.length = 0
                for (let propName in response.data) {
                    if (Object.prototype.hasOwnProperty.call(response.data, propName)) {
                        projects.push({'name': propName, 'objectId': response.data[propName]})
                    }
                }
            })
    }
    
    updateProject(projectId, shapes) {
        return axios.put(API_URL + 'projects/' + projectId, { 'shapes': shapes }).then(response => {
            console.log(response.data)
        }).catch(data => {
            console.log(data)
        })
    }

    getProject(projectId) {
        return axios.get(API_URL + 'projects/' + projectId);
    }
}

export default new WhiteBoardService();