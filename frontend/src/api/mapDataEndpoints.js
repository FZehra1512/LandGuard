import api from "./api";


export const getNDVIData = async () => {
    try {
        const response = await api.get('/api/ndvi/getAll/')
        return { code: response.status, data: response.data };
    } catch (error) {
        return {
            code: error.response?.status || 500,
            data: error.response?.data || error.message,
        };
    }
  };
  
// export const examplePostApiFunction = async () => {
//   try {
//       const response = await api.post('/posts', {
//         title: 'My Post',
//         content: 'Hello World',
//       });
//       return { code: response.status, message: response.data.message };
//   } catch (error) {
//       return {
//           code: response.error.response?.status,
//           message: response.error.response?.data,
//       };
//   }
// };