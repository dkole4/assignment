import axios from 'axios'

const { REACT_APP_FETCH_URL } = process.env


export const fetchService = {
  getRules: async () => {
    try {
      const config = {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        Connection: "keep-alive"
      }
      axios.get(REACT_APP_FETCH_URL, config)
        .then((val) => {
          console.log(val)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (e) {
      console.log(e)
      console.log(e.status)
      return null
    }
  }
}
