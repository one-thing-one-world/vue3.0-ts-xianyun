import service from './index'
const token = localStorage.getItem('token')

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
  },
  getRealTimeCity({ name }: { name: string }) {
    return service.get(`/airs/city?name=${name}`)
  },
  //相关文章
  relevantPost(id: number) {
    return service.get(`/posts/recommend?id=${id}`)
  },

  airorders({ users, insurances, contactName, contactPhone, invoice, seat_xid, air, captcha }: { users: object[]; insurances: string[]; contactName: string; contactPhone: string; invoice: boolean; seat_xid: string; air: number; captcha: string; }) {
    return service.post(`/airorders`, { users, insurances, contactName, contactPhone, invoice, seat_xid, air, captcha },
      {
        headers:
          { Authorization: 'Bearer ' + token }
      })
  },
  getAirs(id: number) {
    return service.get(`/airs/${id}`)
},
//获取验证码
getCaptchas(tel: string) {
  return service.post(`/captchas`, { tel })
},
getcities({ name }: { name: string }) {
  return service.get(`/cities?name=${name}`)
},
//8.获取酒店
// gethotel({ city, id, price_in, scenic, name_contains, hotellevel, hoteltype, hotelbrand, hotelasset, enterTime, person, _sort, _limit, _start }: {
//     city: number; id?: number | undefined; scenic?: number | undefined; name_contains?: string | undefined; price_in?: number | undefined; hotellevel?: number | undefined; hoteltype?: number | undefined; hotelbrand?: number | undefined; hotelasset?: number | undefined; enterTime?: any; person?: number | undefined; _sort?: string | undefined; _limit?: number | undefined; _start?: number | undefined
// }) {
//     return service.get(`/hotels?city=${city}&id=${id}&price_in=${price_in}&scenic=${scenic}&name_contains=${name_contains}&hotellevel=${hotellevel}&hoteltype=${hoteltype}&hotelbrand=${hotelbrand}&hotelasset=${hotelasset}&enterTime=${enterTime}&person=${person}&_sort=${_sort}&_limit=${_limit}&_start=${_start}`)
// },
//9.获取酒店
getHotel({ city }: { city: number }) {
  return service.get(`/hotels?city=${city}`)
},
//10.获取酒店详情
getoptions() {
  return service.get('hotels/options')
},


}

