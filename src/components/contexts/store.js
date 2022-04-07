
// import axios from "axios";
// import create from "zustand"

// const store = create(set => ({

//   // Authentication
//   error: "",
//   user : JSON.parse(localStorage.getItem('data')),
//   // user :null,

//   // listPlaylist:JSON.parse(localStorage.getItem('listPlaylist')),
//   // listSongLove:JSON.parse(localStorage.getItem('listSongLove')),
//   listPlaylist:JSON.parse(localStorage.getItem('listPlaylist')),
//   listSongLove:JSON.parse(localStorage.getItem('listSongLove')),

//   updateUser : (user)=>{set(state=>({user:user}))},
//   loginUser: async (user) => {

//     try {
//       const res = await axios.post("/v1/auth/login", user);
//       set(state => ({ error: "" ,showForm : ""}))
//       const data = {username :res.data.username , _id : res.data._id,accessToken : res.data.accessToken}
//       localStorage.setItem("data",JSON.stringify(data));
//       localStorage.setItem("listPlaylist",JSON.stringify(res.data.listPlaylist));
//       localStorage.setItem("listSongLove",JSON.stringify(res.data.listSongLove));
//       set(state=>({user : JSON.parse(localStorage.getItem('data'))}));
//       // set(state=>({user : res.data.username}));

//     } catch (err) {
//       set(state => ({ error: "Email hoặc mật khẩu chưa chính xác" }))
//     }
//   },
//   registerUser: async (user) => {
//     try {
//       await axios.post("v1/auth/register", user);
//       set(state => ({ error: "" }))
//       set(state=>({showForm : "login"}));
//     } catch (err) {
//       set(state => ({ error: "Tài khoản đã tồn tại" }))
//     }
//   },
//   logout :async(accessToken)=>{
//     try{
//       await axios.post("v1/auth/logout",
//       // { headers:{'token': `Bearer ${accessToken}`}}
//       );
//       set(state=>({user : null}));
//       set(state=>({listPlaylist : null}));
//       localStorage.removeItem("data");
//       localStorage.removeItem("listPlaylist");
//       localStorage.removeItem("listSongLove");
//     }catch(err){
//       set(state => ({ error: "Failed" }))
//     }
//   },
  
//   getListPlaylist: async (accessToken,id) => {
//     try {
//       const res=await axios.get("v1/auth/getListPlaylist/" + id, 
      
//       { headers:{'token': `Bearer ${accessToken}`}},
//       );
//       const list = res.data;
//       localStorage.setItem("listPlaylist",JSON.stringify(list));
//       set(state => ({ listPlaylist: JSON.parse(localStorage.getItem('listPlaylist'))}))
//     } catch (err) {
//       set(state => ({ error: "No problem" }))
//     }
//   },
//   // getPlaylist: async (accessToken,id,item) => {
//   //   try {
//   //     const res=await axios.get("v1/auth/getPlaylist/" + id, 
//   //     item,
//   //     { headers:{'token': `Bearer ${accessToken}`}},
      
//   //     );
//   //     set(state => ({ playlist: res.data }))
//   //   } catch (err) {
//   //     set(state => ({ error: "No problem" }))
//   //   }
//   // },
//   // getListSongLove: async (accessToken,id) => {
//   //   try {
//   //     const res = await axios.get("v1/auth/getListSongLove/" + id, 
       
      
//   //     { headers:{'token': `Bearer ${accessToken}`}},
//   //     );
//   //     const list = res.data;
//   //     localStorage.setItem("listSongLove",JSON.stringify(list));
//   //     set(state => ({ listSongLove: JSON.parse(localStorage.getItem('listSongLove'))}))
//   //   } catch (err) {
//   //     set(state => ({ error: "No problem" }))
//   //   }
//   // },
//   createPlaylist: async (accessToken,id, item) => {

//     try {
//       await axios.post("v1/auth/createPlaylist/" + id, 
       
//       item,
//       { headers:{'token': `Bearer ${accessToken}`}},
//     //  {cookies:{'cookies':}
//       );
//       set(state => ({ error: "" }))
//     } catch (err) {
//       set(state => ({ error: "Playlist đã tồn tại" }))
//     }
//   },
//   removePlaylist: async (accessToken,id, item) => {

//     try {
//       await axios.post("v1/auth/removePlaylist/" + id, 
       
//       item,
//       { headers:{'token': `Bearer ${accessToken}`}},
//     //  {cookies:{'cookies':}
//       );
//       set(state => ({ error: "" }))
//     } catch (err) {
//       set(state => ({ error: "Playlist đã tồn tại" }))
//     }
//   },
//   addToPlaylist: async (accessToken,id, item) => {

//     try {
//       await axios.post("v1/auth/addToPlaylist/" + id, 
       
//       item,
//       { headers:{'token': `Bearer ${accessToken}`}},
//       );
//       set(state => ({ error: "" }))
//     } catch (err) {
//       set(state => ({ error: "No problem" }))
//     }
//   },
//   removeFromPlaylist: async (accessToken,id, item) => {

//     try {
//       await axios.post("v1/auth/createPlaylist/" + id, 
       
//       item,
//       { headers:{'token': `Bearer ${accessToken}`}},
//     //  {cookies:{'cookies':}
//       );
//       set(state => ({ error: "" }))
//     } catch (err) {
//       set(state => ({ error: "Playlist đã tồn tại" }))
//     }
//   },
//   addToListSongLove: async (accessToken,id, item) => {

//     try {
//       await axios.post("v1/auth/addToListSongLove/" + id, 
//       item,
//       { headers:{'token': `Bearer ${accessToken}`}}
//       );
//       const list = JSON.parse(localStorage.getItem('listSongLove'))
//       list.unshift(item)
      
//       localStorage.setItem("listSongLove",JSON.stringify(list));

//     } catch (err) {
//       set(state => ({ error: "Playlist đã tồn tại" }))
//     }
//   },
  


//   // Click-music
//   audioChoose: "",
//   isStart: false,
//   listAudio: [],
//   showForm: "",
//   updateAudio: (newAudio, list, index) => {
//     set(state => ({ isStart: true }))
//     if (newAudio == null) {
//       set(state => ({ listAudio: list, audioChoose: list[index] }))
//     } else {
//       set(state => ({ audioChoose: newAudio }))
//     }

//   },
//   updateStart: (start) => {
//     set(state => ({ isStart: start }))
//   },
//   updateForm: (form) => {
//     set(state=>({error:""}))

//     set(state => ({ showForm: form }))
//   },
//   updateError:(error)=>{
//     set(state=>({error:error}))
//   }
// }))
// export const useStore = store;