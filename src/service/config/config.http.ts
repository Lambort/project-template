import http from "axios";

const TIME_OUT = 120000;
const RUN_TIME = process.env.NODE_ENV;

http.defaults.timeout = TIME_OUT;

http.interceptors.request.use(
	(config) => {
		// do something before request
		return config;
	},
	(err) => {
		// do something when request error
		return Promise.reject(err);
	}
);

http.interceptors.response.use(
	(data) => {
		// do something before response
		return data;
	},
	(error) => {
		// do something when response error
		return Promise.reject(error);
	}
);

export { http };
