import axios from 'axios';

//Default functions to retrieve data from different database tables
export default {
    getData: function (table) {
        return axios.get("/api/" + table);
    },

    getDataById: function (table, id) {
        return axios.get("/api/" + table + "/" + id);
    },

    getDataCount: function (table, active) {
        return axios.get("/api/" + table + "/count/" + active.model);
    }
}