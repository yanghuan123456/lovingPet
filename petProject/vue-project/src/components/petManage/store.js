import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import axios from "axios";
export default {
    namespaced: true,
    state: {
        curpage: 1,
        eachpage: 5,
        maxpage: 0,
        total: 0,
        rows: [],
        pet: {
            photo: '',
            variety: '',
            name: '',
            color: '',
            gender: '',
            money: '',
            age: '',
        },
        id: { id: "" },
        updateForm: {
            photo: "",
            variety: "",
            name: " ",
            color: "",
            gender: "",
            money: "",
            age: "",
            id: ""
        },
        petImages: []
    },
    mutations: {//同步
        getPetByPage(state, payload) {
            Object.assign(state, payload);
        },
        setcurPage(state, curpage) {
            state.curpage = curpage
        },
        eachPage(state, eachpage) {
            state.eachpage = eachpage
        },
        // 预备修改
        update(state, row) {
            const { age, color, gender, money, name, photo, variety, _id } = row
            state.updateForm.age = age
            state.updateForm.color = color
            state.updateForm.gender = gender
            state.updateForm.money = money
            state.updateForm.name = name
            state.updateForm.photo = photo
            state.updateForm.variety = variety
            state.updateForm.id = _id
        },
        getPetImage(state, payload) {
            state.petImages = payload
        }

    },
    actions: {//异步
        //新增宠物
        async postPet(context, item) {
            let userId = JSON.parse(sessionStorage.getItem('users'))
            const { id } = userId
            // console.log(id)
            let { data } = await axios.post("/addPets", { item,id })
        },
        //获取所有数据
        async getPetByPageAsync(context) {
            const { curpage, eachpage } = context.state
            const data = await fetch(`/addPets/?page=${curpage}&rows=${eachpage}`).then(response => response.json())
            context.commit('getPetByPage', data)
        },
        //新增图片
        async petImagePost(context, item) {
            const petImage = item
            let { id: { id } } = context.state
            let { data } = await axios.post("/addPetimg", { petImage, id })
        },
        //确认修改
        async updateConfirm(context, row) {
            const { updateForm: { id } } = context.state
            let pet = context.state.updateForm
            axios.put("/addPets/" + id, { pet });
            await context.dispatch('getPetByPageAsync')
        },
        //查询
        async search(context, item) {
            const { choice, text } = item
            let type = ""
            switch (choice) {
                case "1":
                    type = "name";
                    break;
                case "2":
                    type = "age";
                    break;
                case "3":
                    type = "variety";
                    break;
                case "4":
                    type = "color";
                    break;
                case "5":
                    type = "gender";
                    break;
                case "6":
                    type = "money";
                    break;
                default:
                    break;
            }
            const { data } = await axios.get(`/addPets/?type=${type}&value=${text}`)
            context.commit('getPetByPage', data)
        },
        //删除
        async delete(context, id) {
            axios.delete("/addPets/" + id).then(
                await context.dispatch('getPetByPageAsync')
            )
        },
        //获取动物图片
        async getPetImageAsync(context, row) {
            const { petImages } = context.state
            const { _id } = row
            let id = _id
            const { data } = await axios.get("/addPetimg/" + id)
            context.commit('getPetImage', data)
        }
    },
    getters: {

    }
}


