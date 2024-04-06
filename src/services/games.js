import serviceApi from "./api";

const all = () => serviceApi.get('public/games')

const service = {
  all
}

export default service
