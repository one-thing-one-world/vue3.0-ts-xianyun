import service from './index'

export default {

  // login({username, password}: {username: string, password: string}) {

  // },
  // getData({pagenum, pagesize, query}: {pagenum: number | string, pagesize: number | string, query?: string}) {

  // },

  getData({ subject, model, testType }: { subject: number; model: string; testType: string }) {
    return service.get(`/query?subject=${subject}&model=${model}&key=f9d1022a6c59a0ecf19d02f92d3efd13
    &testType=${testType}`);
  },
  capture({ tel }: { tel: string }) {
    return service.post(`/captchas`, {
      tel
    })
  },
  register({ username, nickname, captcha, password }: {
    username: string; nickname: string; captcha: string; password: string;
  }) {
    return service.post(`/accounts/register`, {
      username, nickname, captcha, password
    })
  },
  login({ username, password }: { username: string; password: string }) {
    return service.post(`/accounts/login`, { username, password })
  },
  getBanner() {
    return service.get("/scenics/banners")
  },
  getCities() {
    return service.get("posts/cities")
  },
  getArticalList({ city }: { city: string }) {
    return service.get(`/posts?city=${city}`)
  },
  getAllList() {
    return service.get(`/posts`)
  },
  getArticalDetail({ id }: { id: number }) {
    return service.get(`/posts?id=${id}`)
  },
  getRecommend(id: number) {
    return service.get(`/posts/recommend?id=${id}`)
  },
  getSpecialFares() {
    return service.get(`/airs/sale`)
  },
  getTicketDetail({ departCity, departCode, destCity, destCode, departDate }: {
    departCity: string; departCode: string; destCity: string; destCode: string; departDate: string;
  }) {
    return service.get(`/airs?departCity=${departCity}&departCode=${departCode}&destCity=${destCity}&destCode=${destCode}&departDate=${departDate}`)
  }



}

