import serviceApi from "./api";

const all = () => serviceApi.get('public/games_releases')

const service = {
  all
}

export default service
