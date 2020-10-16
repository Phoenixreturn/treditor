const settings = {
    "backend": {
        "host": "localhost",
        "port": "7777",
        "app_name": "treditor"
    },

    getConnectionString() {
        return 'http://' + this.backend.host + ':' + this.backend.port + '/' + this.backend.app_name + '/';
    }
}

export default settings;