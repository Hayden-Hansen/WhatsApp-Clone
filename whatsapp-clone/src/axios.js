import axios from 'axios'

const instance = axios.create({
    //baseURL: 'http://localhost:9000'
    /*baseURL: YOUR public url WILL GO HERE. I TOOK THIS OUT AS IT IS PRIVATE INFORMATION */
})

export default instance