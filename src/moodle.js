const moodleQuery = (endpoint, format, token, method, params = {}) => {
	
	let query = `${endpoint}?moodlewsrestformat=${format}&wstoken=${token}&wsfunction=${method}`;

    for (const p in params) {
        query += `&${p}=${params[p]}`;
    }
    return query;
}

export const auth = (username, password) => fetch(`https://moodle.vishub.org/login/token.php?username=${username}&password=${password}&service=web_services`);
export const getServices = (endpoint, token) => fetch(moodleQuery(endpoint, "json", token, "core_webservice_get_site_info")); 
export const getCourses = (endpoint, token, userid) => fetch(moodleQuery(endpoint, "json", token, "core_enrol_get_users_courses", {userid})); 
export const getAssignments = (endpoint, token, courseid) => fetch(moodleQuery(endpoint, "json", token, "mod_assign_get_assignments", {"courseids[]": courseid})); 



var endpoint = `https://moodle.vishub.org/webservice/rest/server.php`;
var token = "1bf459b4a79482ff3b1ef5092012250a";